import { Request, Response } from "express";
import { AdminService } from "../service/admin.service";

export class AdminController {
  private service = new AdminService();

  // USUÁRIOS
  listUsers = async (_req: Request, res: Response) => {
    const result = await this.service.listUsers();
    return res.json(result);
  };

  toggleUser = async (req: Request, res: Response) => {
    const result = await this.service.toggleUser(
      req.params.id,
      req.body.active
    );
    return res.json(result);
  };

  // NEGÓCIOS
  listBusinesses = async (_req: Request, res: Response) => {
    const result = await this.service.listBusinesses();
    return res.json(result);
  };

  toggleBusiness = async (req: Request, res: Response) => {
    const result = await this.service.toggleBusiness(
      req.params.id,
      req.body.active
    );
    return res.json(result);
  };

  // ASSINATURAS
  listSubscriptions = async (_req: Request, res: Response) => {
    const result = await this.service.listSubscriptions();
    return res.json(result);
  };

  // MÉTRICAS
  metrics = async (_req: Request, res: Response) => {
    const result = await this.service.metrics();
    return res.json(result);
  };
}
