export class StripeGateway {
  async process(amount: number) {
    // Integração futura com Stripe API
    return {
      status: "approved",
      transactionId: "stripe_" + Date.now()
    };
  }
}
