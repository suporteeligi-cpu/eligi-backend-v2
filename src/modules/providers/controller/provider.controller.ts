import { Request, Response } from "express";
import { AuthRequest } from "../../../middlewares/authMiddleware";
import { providerService } from "../service/provider.service";
import { createProviderSchema, updateProviderSchema, workingHoursSchema, breakSchema } from "../dto/provider.dto";

export const providerController = {
  async create(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const data = createProviderSchema.parse(req.body);
      const provider = await providerService.create(ownerId, data);
      return res.status(201).json(provider);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async list(req: AuthRequest, res: Response) {
    try {
      const providers = await providerService.list(req.user.id);
      return res.json(providers);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const providerId = req.params.id;
      const data = updateProviderSchema.parse(req.body);
      const provider = await providerService.update(ownerId, providerId, data);
      return res.json(provider);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async setWorkingHours(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const providerId = req.params.id;
      const data = workingHoursSchema.parse(req.body);
      const result = await providerService.setWorkingHours(ownerId, providerId, data);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async addBreak(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const providerId = req.params.id;
      const data = breakSchema.parse(req.body);
      const result = await providerService.addBreak(ownerId, providerId, data);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
};
