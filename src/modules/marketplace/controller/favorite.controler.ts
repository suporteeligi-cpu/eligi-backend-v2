import { AuthRequest } from "@middlewares/auth.middleware";
import { Response } from "express";
import { toggleFavoriteSchema } from "../dto/favorite.dto";
import { favoriteService } from "../service/favorite.service";

export const favoriteController = {

  async toggle(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { businessId } = toggleFavoriteSchema.parse(req.body);

      const result = await favoriteService.toggle(userId, businessId);
      return res.json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  async myFavorites(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const list = await favoriteService.list(userId);
      return res.json(list);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
};
