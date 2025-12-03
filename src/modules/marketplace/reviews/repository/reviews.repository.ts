import { prisma } from "../../../../lib/prisma";

export class ReviewRepository {
  async create(data: any) {
    return prisma.review.create({
      data,
      include: {
        client: true,
        provider: true
      }
    });
  }

  async listByProvider(providerId: string) {
    return prisma.review.findMany({
      where: { providerId },
      include: {
        client: true
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async averageRating(providerId: string) {
    const reviews = await prisma.review.findMany({
      where: { providerId }
    });

    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }
}
