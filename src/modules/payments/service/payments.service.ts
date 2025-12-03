import { PaymentRepository } from "../repository/payments.repository";
import { StripeGateway } from "../gateways/stripe/stripe.gateway";
import { MercadoPagoGateway } from "../gateways/mercado-pago/mercado-pago.gateway";
import { AppError } from "../../../core/errors/AppError";

export class PaymentService {
  private repo = new PaymentRepository();
  private stripe = new StripeGateway();
  private mp = new MercadoPagoGateway();

  async createPayment(data: any) {
    if (!data.amount || !data.method) {
      throw new AppError("Dados inválidos para pagamento.", 400);
    }

    // ---- Seleciona o gateway ----
    let result = null;

    if (data.gateway === "stripe") {
      result = await this.stripe.process(data.amount);
    } else if (data.gateway === "mercado_pago") {
      result = await this.mp.process(data.amount);
    } else {
      throw new AppError("Gateway não suportado.", 400);
    }

    const payment = await this.repo.create({
      ...data,
      status: result.status,
      transactionId: result.transactionId
    });

    return payment;
  }

  async getPayment(id: string) {
    const p = await this.repo.findById(id);
    if (!p) throw new AppError("Pagamento não encontrado.", 404);
    return p;
  }

  async listByBusiness(businessId: string) {
    return this.repo.listByBusiness(businessId);
  }

  async updatePayment(id: string, data: any) {
    await this.getPayment(id);
    return this.repo.update(id, data);
  }
}
