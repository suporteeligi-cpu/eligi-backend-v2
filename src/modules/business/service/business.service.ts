import { BusinessRepository } from "../repository/business.repository";
import { AppError } from "../../../core/errors/AppError";

export class BusinessService {
  private repo = new BusinessRepository();

  async createBusiness(data: any) {
    if (!data.ownerId) {
      throw new AppError("ownerId é obrigatório.", 400);
    }

    return this.repo.create(data);
  }

  async getBusiness(id: string) {
    const business = await this.repo.findById(id);
    if (!business) throw new AppError("Negócio não encontrado.", 404);
    return business;
  }

  async getByOwner(ownerId: string) {
    return this.repo.findByOwner(ownerId);
  }

  async updateBusiness(id: string, data: any) {
    await this.getBusiness(id); // valida existência
    return this.repo.update(id, data);
  }

  async deleteBusiness(id: string) {
    await this.getBusiness(id);
    return this.repo.delete(id);
  }
}
