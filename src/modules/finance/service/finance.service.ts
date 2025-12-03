import { FinanceRepository } from "../repository/finance.repository";

export class FinanceService {
  private repo = new FinanceRepository();

  async getFinanceSummary(businessId: string) {
    const payments = await this.repo.getPayments(businessId);
    const invoices = await this.repo.getInvoices(businessId);

    const totalReceived = payments
      .filter((p) => p.status === "approved")
      .reduce((sum, x) => sum + x.amount, 0);

    const totalPending = payments
      .filter((p) => p.status === "pending")
      .reduce((sum, x) => sum + x.amount, 0);

    const totalInvoices = invoices.length;

    return {
      businessId,
      totalReceived,
      totalPending,
      totalInvoices,
      paymentsCount: payments.length
    };
  }

  async getPaymentsFiltered(data: any) {
    const payments = await this.repo.getPayments(
      data.businessId,
      data.startDate,
      data.endDate
    );

    return payments;
  }
}
