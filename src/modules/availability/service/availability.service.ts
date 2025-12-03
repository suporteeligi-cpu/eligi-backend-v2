import { AvailabilityRepository } from "../repository/availability.repository";
import { AppError } from "../../../core/errors/AppError";

export class AvailabilityService {
  private repo = new AvailabilityRepository();

  async createAvailability(data: any) {
    if (!data.providerId) {
      throw new AppError("providerId é obrigatório.");
    }
    return this.repo.create(data);
  }

  async getByProvider(providerId: string) {
    return this.repo.findByProvider(providerId);
  }

  async updateAvailability(id: string, data: any) {
    await this.repo.findOne(id);
    return this.repo.update(id, data);
  }

  async deleteAvailability(id: string) {
    await this.repo.findOne(id);
    return this.repo.delete(id);
  }

  // EXCEÇÕES
  async createException(data: any) {
    if (!data.providerId) {
      throw new AppError("providerId é obrigatório.");
    }
    return this.repo.createException(data);
  }

  async listExceptions(providerId: string) {
    return this.repo.getExceptions(providerId);
  }
}
