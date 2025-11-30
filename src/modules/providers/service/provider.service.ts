import { providerRepository } from "../repository/provider.repository";
import { businessRepository } from "../../business/repository/business.repository";

export const providerService = {
  async create(ownerId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    const provider = await providerRepository.createProvider({
      ...data,
      businessId: business.id,
      userId: ownerId // futuramente poderá ser diferente no fluxo de convites
    });

    return provider;
  },

  async list(ownerId: string) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    return providerRepository.findProvidersByBusiness(business.id);
  },

  async update(ownerId: string, providerId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    const provider = await providerRepository.findProviderById(providerId);
    if (!provider || provider.businessId !== business.id)
      throw new Error("Profissional não pertence ao seu negócio");

    return providerRepository.updateProvider(providerId, data);
  },

  async setWorkingHours(ownerId: string, providerId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    const provider = await providerRepository.findProviderById(providerId);
    if (!provider) throw new Error("Profissional não encontrado");

    return providerRepository.upsertWorkingHours(providerId, data);
  },

  async addBreak(ownerId: string, providerId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    return providerRepository.createBreak(providerId, data);
  }
};
