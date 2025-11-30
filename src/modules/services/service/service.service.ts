import { businessRepository } from "../../business/repository/business.repository";
import { providerRepository } from "../../providers/repository/provider.repository";
import { serviceRepository } from "./service.repository";

export const serviceService = {

  async create(ownerId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    const service = await serviceRepository.create({
      ...data,
      businessId: business.id,
    });

    return service;
  },

  async list(ownerId: string) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    return serviceRepository.listByBusiness(business.id);
  },

  async update(ownerId: string, id: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    const service = await serviceRepository.findById(id);
    if (!service || service.businessId !== business.id)
      throw new Error("Serviço não pertence ao seu negócio");

    return serviceRepository.update(id, data);
  },

  async linkProvider(ownerId: string, providerId: string, serviceId: string, data: any) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    const provider = await providerRepository.findProviderById(providerId);
    if (!provider || provider.businessId !== business.id)
      throw new Error("Profissional não pertence ao negócio");

    const service = await serviceRepository.findById(serviceId);
    if (!service || service.businessId !== business.id)
      throw new Error("Serviço não pertence ao negócio");

    return serviceRepository.linkProviderService(providerId, serviceId, data);
  },

  async unlinkProvider(ownerId: string, providerId: string, serviceId: string) {
    const business = await businessRepository.findBusinessByOwner(ownerId);
    if (!business) throw new Error("Negócio não encontrado");

    return serviceRepository.unlinkProviderService(providerId, serviceId);
  }
};
