export interface CreatePaymentDTO {
  appointmentId: string;
  providerId: string;
  businessId: string;
  clientId: string;

  amount: number;
  method: "credit_card" | "debit_card" | "pix" | "cash";

  gateway?: "stripe" | "mercado_pago";
}

export interface UpdatePaymentDTO {
  status?: "pending" | "approved" | "refused" | "refunded";
}
