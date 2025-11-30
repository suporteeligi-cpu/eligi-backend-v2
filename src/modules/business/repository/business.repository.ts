import { prisma } from "../../../lib/prisma";

export const businessRepository = {
  createBusiness: (data: any) =>
    prisma.business.create({ data }),

  findBusinessByOwner: (ownerId: string) =>
    prisma.business.findFirst({
      where: { ownerId },
      include: {
        address: true,
        settings: true,
        providers: true,
        services: true
      }
    }),

  updateBusiness: (businessId: string, data: any) =>
    prisma.business.update({
      where: { id: businessId },
      data
    }),

  updateAddress: (businessId: string, data: any) =>
    prisma.businessAddress.upsert({
      where: { businessId },
      update: data,
      create: { businessId, ...data }
    }),

  updateSettings: (businessId: string, data: any) =>
    prisma.businessSettings.upsert({
      where: { businessId },
      update: data,
      create: { businessId, ...data }
    })
};
