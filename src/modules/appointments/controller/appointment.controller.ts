import { AuthRequest } from "../../../middlewares/auth.middleware";
import { Response } from "express";
import { appointmentService } from "../service/appointment.service";
import { createAppointmentSchema, updateStatusSchema } from "../dto/appointment.dto";

export const appointmentController = {

  async create(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const data = createAppointmentSchema.parse(req.body);
      const result = await appointmentService.create(ownerId, data);
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async updateStatus(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const { id } = req.params;
      const { status, reason } = updateStatusSchema.parse(req.body);

      const result = await appointmentService.updateStatus(ownerId, id, status, reason);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async list(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const { start, end } = req.query;

      const result = await appointmentService.listByBusiness(ownerId, {
        start: new Date(start as string),
        end: new Date(end as string)
      });

      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
};
