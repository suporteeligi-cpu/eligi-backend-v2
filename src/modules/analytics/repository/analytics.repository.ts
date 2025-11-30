import { prisma } from "../../../lib/prisma";

export const analyticsRepository = {

  appointmentsInRange(businessId: string, start: Date, end: Date) {
    return prisma.appointment.findMany({
      where: {
        businessId,
        start: { gte: start, lt: end }
      },
      include: {
        service: true,
        provider: true
      }
    });
  },

  providerStats(businessId: string, start: Date, end: Date) {
    return prisma.appointment.groupBy({
      by: ["providerId"],
      where: {
        businessId,
        start: { gte: start, lt: end },
        status: "finished"
      },
      _count: { id: true },
      _sum: { price: true },
    });
  },

  mostActiveHours(businessId: string, start: Date, end: Date) {
    return prisma.appointment.groupBy({
      by: ["start"],
      where: {
        businessId,
        start: { gte: start, lt: end }
      },
      _count: { id: true }
    });
  },

  returningClients(businessId: string, start: Date, end: Date) {
    return prisma.appointment.groupBy({
      by: ["userId"],
      where: {
        businessId,
        start: { gte: start, lt: end }
      },
      _count: { id: true },
    });
  }
};
