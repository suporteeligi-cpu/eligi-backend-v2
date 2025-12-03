import { prisma } from "../../../lib/prisma";

export class AppointmentsRepository {
  async create(data: any) {
    return prisma.appointment.create({
      data,
      include: {
        provider: true,
        client: true,
        service: true,
        business: true
      }
    });
  }

  async findById(id: string) {
    return prisma.appointment.findUnique({
      where: { id },
      include: {
        provider: true,
        client: true,
        service: true,
        business: true
      }
    });
  }

  async findByBusiness(businessId: string) {
    return prisma.appointment.findMany({
      where: { businessId },
      orderBy: { date: "asc" },
      include: {
        provider: true,
        client: true,
        service: true
      }
    });
  }

  async findByProvider(providerId: string) {
    return prisma.appointment.findMany({
      where: { providerId },
      orderBy: { date: "asc" },
      include: {
        client: true,
        service: true
      }
    });
  }

  async update(id: string, data: any) {
    return prisma.appointment.update({
      where: { id },
      data,
      include: {
        provider: true,
        client: true,
        service: true,
        business: true
      }
    });
  }

  async delete(id: string) {
    return prisma.appointment.delete({
      where: { id }
    });
  }
}
