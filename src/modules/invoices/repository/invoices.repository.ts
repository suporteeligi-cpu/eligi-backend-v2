import { prisma } from "../../../lib/prisma";

export class InvoiceRepository {
  async create(data: any) {
    return prisma.invoice.create({
      data,
      include: {
        business: true,
        provider: true,
        client: true,
        payment: true
      }
    });
  }

  async findById(id: string) {
    return prisma.invoice.findUnique({
      where: { id },
      include: {
        business: true,
        provider: true,
        client: true,
        payment: true
      }
    });
  }

  async listByBusiness(businessId: string) {
    return prisma.invoice.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
      include: {
        provider: true,
        client: true
      }
    });
  }

  async update(id: string, data: any) {
    return prisma.invoice.update({
      where: { id },
      data,
      include: {
        business: true,
        provider: true,
        client: true,
        payment: true
      }
    });
  }
}
