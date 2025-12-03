import { prisma } from "../../../lib/prisma";

export class BusinessRepository {
  async create(data: any) {
    return prisma.business.create({
      data,
      include: {
        owner: true,
        address: true
      }
    });
  }

  async findById(id: string) {
    return prisma.business.findUnique({
      where: { id },
      include: {
        owner: true,
        address: true
      }
    });
  }

  async findByOwner(ownerId: string) {
    return prisma.business.findMany({
      where: { ownerId },
      include: {
        owner: true,
        address: true
      }
    });
  }

  async update(id: string, data: any) {
    return prisma.business.update({
      where: { id },
      data,
      include: {
        owner: true,
        address: true
      }
    });
  }

  async delete(id: string) {
    return prisma.business.delete({
      where: { id }
    });
  }
}
