import { prisma } from "../../../lib/prisma";

export class BillingRepository {
  // ---- PLANS ----
  async createPlan(data: any) {
    return prisma.plan.create({ data });
  }

  async getPlanById(id: string) {
    return prisma.plan.findUnique({ where: { id } });
  }

  async listPlans() {
    return prisma.plan.findMany();
  }

  // ---- SUBSCRIPTIONS ----
  async createSubscription(data: any) {
    return prisma.subscription.create({
      data,
      include: { plan: true, business: true }
    });
  }

  async getSubscription(id: string) {
    return prisma.subscription.findUnique({
      where: { id },
      include: { plan: true, business: true }
    });
  }

  async getSubscriptionByBusiness(businessId: string) {
    return prisma.subscription.findFirst({
      where: { businessId },
      include: { plan: true }
    });
  }

  async updateSubscription(id: string, data: any) {
    return prisma.subscription.update({
      where: { id },
      data,
      include: { plan: true }
    });
  }
}
