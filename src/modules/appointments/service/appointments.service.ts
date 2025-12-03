import { AppointmentsRepository } from "../repository/appointments.repository";
import { AppError } from "../../../core/errors/AppError";

export class AppointmentService {
  private repo = new AppointmentsRepository();

  async createAppointment(data: any) {
    if (!data.businessId || !data.providerId || !data.clientId) {
      throw new AppError("Campos obrigatórios faltando.", 400);
    }

    // Aqui no futuro entra lógica:
    // - validação de disponibilidade
    // - checagem de choque de horários
    // - agenda inteligente
    // - buffer time
    // - remarcação automática

    return this.repo.create(data);
  }

  async getAppointment(id: string) {
    const result = await this.repo.findById(id);
    if (!result) throw new AppError("Agendamento não encontrado.", 404);
    return result;
  }

  async listByBusiness(businessId: string) {
    return this.repo.findByBusiness(businessId);
  }

  async listByProvider(providerId: string) {
    return this.repo.findByProvider(providerId);
  }

  async updateAppointment(id: string, data: any) {
    await this.getAppointment(id);
    return this.repo.update(id, data);
  }

  async deleteAppointment(id: string) {
    await this.getAppointment(id);
    return this.repo.delete(id);
  }
}
