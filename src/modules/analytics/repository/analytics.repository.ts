import { prisma } from "../../../lib/prisma";

export class AnalyticsRepository {
  // total de agendamentos
  async countAppointments(businessId: string, start?: string, end?: string) {
    return prisma.appointment.count({
      where: {
        businessId,
        date: {
          gte: start ? new Date(start) : undefined,
          lte: end ? new Date(end) : undefined
        }
      }
    });
  }

  // total de pagamentos aprovados
  async sumPaymentsApproved(businessId: string, start?: string, end?: string) {
    const payments = await prisma.payment.findMany({
      where: {
        businessId,
        status: "approved",
        createdAt: {
          gte: start ? new Date(start) : undefined,
          lte: end ? new Date(end) : undefined
        }
      }
    });

    return payments.reduce((sum, p) => sum + p.amount, 0);
  }

  // serviços mais vendidos
  async mostUsedServices(businessId: string) {
    return prisma.appointment.groupBy({
      by: ["serviceId"],
      where: { businessId },
      _count: { serviceId: true }
    });
  }

  // ranking de barbeiros
  async providersRanking(businessId: string) {
    return prisma.appointment.groupBy({
      by: ["providerId"],
      where: { businessId },
      _count: { providerId: true }
    });
  }

  // crescimento mensal
  async appointmentsByMonth(businessId: string) {
    return prisma.$queryRawUnsafe(`
      SELECT
        DATE_TRUNC('month', date)::DATE AS month,
        COUNT(*) AS total
      FROM "Appointment"
      WHERE "businessId" = '${businessId}'
      GROUP BY month
      ORDER BY month ASC;
    `);
  }
}
