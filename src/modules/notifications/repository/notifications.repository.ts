import { prisma } from "../../../lib/prisma";

export class NotificationRepository {
  async create(data: any) {
    return prisma.notification.create({
      data,
      include: { recipient: true }
    });
  }

  async listByUser(userId: string) {
    return prisma.notification.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: "desc" }
    });
  }
}
