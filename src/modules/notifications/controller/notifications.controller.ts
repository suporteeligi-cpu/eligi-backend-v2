import { Request, Response } from "express";
import { NotificationService } from "../service/notification.service";

export class NotificationController {
  private service = new NotificationService();

  send = async (req: Request, res: Response) => {
    const result = await this.service.send(req.body);
    return res.status(201).json(result);
  };

  sendTemplate = async (req: Request, res: Response) => {
    const result = await this.service.sendTemplate(req.body);
    return res.status(201).json(result);
  };

  listByUser = async (req: Request, res: Response) => {
    const result = await this.service.getUserNotifications(req.params.userId);
    return res.json(result);
  };
}
