import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { analyticsService } from "../service/analytics.service";

export const analyticsController = {

  async dashboard(req: AuthRequest, res: Response) {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });   // guard
      const ownerId = req.user.id;
      const period = (req.query.period as "day" | "week" | "month") || "day";
      const result = await analyticsService.dashboard(ownerId, period);
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
};
