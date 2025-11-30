import { prisma } from "../../../lib/prisma";

export const reviewRepository = {
  create: (data: any) =>
    prisma.review.create({
      data,
      include: { images: true }
    }),

  addImages: (reviewId: string, urls: string[]) =>
    prisma.reviewImage.createMany({
      data: urls.map(url => ({ reviewId, url }))
    }),

  listByBusiness: (businessId: string) =>
    prisma.review.findMany({
      where: { businessId },
      include: { user: true, images: true, provider: true },
      orderBy: { createdAt: "desc" }
    }),

  listByProvider: (providerId: string) =>
    prisma.review.findMany({
      where: { providerId },
      include: { user: true, images: true },
      orderBy: { createdAt: "desc" }
    }),

  updateProviderRating: (providerId: string) =>
    prisma.review.aggregate({
      where: { providerId },
      _avg: { rating: true }
    }),
};
