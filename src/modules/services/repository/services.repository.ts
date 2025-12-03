import { prisma } from "../../../lib/prisma";

export class ServicesRepository {
  async create(data: any) {
    return prisma.service.create({
      data,
      include: {
        business: true
      }
    });
  }

  async findById(id: string) {
    return prisma.service.findUnique({
      where: { id },
      include: {
        business: true
      }
    });
  }

  async findByBusiness(businessId: string) {
    return prisma.service.findMany({
      where: { businessId },
      include: {
        business: true
      }
    });
  }

  async update(id: string, data: any) {
    return prisma.service.update({
      where: { id },
      data,
      include: {
        business: true
      }
    });
  }

  async delete(id: string) {
    return prisma.service.delete({
      where: { id }
    });
  }
}
