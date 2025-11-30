import { AuthRequest } from "../../../middlewares/authMiddleware";
import { Request, Response } from "express";
import { serviceService } from "../service/service.service";
import { createServiceSchema, updateServiceSchema, providerServiceSchema } from "../dto/service.dto";

export const serviceController = {

  async create(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const data = createServiceSchema.parse(req.body);
      const service = await serviceService.create(ownerId, data);
      return res.status(201).json(service);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async list(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const services = await serviceService.list(ownerId);
      return res.json(services);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const id = req.params.id;
      const data = updateServiceSchema.parse(req.body);
      const service = await serviceService.update(ownerId, id, data);
      return res.json(service);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async linkProvider(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const { providerId, serviceId } = req.params;
      const data = providerServiceSchema.parse(req.body);
      const link = await serviceService.linkProvider(ownerId, providerId, serviceId, data);
      return res.json(link);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async unlinkProvider(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const { providerId, serviceId } = req.params;
      const link = await serviceService.unlinkProvider(ownerId, providerId, serviceId);
      return res.json({ message: "Serviço removido do profissional", link });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
};
