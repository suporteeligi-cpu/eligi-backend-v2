import { prisma } from "../../../lib/prisma";

export class PaymentRepository {
  async create(data: any) {
    return prisma.payment.create({
      data,
      include: {
        appointment: true,
        provider: true,
        client: true,
        business: true
      }
    });
  }

  async findById(id: string) {
    return prisma.payment.findUnique({
      where: { id },
      include: {
        appointment: true,
        provider: true,
        client: true,
        business: true
      }
    });
  }

  async listByBusiness(businessId: string) {
    return prisma.payment.findMany({
      where: { businessId },
      include: {
        appointment: true,
        provider: true,
        client: true
      }
    });
  }

  async update(id: string, data: any) {
    return prisma.payment.update({
      where: { id },
      data,
      include: {
        appointment: true,
        provider: true,
        client: true
      }
    });
  }
}
