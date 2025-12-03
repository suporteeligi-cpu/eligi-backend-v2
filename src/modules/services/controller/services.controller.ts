import { Request, Response } from "express";
import { ServicesService } from "../service/services.service";

export class ServiceController {
  private service = new ServicesService();

  create = async (req: Request, res: Response) => {
    const result = await this.service.createService(req.body);
    return res.status(201).json(result);
  };

  getOne = async (req: Request, res: Response) => {
    const result = await this.service.getService(req.params.id);
    return res.json(result);
  };

  listByBusiness = async (req: Request, res: Response) => {
    const result = await this.service.listByBusiness(req.params.businessId);
    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const result = await this.service.updateService(req.params.id, req.body);
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.deleteService(req.params.id);
    return res.status(204).send();
  };
}
