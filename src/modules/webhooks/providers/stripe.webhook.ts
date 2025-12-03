export class StripeWebhookHandler {
  async handle(event: any) {
    console.log("📩 [WEBHOOK] Stripe recebeu evento:", event.type);

    if (event.type === "invoice.payment_succeeded") {
      return {
        event: "payment_succeeded",
        payload: event.data
      };
    }

    return { event: "ignored", payload: event.data };
  }
}
