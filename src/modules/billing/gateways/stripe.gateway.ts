export class StripeBillingGateway {
  async startSubscription(price: number) {
    return {
      status: "active",
      externalId: "stripe_sub_" + Date.now()
    };
  }

  async changePlan(externalId: string, newPrice: number) {
    return {
      status: "active",
      updated: true
    };
  }
}
