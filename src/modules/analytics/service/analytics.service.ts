import { businessRepository } from "../../business/repository/business.repository";
import { analyticsRepository } from "../repository/analytics.repository";

export const analyticsService = {

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

    const appointments = await analyticsRepository.appointmentsInRange(
      business.id, start, end
    );

    const providerStats = await analyticsRepository.providerStats(
      business.id, start, end
    );

    // total de receita
    const totalRevenue = appointments.reduce((acc, a) => acc + a.price, 0);

    // ticket médio
    const avgTicket = appointments.length > 0 ? totalRevenue / appointments.length : 0;

    // repetição de clientes
    const returning = await analyticsRepository.returningClients(
      business.id, start, end
    );
    const repeatRate =
      returning.filter((u: any) => u._count.id > 1).length /
      Math.max(returning.length, 1);

    // horário mais movimentado
    const hours = appointments.reduce((acc: any, a: any) => {
      const h = a.start.getHours();
      acc[h] = (acc[h] || 0) + 1;
      return acc;
    }, {});

    const busiestHour =
      Object.keys(hours).length > 0
        ? Object.keys(hours).reduce((a, b) => (hours[a] > hours[b] ? a : b))
        : null;

    return {
      range: { start, end },
      totalAppointments: appointments.length,
      totalRevenue,
      avgTicket,
      repeatRate,
      busiestHour,
      providerStats,
      appointments
    };
  }
};
