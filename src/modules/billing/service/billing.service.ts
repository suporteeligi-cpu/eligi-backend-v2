import { BillingRepository } from "../repository/billing.repository";
import { StripeBillingGateway } from "../gateways/stripe.gateway";
import { MercadoPagoBillingGateway } from "../gateways/mercado-pago.gateway";
import { AppError } from "../../../core/errors/AppError";

export class BillingService {
  private repo = new BillingRepository();
  private stripe = new StripeBillingGateway();
  private mp = new MercadoPagoBillingGateway();

  // ---- PLANS ----
  async createPlan(data: any) {
    return this.repo.createPlan(data);
  }

  async listPlans() {
    return this.repo.listPlans();
  }

  // ---- SUBSCRIPTIONS ----
  async subscribe(data: any) {
    const plan = await this.repo.getPlanById(data.planId);
    if (!plan) throw new AppError("Plano não encontrado.", 404);

    let gatewayResponse = null;

    if (data.gateway === "stripe") {
      gatewayResponse = await this.stripe.startSubscription(plan.price);
    } else if (data.gateway === "mercado_pago") {
      gatewayResponse = await this.mp.startSubscription(plan.price);
    } else {
      throw new AppError("Gateway inválido.", 400);
    }

    return this.repo.createSubscription({
      businessId: data.businessId,
      planId: data.planId,
      externalId: gatewayResponse.externalId,
      status: gatewayResponse.status
    });
  }

  async getSubscriptionByBusiness(businessId: string) {
    return this.repo.getSubscriptionByBusiness(businessId);
  }

  async changePlan(data: any) {
    const subscription = await this.repo.getSubscription(data.subscriptionId);
    if (!subscription) throw new AppError("Assinatura não encontrada.", 404);

    const plan = await this.repo.getPlanById(data.newPlanId);
    if (!plan) throw new AppError("Novo plano não encontrado.", 404);

    // troca no gateway
    if (subscription.externalId.startsWith("stripe")) {
      await this.stripe.changePlan(subscription.externalId, plan.price);
    } else {
      await this.mp.changePlan(subscription.externalId, plan.price);
    }

    return this.repo.updateSubscription(subscription.id, {
      planId: plan.id
    });
  }
}
