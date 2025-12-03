import { ServicesRepository } from "../repository/services.repository";
import { AppError } from "../../../core/errors/AppError";

export class ServicesService {
  private repo = new ServicesRepository();

  async createService(data: any) {
    if (!data.businessId) {
      throw new AppError("businessId é obrigatório.");
    }

    return this.repo.create(data);
  }

  async getService(id: string) {
    const service = await this.repo.findById(id);
    if (!service) throw new AppError("Serviço não encontrado.", 404);
    return service;
  }

  async listByBusiness(businessId: string) {
    return this.repo.findByBusiness(businessId);
  }

  async updateService(id: string, data: any) {
    await this.getService(id);
    return this.repo.update(id, data);
  }

  async deleteService(id: string) {
    await this.getService(id);
    return this.repo.delete(id);
  }
}
