import { WebhookRepository } from "../repository/webhooks.repository";
import { MercadoPagoWebhookHandler } from "../providers/mercado-pago.webhook";
import { StripeWebhookHandler } from "../providers/stripe.webhook";
import { NuvemFiscalWebhookHandler } from "../providers/nuvem-fiscal.webhook";

export class WebhookService {
  private repo = new WebhookRepository();

  private mp = new MercadoPagoWebhookHandler();
  private stripe = new StripeWebhookHandler();
  private nf = new NuvemFiscalWebhookHandler();

  async handle(provider: string, body: any) {
    let result;

    if (provider === "mercado-pago") {
      result = await this.mp.handle(body);
    }

    if (provider === "stripe") {
      result = await this.stripe.handle(body);
    }

    if (provider === "nuvem-fiscal") {
      result = await this.nf.handle(body);
    }

    if (!result) {
      result = { event: "unknown", payload: body };
    }

    await this.repo.logEvent({
      provider,
      event: result.event,
      payload: result.payload
    });

    return result;
  }
}
