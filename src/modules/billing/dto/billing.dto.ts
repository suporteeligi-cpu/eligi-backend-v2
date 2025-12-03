export interface CreateSubscriptionDTO {
  businessId: string;
  planId: string;
  gateway?: "stripe" | "mercado_pago";
}

export interface ChangePlanDTO {
  subscriptionId: string;
  newPlanId: string;
}

export interface PlanDTO {
  name: string;
  price: number;
  interval: "monthly" | "yearly";
  features?: string[];
}
