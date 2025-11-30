import { businessRepository } from "../repository/business.repository";

export const businessService = {
  async createBusiness(ownerId: string, data: any) {
    const exists = await businessRepository.findBusinessByOwner(ownerId);
    if (exists) throw new Error("O usuário já possui um negócio criado.");

    return businessRepository.createBusiness({
      ownerId,
      ...data
    });
  },

  async getMyBusiness(ownerId: string) {
    return businessRepository.findBusinessByOwner(ownerId);
  },

  async updateBusiness(ownerId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado.");

    return businessRepository.updateBusiness(business.id, data);
  },

  async updateAddress(ownerId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado.");

    return businessRepository.updateAddress(business.id, data);
  },

  async updateSettings(ownerId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado.");

    return businessRepository.updateSettings(business.id, data);
  }
};
