import { AuthRequest } from "../../../middlewares/authMiddleware";
import { Response } from "express";
import { invoiceService } from "../service/invoice.service";

export const invoiceController = {

  async list(req: AuthRequest, res: Response) {
    try {
      const businessId = req.user.businessId;
      const list = await invoiceService.listByBusiness(businessId);
      return res.json(list);

    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
};
