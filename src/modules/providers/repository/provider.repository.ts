import { prisma } from "../../../lib/prisma";

export const providerRepository = {
  createProvider: (data: any) =>
    prisma.provider.create({ data }),

  findProvidersByBusiness: (businessId: string) =>
    prisma.provider.findMany({
      where: { businessId },
      include: { workingHours: true, breaks: true }
    }),

  findProviderById: (id: string) =>
    prisma.provider.findUnique({
      where: { id },
      include: { workingHours: true, breaks: true }
    }),

  updateProvider: (providerId: string, data: any) =>
    prisma.provider.update({
      where: { id: providerId },
      data
    }),

  upsertWorkingHours: (providerId: string, data: any) =>
    prisma.providerWorkingHours.upsert({
      where: {
        providerId_weekday: {
          providerId,
          weekday: data.weekday
        }
      },
      create: { providerId, ...data },
      update: data
    }),

  createBreak: (providerId: string, data: any) =>
    prisma.providerBreak.create({
      data: { providerId, ...data }
    })
};
