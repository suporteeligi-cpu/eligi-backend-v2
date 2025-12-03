import { ProvidersRepository } from "../repository/providers.repository";
import { AppError } from "../../../core/errors/AppError";

export class ProvidersService {
  private repo = new ProvidersRepository();

  async createProvider(data: any) {
    if (!data.userId || !data.businessId) {
      throw new AppError("userId e businessId são obrigatórios.");
    }

    return this.repo.create(data);
  }

  async getProvider(id: string) {
    const provider = await this.repo.findById(id);
    if (!provider) throw new AppError("Profissional não encontrado.", 404);
    return provider;
  }

  async getByBusiness(businessId: string) {
    return this.repo.findByBusiness(businessId);
  }

  async updateProvider(id: string, data: any) {
    await this.getProvider(id);
    return this.repo.update(id, data);
  }

  async deleteProvider(id: string) {
    await this.getProvider(id);
    return this.repo.delete(id);
  }
}
