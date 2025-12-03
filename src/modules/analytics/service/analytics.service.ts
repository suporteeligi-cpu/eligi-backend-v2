import { AnalyticsRepository } from "../repository/analytics.repository";

export class AnalyticsService {
  private repo = new AnalyticsRepository();

  async summary(data: any) {
    const totalAppointments = await this.repo.countAppointments(
      data.businessId,
      data.startDate,
      data.endDate
    );

    const totalRevenue = await this.repo.sumPaymentsApproved(
      data.businessId,
      data.startDate,
      data.endDate
    );

    return {
      businessId: data.businessId,
      totalAppointments,
      totalRevenue
    };
  }

  async servicesRanking(businessId: string) {
    const result = await this.repo.mostUsedServices(businessId);
    return result;
  }

  async providersRanking(businessId: string) {
    const result = await this.repo.providersRanking(businessId);
    return result;
  }

  async monthlyGrowth(businessId: string) {
    return this.repo.appointmentsByMonth(businessId);
  }
}
