import { prisma } from "../../../lib/prisma";

export const financeRepository = {

  paymentsInRange(businessId: string, start: Date, end: Date) {
    return prisma.payment.findMany({
      where: {
        appointment: {
          businessId,
          start: { gte: start, lt: end }
        }
      },
      include: {
        appointment: true,
        user: true
      }
    });
  },

  payoutsInRange(businessId: string, start: Date, end: Date) {
    return prisma.payout.findMany({
      where: {
        appointment: {
          businessId,
          start: { gte: start, lt: end }
        }
      },
      include: {
        appointment: true,
        provider: true
      }
    });
  },

  salesGroupedByMethod(businessId: string, start: Date, end: Date) {
    return prisma.payment.groupBy({
      by: ["method"],
      where: {
        appointment: {
          businessId,
          start: { gte: start, lt: end }
        }
      },
      _sum: { amount: true }
    });
  },

  dailyCashflow(businessId: string, start: Date, end: Date) {
    return prisma.payment.groupBy({
      by: ["appointmentId"],
      where: {
        appointment: {
          businessId,
          start: { gte: start, lt: end }
        }
      },
      _sum: { amount: true }
    });
  }
};
