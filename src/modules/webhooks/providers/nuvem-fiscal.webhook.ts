export class NuvemFiscalWebhookHandler {
  async handle(event: any) {
    console.log("📩 [WEBHOOK] NFSe evento recebido:", event.event);

    if (event.event === "nfse.issued") {
      return {
        event: "nfse_issued",
        payload: event.data
      };
    }

    return { event: "ignored", payload: event.data };
  }
}
