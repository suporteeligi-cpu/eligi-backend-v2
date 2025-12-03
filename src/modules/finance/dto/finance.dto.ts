export interface FinanceFilterDTO {
  businessId: string;
  startDate?: string; // "YYYY-MM-DD"
  endDate?: string;   // "YYYY-MM-DD"
}

export interface FinanceSummaryDTO {
  businessId: string;
}
