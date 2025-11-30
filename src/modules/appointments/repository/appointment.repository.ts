import { prisma } from "../../../lib/prisma";

export const appointmentRepository = {
  create: (data: any) =>
    prisma.appointment.create({ data }),

  findByProviderAndRange: (providerId: string, start: Date, end: Date) =>
    prisma.appointment.findMany({
      where: {
        providerId,
        start: { lt: end },
        end: { gt: start }
      }
    }),

  getProviderWorkingHours: (providerId: string, weekday: number) =>
    prisma.providerWorkingHours.findUnique({
      where: {
        providerId_weekday: {
          providerId,
          weekday
        }
      }
    }),

  getProviderBreaks: (providerId: string, date: Date) =>
    prisma.providerBreak.findMany({
      where: {
        providerId,
        date: date
      }
    }),

  saveStatusHistory: (data: any) =>
    prisma.appointmentStatusHistory.create({ data }),

  getById: (id: string) =>
    prisma.appointment.findUnique({
      where: { id },
      include: { service: true, provider: true, user: true }
    }),

  updateStatus: (id: string, status: any) =>
    prisma.appointment.update({
      where: { id },
      data: { status }
    }),

  saveCancellation: (data: any) =>
    prisma.cancellation.create({ data }),

  listByBusiness: (businessId: string, date: any) =>
    prisma.appointment.findMany({
      where: {
        businessId,
        start: {
          gte: date.start,
          lt: date.end
        }
      },
      orderBy: { start: "asc" },
      include: {
        provider: true,
        service: true,
        user: true
      }
    }),
};
