export interface CreateInvoiceDTO {
  paymentId: string;
  businessId: string;
  providerId: string;
  clientId: string;

  amount: number;
  description: string;

  // dados fiscais opcionais para versão inicial
  serviceCode?: string;
  municipalityCode?: string;
}
