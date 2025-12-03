import { Request, Response } from "express";
import { UsersService } from "../service/users.service";

export class UsersController {
  private service = new UsersService();

  create = async (req: Request, res: Response) => {
    const result = await this.service.createUser(req.body);
    return res.status(201).json(result);
  };

  getOne = async (req: Request, res: Response) => {
    const result = await this.service.getUser(req.params.id);
    return res.json(result);
  };

  list = async (_req: Request, res: Response) => {
    const result = await this.service.listUsers();
    return res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const result = await this.service.updateUser(req.params.id, req.body);
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    await this.service.deleteUser(req.params.id);
    return res.status(204).send();
  };
}
