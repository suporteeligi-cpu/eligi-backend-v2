import { favoriteRepository } from "../repository/favorite.repository";

export const favoriteService = {
  toggle(userId: string, businessId: string) {
    return favoriteRepository.toggle(userId, businessId);
  },

  list(userId: string) {
    return favoriteRepository.listByUser(userId);
  }
};
