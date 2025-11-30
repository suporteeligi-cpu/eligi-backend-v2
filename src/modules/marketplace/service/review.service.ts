import { reviewRepository } from "../repository/review.repository";
import { businessRepository } from "../../business/repository/business.repository";
import { providerRepository } from "../../providers/repository/provider.repository";

export const reviewService = {

  async create(userId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(data.businessId);
    if (!business) throw new Error("Negócio inválido para review");

    const provider = await providerRepository.findProviderById(data.providerId);
    if (!provider) throw new Error("Profissional não encontrado");

    // criar review
    const review = await reviewRepository.create({
      businessId: data.businessId,
      providerId: data.providerId,
      userId,
      rating: data.rating,
      comment: data.comment,
    });

    // imagens
    if (data.images && data.images.length > 0) {
      await reviewRepository.addImages(review.id, data.images);
    }

    // atualizar média do profissional
    const avg = await reviewRepository.updateProviderRating(data.providerId);
    await providerRepository.updateProvider(data.providerId, {
      rating: avg._avg.rating ?? 0
    });

    return review;
  },

  listByBusiness(businessId: string) {
    return reviewRepository.listByBusiness(businessId);
  },

  listByProvider(providerId: string) {
    return reviewRepository.listByProvider(providerId);
  }
};
