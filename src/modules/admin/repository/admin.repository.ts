import { prisma } from "../../../lib/prisma";

export class AdminRepository {
  // USUÁRIOS
  async listUsers() {
    return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  }

  async getUser(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async toggleUserStatus(id: string, active: boolean) {
    return prisma.user.update({
      where: { id },
      data: { active }
    });
  }

  // NEGÓCIOS
  async listBusinesses() {
    return prisma.business.findMany({
      include: { owner: true }
    });
  }

  async toggleBusinessStatus(id: string, active: boolean) {
    return prisma.business.update({
      where: { id },
      data: { active }
    });
  }

  // ASSINATURAS
  async listSubscriptions() {
    return prisma.subscription.findMany({
      include: {
        plan: true,
        business: true
      }
    });
  }

  // MÉTRICAS GLOBAIS
  async countTotalUsers() {
    return prisma.user.count();
  }

  async countTotalBusinesses() {
    return prisma.business.count();
  }

  async countTotalAppointments() {
    return prisma.appointment.count();
  }
}
