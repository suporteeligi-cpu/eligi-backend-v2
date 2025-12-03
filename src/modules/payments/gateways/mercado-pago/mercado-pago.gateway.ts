export class MercadoPagoGateway {
  async process(amount: number) {
    // Integração futura Mercado Pago
    return {
      status: "approved",
      transactionId: "mp_" + Date.now()
    };
  }
}
