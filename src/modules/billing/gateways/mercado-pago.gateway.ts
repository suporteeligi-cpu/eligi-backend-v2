export class MercadoPagoBillingGateway {
  async startSubscription(price: number) {
    return {
      status: "active",
      externalId: "mp_sub_" + Date.now()
    };
  }

  async changePlan(externalId: string, newPrice: number) {
    return {
      status: "active",
      updated: true
    };
  }
}
