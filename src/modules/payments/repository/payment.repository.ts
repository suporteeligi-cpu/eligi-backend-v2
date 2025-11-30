import { prisma } from "../../../lib/prisma";

export const paymentRepository = {
  create: (data: any) =>
    prisma.payment.create({ data }),

  findByAppointment: (appointmentId: string) =>
    prisma.payment.findFirst({
      where: { appointmentId }
    }),

  createPayout: (data: any) =>
    prisma.payout.create({ data }),

  listPaymentsByBusiness: (businessId: string) =>
    prisma.payment.findMany({
      where: { appointment: { businessId } },
      include: { appointment: true, user: true }
    }),

  listPayoutsByProvider: (providerId: string) =>
    prisma.payout.findMany({
      where: { providerId },
      include: { appointment: true }
    })
};
