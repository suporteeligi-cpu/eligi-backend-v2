import { prisma } from "../../../lib/prisma";

export const notificationRepository = {
  create: (data: any) =>
    prisma.notification.create({ data }),

  listByUser: (userId: string) =>
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    }),

  markAsRead: (notificationId: string) =>
    prisma.notification.update({
      where: { id: notificationId },
      data: { read: true }
    }),

  getTemplate: (type: string) =>
    prisma.notificationTemplate.findUnique({
      where: { id: type }
    }),
};
