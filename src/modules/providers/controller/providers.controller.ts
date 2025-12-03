import { Request, Response } from "express";
import { ProvidersService } from "../service/providers.service";

export class ProviderController {
  private service = new ProvidersService();

  create = async (req: Request, res: Response) => {
    const result = await this.service.createProvider(req.body);
    return res.status(201).json(result);
  };

  getOne = async (req: Request, res: Response) => {
    const result = await this.service.getProvider(req.params.id);
    return res.json(result);
  };

  getByBusiness = async (req: Request, res: Response) => {
    const result = await this.service.getByBusiness(req.params.businessId);
    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const result = await this.service.updateProvider(req.params.id, req.body);
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.deleteProvider(req.params.id);
    return res.status(204).send();
  };
}
