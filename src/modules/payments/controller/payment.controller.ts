import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { createPaymentSchema } from "../dto/payment.dto";
import { paymentService } from "../service/payment.service";

export const paymentController = {

  async create(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const data = createPaymentSchema.parse(req.body);
      const result = await paymentService.create(ownerId, data);
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async list(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const result = await paymentService.listPayments(ownerId);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async listPayouts(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const { providerId } = req.params;
      const result = await paymentService.listPayouts(ownerId, providerId);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
};
