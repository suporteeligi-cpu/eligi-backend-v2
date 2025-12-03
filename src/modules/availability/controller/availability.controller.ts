import { Request, Response } from "express";
import { AvailabilityService } from "../service/availability.service";

export class AvailabilityController {
  private service = new AvailabilityService();

  create = async (req: Request, res: Response) => {
    const result = await this.service.createAvailability(req.body);
    return res.status(201).json(result);
  };

  listByProvider = async (req: Request, res: Response) => {
    const result = await this.service.getByProvider(req.params.providerId);
    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const result = await this.service.updateAvailability(
      req.params.id,
      req.body
    );
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.deleteAvailability(req.params.id);
    return res.status(204).send();
  };

  // EXCEÇÕES
  createException = async (req: Request, res: Response) => {
    const result = await this.service.createException(req.body);
    return res.status(201).json(result);
  };

  listExceptions = async (req: Request, res: Response) => {
    const result = await this.service.listExceptions(req.params.providerId);
    return res.json(result);
  };
}
