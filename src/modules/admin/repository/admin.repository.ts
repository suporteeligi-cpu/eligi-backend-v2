import { prisma } from "../../../lib/prisma";

export const adminRepository = {

  listBusinesses: () =>
    prisma.business.findMany({
      include: {
        owner: true,
        providers: true,
        appointments: true
      }
    }),

  suspendBusiness: (businessId: string) =>
    prisma.business.update({
      where: { id: businessId },
      data: { subscriptionStatus: "suspended" }
    }),

  activateBusiness: (businessId: string) =>
    prisma.business.update({
      where: { id: businessId },
      data: { subscriptionStatus: "active" }
    }),

  deleteBusiness: (businessId: string) =>
    prisma.business.delete({ where: { id: businessId } }),
};
