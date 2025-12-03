import { Request, Response } from "express";
import { InvoiceService } from "../service/invoices.service";

export class InvoiceController {
  private service = new InvoiceService();

  create = async (req: Request, res: Response) => {
    const result = await this.service.createInvoice(req.body);
    return res.status(201).json(result);
  };

  getOne = async (req: Request, res: Response) => {
    const result = await this.service.getInvoice(req.params.id);
    return res.json(result);
  };

  listByBusiness = async (req: Request, res: Response) => {
    const result = await this.service.listByBusiness(req.params.businessId);
    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const result = await this.service.updateInvoice(req.params.id, req.body);
    return res.json(result);
  };
}
