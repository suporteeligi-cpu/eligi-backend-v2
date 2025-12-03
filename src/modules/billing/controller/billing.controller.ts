import { Request, Response } from "express";
import { BillingService } from "../service/billing.service";

export class BillingController {
  private service = new BillingService();

  // planos
  createPlan = async (req: Request, res: Response) => {
    const result = await this.service.createPlan(req.body);
    return res.status(201).json(result);
  };

  listPlans = async (_req: Request, res: Response) => {
    const result = await this.service.listPlans();
    return res.json(result);
  };

  // assinaturas
  subscribe = async (req: Request, res: Response) => {
    const result = await this.service.subscribe(req.body);
    return res.status(201).json(result);
  };

  getByBusiness = async (req: Request, res: Response) => {
    const result = await this.service.getSubscriptionByBusiness(
      req.params.businessId
    );
    return res.json(result);
  };

  changePlan = async (req: Request, res: Response) => {
    const result = await this.service.changePlan(req.body);
    return res.json(result);
  };
}
