import { prisma } from "../../../lib/prisma";

export class AvailabilityRepository {
  // disponibilidade semanal
  async create(data: any) {
    return prisma.providerAvailability.create({
      data,
      include: { provider: true }
    });
  }

  async findByProvider(providerId: string) {
    return prisma.providerAvailability.findMany({
      where: { providerId },
      orderBy: { weekday: "asc" },
      include: { provider: true }
    });
  }

  async findOne(id: string) {
    return prisma.providerAvailability.findUnique({
      where: { id },
      include: { provider: true }
    });
  }

  async update(id: string, data: any) {
    return prisma.providerAvailability.update({
      where: { id },
      data,
      include: { provider: true }
    });
  }

  async delete(id: string) {
    return prisma.providerAvailability.delete({ where: { id } });
  }

  // exceções (folgas, bloqueios etc.)
  async createException(data: any) {
    return prisma.providerException.create({
      data,
      include: { provider: true }
    });
  }

  async getExceptions(providerId: string) {
    return prisma.providerException.findMany({
      where: { providerId },
      orderBy: { date: "asc" }
    });
  }
}
