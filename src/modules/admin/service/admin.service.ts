import { AdminRepository } from "../repository/admin.repository";
import { AppError } from "../../../core/errors/AppError";

export class AdminService {
  private repo = new AdminRepository();

  // Usuários
  async listUsers() {
    return this.repo.listUsers();
  }

  async toggleUser(id: string, active: boolean) {
    const user = await this.repo.getUser(id);
    if (!user) throw new AppError("Usuário não encontrado.", 404);

    return this.repo.toggleUserStatus(id, active);
  }

  // Negócios
  async listBusinesses() {
    return this.repo.listBusinesses();
  }

  async toggleBusiness(id: string, active: boolean) {
    return this.repo.toggleBusinessStatus(id, active);
  }

  // Assinaturas
  async listSubscriptions() {
    return this.repo.listSubscriptions();
  }

  // Métricas da plataforma
  async metrics() {
    const totalUsers = await this.repo.countTotalUsers();
    const totalBusinesses = await this.repo.countTotalBusinesses();
    const totalAppointments = await this.repo.countTotalAppointments();

    return {
      totalUsers,
      totalBusinesses,
      totalAppointments
    };
  }
}
