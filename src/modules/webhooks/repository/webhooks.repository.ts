import { prisma } from "../../../lib/prisma";

export class WebhookRepository {
  async logEvent(data: any) {
    return prisma.webhookEvent.create({ data });
  }
}
