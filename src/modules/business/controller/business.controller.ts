import { Request, Response } from "express";
import { BusinessService } from "../service/business.service";

export class BusinessController {
  private service = new BusinessService();

  create = async (req: Request, res: Response) => {
    const ownerId = (req as any).user.id;

    const result = await this.service.createBusiness({
      ...req.body,
      ownerId
    });

    return res.status(201).json(result);
  };

  getOne = async (req: Request, res: Response) => {
    const result = await this.service.getBusiness(req.params.id);
    return res.json(result);
  };

  getByOwner = async (req: Request, res: Response) => {
    const ownerId = (req as any).user.id;
    const result = await this.service.getByOwner(ownerId);
    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const result = await this.service.updateBusiness(req.params.id, req.body);
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.deleteBusiness(req.params.id);
    return res.status(204).send();
  };
}
