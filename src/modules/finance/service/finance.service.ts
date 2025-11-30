import { businessRepository } from "../../business/repository/business.repository";
import { financeRepository } from "../repository/finance.repository";

export const financeService = {

  async dashboard(ownerId: string, period: "day" | "week" | "month") {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    const now = new Date();
    let start = new Date();
    let end = new Date();

    if (period === "day") {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }

    if (period === "week") {
      const day = start.getDay();
      start.setDate(start.getDate() - day);
      start.setHours(0, 0, 0, 0);

      end = new Date(start);
      end.setDate(start.getDate() + 7);
    }

    if (period === "month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }

    // pagamentos
    const payments = await financeRepository.paymentsInRange(
      business.id, start, end
    );

    // repasses
    const payouts = await financeRepository.payoutsInRange(
      business.id, start, end
    );

    // total recebido
    const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);

    // total repassado
    const totalPayouts = payouts.reduce((acc, p) => acc + p.netAmount, 0);

    // taxas cobradas
    const totalFees = payouts.reduce((acc, p) => acc + (p.fee || 0), 0);

    // lucro líquido
    const netProfit = totalRevenue - totalPayouts - totalFees;

    // vendas por método
    const byMethod = await financeRepository.salesGroupedByMethod(
      business.id, start, end
    );

    return {
      range: { start, end },
      totalRevenue,
      totalPayouts,
      totalFees,
      netProfit,
      payments,
      payouts,
      byMethod
    };
  }
};
