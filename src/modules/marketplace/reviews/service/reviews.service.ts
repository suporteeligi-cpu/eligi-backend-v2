import { ReviewRepository } from "../repository/reviews.repository";
import { AppError } from "../../../../core/errors/AppError";

export class ReviewService {
  private repo = new ReviewRepository();

  async createReview(data: any) {
    if (!data.providerId || !data.clientId) {
      throw new AppError("Dados inválidos para avaliação.", 400);
    }

    return this.repo.create(data);
  }

  async listByProvider(providerId: string) {
    const reviews = await this.repo.listByProvider(providerId);
    const avgRating = await this.repo.averageRating(providerId);

    return { providerId, avgRating, reviews };
  }
}
