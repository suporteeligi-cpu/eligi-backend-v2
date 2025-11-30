import { prisma } from "../../../lib/prisma";

export const invoiceRepository = {
  create: (data: any) =>
    prisma.invoice.create({ data }),

  findByAppointment: (appointmentId: string) =>
    prisma.invoice.findFirst({
      where: { appointmentId }
    }),

  listByBusiness: (businessId: string) =>
    prisma.invoice.findMany({
      where: {
        appointment: { businessId }
      },
      include: { appointment: true, user: true }
    })
};
