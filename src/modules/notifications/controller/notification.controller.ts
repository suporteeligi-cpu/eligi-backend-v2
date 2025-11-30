import { Request, Response } from "express";
import { createNotificationSchema } from "../dto/notification.dto";
import { notificationService } from "../service/notification.service";
import { AuthRequest } from "../../../middlewares/authMiddleware";

export const notificationController = {

  async send(req: Request, res: Response) {
    try {
      const data = createNotificationSchema.parse(req.body);
      const notif = await notificationService.send(data);
      return res.status(201).json(notif);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async list(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const list = await notificationService.list(userId);
      return res.json(list);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async markRead(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const result = await notificationService.markAsRead(id);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
};
