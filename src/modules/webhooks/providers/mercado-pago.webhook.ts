export class MercadoPagoWebhookHandler {
  async handle(event: any) {
    console.log("📩 [WEBHOOK] Mercado Pago recebeu evento:", event.type);

    switch (event.type) {
      case "payment.updated":
        return {
          event: "payment_updated",
          payload: event.data
        };

      case "subscription.updated":
        return {
          event: "subscription_updated",
          payload: event.data
        };

      default:
        return {
          event: "ignored",
          payload: event.data
        };
    }
  }
}
