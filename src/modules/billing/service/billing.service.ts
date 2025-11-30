import { prisma } from "../../../lib/prisma";

export const billingService = {

  async createSubscription(businessId: string, plan: "basic"|"pro") {
    const price = plan === "pro" ? 199 : 99;

    return prisma.subscription.upsert({
      where: { businessId },
      update: { plan, price },
      create: {
        businessId,
        plan,
        price,
        currentPeriodEnd: new Date(Date.now() + 30*24*60*60*1000)
      }
    });
  },

  async charge(businessId: string) {
    const invoice = await prisma.invoiceBilling.create({
      data: {
        businessId,
        amount: 199,
        status: "pending"
      }
    });

    // integração real futura:
    // stripe.charges.create({ ... })

    return invoice;
  },

  async processRenewals() {
    const subs = await prisma.subscription.findMany();

    for (const s of subs) {
      if (s.currentPeriodEnd < new Date()) {
        await this.charge(s.businessId);
        await prisma.subscription.update({
          where: { id: s.id },
          data: { currentPeriodEnd: new Date(Date.now() + 30*24*60*60*1000) }
        });
      }
    }
  }
};
