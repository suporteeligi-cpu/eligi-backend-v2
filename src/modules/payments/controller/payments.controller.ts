import { Request, Response } from "express";
import { PaymentService } from "../service/payments.service";

export class PaymentController {
  private service = new PaymentService();

  create = async (req: Request, res: Response) => {
    const result = await this.service.createPayment(req.body);
    return res.status(201).json(result);
  };

  getOne = async (req: Request, res: Response) => {
    const result = await this.service.getPayment(req.params.id);
    return res.json(result);
  };

  listByBusiness = async (req: Request, res: Response) => {
    const result = await this.service.listByBusiness(req.params.businessId);
    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const result = await this.service.updatePayment(req.params.id, req.body);
    return res.json(result);
  };
}
