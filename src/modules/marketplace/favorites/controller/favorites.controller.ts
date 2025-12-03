import { Request, Response } from "express";
import { FavoriteService } from "../service/favorites.service";

export class FavoriteController {
  private service = new FavoriteService();

  create = async (req: Request, res: Response) => {
    const result = await this.service.createFavorite(req.body);
    return res.status(201).json(result);
  };

  listByClient = async (req: Request, res: Response) => {
    const result = await this.service.listByClient(req.params.clientId);
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.removeFavorite(req.params.id);
    return res.status(204).send();
  };
}
