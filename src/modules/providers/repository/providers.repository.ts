import { prisma } from "../../../lib/prisma";

export class ProvidersRepository {
  async create(data: any) {
    return prisma.provider.create({
      data,
      include: {
        user: true,
        business: true
      }
    });
  }

  async findById(id: string) {
    return prisma.provider.findUnique({
      where: { id },
      include: {
        user: true,
        business: true
      }
    });
  }

  async findByBusiness(businessId: string) {
    return prisma.provider.findMany({
      where: { businessId },
      include: {
        user: true,
        business: true
      }
    });
  }

  async update(id: string, data: any) {
    return prisma.provider.update({
      where: { id },
      data,
      include: {
        user: true,
        business: true
      }
    });
  }

  async delete(id: string) {
    return prisma.provider.delete({ where: { id } });
  }
}
