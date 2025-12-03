import { Request, Response } from "express";
import { ReviewService } from "../service/reviews.service";

export class ReviewController {
  private service = new ReviewService();

  create = async (req: Request, res: Response) => {
    const result = await this.service.createReview(req.body);
    return res.status(201).json(result);
  };

  listByProvider = async (req: Request, res: Response) => {
    const result = await this.service.listByProvider(req.params.providerId);
    return res.json(result);
  };
}
