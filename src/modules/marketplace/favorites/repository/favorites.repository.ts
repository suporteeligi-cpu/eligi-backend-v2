import { prisma } from "../../../../lib/prisma";

export class FavoriteRepository {
  async create(data: any) {
    return prisma.favorite.create({ data });
  }

  async listByClient(clientId: string) {
    return prisma.favorite.findMany({
      where: { clientId },
      include: {
        provider: true,
        business: true
      }
    });
  }

  async delete(id: string) {
    return prisma.favorite.delete({
      where: { id }
    });
  }
}
