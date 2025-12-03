import { FavoriteRepository } from "../repository/favorites.repository";
import { AppError } from "../../../../core/errors/AppError";

export class FavoriteService {
  private repo = new FavoriteRepository();

  async createFavorite(data: any) {
    if (!data.clientId) throw new AppError("clientId é obrigatório.", 400);

    return this.repo.create(data);
  }

  async listByClient(clientId: string) {
    return this.repo.listByClient(clientId);
  }

  async removeFavorite(id: string) {
    return this.repo.delete(id);
  }
}
