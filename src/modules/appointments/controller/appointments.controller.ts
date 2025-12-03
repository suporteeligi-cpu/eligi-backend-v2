import { Request, Response } from "express";
import { AppointmentService } from "../service/appointments.service";

export class AppointmentController {
  private service = new AppointmentService();

  create = async (req: Request, res: Response) => {
    const result = await this.service.createAppointment(req.body);
    return res.status(201).json(result);
  };

  getOne = async (req: Request, res: Response) => {
    const result = await this.service.getAppointment(req.params.id);
    return res.json(result);
  };

  listByBusiness = async (req: Request, res: Response) => {
    const result = await this.service.listByBusiness(req.params.businessId);
    return res.json(result);
  };

  listByProvider = async (req: Request, res: Response) => {
    const result = await this.service.listByProvider(req.params.providerId);
    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const result = await this.service.updateAppointment(
      req.params.id,
      req.body
    );
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.deleteAppointment(req.params.id);
    return res.status(204).send();
  };
}
