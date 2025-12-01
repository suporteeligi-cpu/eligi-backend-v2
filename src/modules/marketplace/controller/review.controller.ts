import { AuthRequest } from "@middlewares/auth.middleware";
import { Response } from "express";
import { createReviewSchema } from "../dto/review.dto";
import { reviewService } from "../service/review.service";

export const reviewController = {

  async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const data = createReviewSchema.parse(req.body);

      const review = await reviewService.create(userId, data);
      return res.status(201).json(review);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async listByBusiness(req: AuthRequest, res: Response) {
    try {
      const { businessId } = req.params;
      const list = await reviewService.listByBusiness(businessId);
      return res.json(list);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },

  async listByProvider(req: AuthRequest, res: Response) {
    try {
      const { providerId } = req.params;
      const list = await reviewService.listByProvider(providerId);
      return res.json(list);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
};
