import { prisma } from "../../../lib/prisma";

export const favoriteRepository = {
  toggle: async (userId: string, businessId: string) => {
    const exists = await prisma.favorite.findUnique({
      where: { userId_businessId: { userId, businessId } }
    });

    if (exists) {
      await prisma.favorite.delete({
        where: { userId_businessId: { userId, businessId } }
      });
      return { favorited: false };
    }

    await prisma.favorite.create({
      data: { userId, businessId }
    });

    return { favorited: true };
  },

  listByUser: (userId: string) =>
    prisma.favorite.findMany({
      where: { userId },
      include: { business: true }
    })
};
