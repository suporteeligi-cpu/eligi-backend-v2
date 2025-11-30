import { prisma } from "../../../lib/prisma";

export const availabilityRepository = {

  getWorkingHours(providerId: string, weekday: number) {
    return prisma.providerWorkingHours.findUnique({
      where: { providerId_weekday: { providerId, weekday } }
    });
  },

  getBreaks(providerId: string, date: Date) {
    return prisma.providerBreak.findMany({
      where: { providerId, date }
    });
  },

  getAppointments(providerId: string, start: Date, end: Date) {
    return prisma.appointment.findMany({
      where: {
        providerId,
        start: { gte: start, lt: end }
      }
    });
  },

  getService(serviceId: string) {
    return prisma.service.findUnique({
      where: { id: serviceId }
    });
  }
};
