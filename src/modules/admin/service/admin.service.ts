import { adminRepository } from "../repository/admin.repository";

export const adminService = {
  async isAdmin(user: any) {
    if (user.role !== "admin")
      throw new Error("Acesso negado");
  },

  async listBusinesses(user: any) {
    await this.isAdmin(user);
    return adminRepository.listBusinesses();
  },

  async suspend(user: any, businessId: string) {
    await this.isAdmin(user);
    return adminRepository.suspendBusiness(businessId);
  },

  async activate(user: any, businessId: string) {
    await this.isAdmin(user);
    return adminRepository.activateBusiness(businessId);
  },

  async remove(user: any, businessId: string) {
    await this.isAdmin(user);
    return adminRepository.deleteBusiness(businessId);
  }
};
