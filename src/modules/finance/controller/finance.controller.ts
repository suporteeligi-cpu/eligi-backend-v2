import { Response } from "express";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { financeService } from "../service/finance.service";

export const financeController = {

  async dashboard(req: AuthRequest, res: Response) {
    try {
      const ownerId = req.user.id;
      const period = (req.query.period as "day"|"week"|"month") ?? "month";

      const result = await financeService.dashboard(ownerId, period);
      return res.json(result);

    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
};
