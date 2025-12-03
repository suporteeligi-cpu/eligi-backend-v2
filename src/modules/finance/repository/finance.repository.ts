import { prisma } from "../../../lib/prisma";

export class FinanceRepository {
  async getPayments(businessId: string, start?: string, end?: string) {
    return prisma.payment.findMany({
      where: {
        businessId,
        createdAt: {
          gte: start ? new Date(start) : undefined,
          lte: end ? new Date(end) : undefined
        }
      },
      include: {
        provider: true,
        client: true,
        appointment: true
      }
    });
  }

  async getInvoices(businessId: string) {
    return prisma.invoice.findMany({
      where: { businessId },
      include: {
        provider: true,
        client: true,
        payment: true
      }
    });
  }

  async getProviders(businessId: string) {
    return prisma.provider.findMany({
      where: { businessId },
      include: { user: true }
    });
  }
}
