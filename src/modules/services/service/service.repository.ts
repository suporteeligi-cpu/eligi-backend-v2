import { prisma } from "../../../lib/prisma";

export const serviceRepository = {
  create: (data: any) =>
    prisma.service.create({ data }),

  listByBusiness: (businessId: string) =>
    prisma.service.findMany({
      where: { businessId },
      include: {
        providerLinks: true
      }
    }),

  findById: (id: string) =>
    prisma.service.findUnique({
      where: { id },
      include: { providerLinks: true }
    }),

  update: (id: string, data: any) =>
    prisma.service.update({
      where: { id },
      data
    }),

  // Pivot provider-service
  linkProviderService: (providerId: string, serviceId: string, data: any) =>
    prisma.providerService.upsert({
      where: {
        providerId_serviceId: {
          providerId,
          serviceId
        }
      },
      create: {
        providerId,
        serviceId,
        ...data
      },
      update: data
    }),

  unlinkProviderService: (providerId: string, serviceId: string) =>
    prisma.providerService.delete({
      where: {
        providerId_serviceId: { providerId, serviceId }
      }
    })
};
