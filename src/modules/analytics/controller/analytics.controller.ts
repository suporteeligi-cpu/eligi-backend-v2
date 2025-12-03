import { Request, Response } from "express";
import { AnalyticsService } from "../service/analytics.service";

export class AnalyticsController {
  private service = new AnalyticsService();

  summary = async (req: Request, res: Response) => {
    const result = await this.service.summary({
      businessId: req.params.businessId,
      startDate: req.query.start as string,
      endDate: req.query.end as string
    });

    return res.json(result);
  };

  servicesRanking = async (req: Request, res: Response) => {
    const result = await this.service.servicesRanking(req.params.businessId);
    return res.json(result);
  };

  providersRanking = async (req: Request, res: Response) => {
    const result = await this.service.providersRanking(req.params.businessId);
    return res.json(result);
  };

  monthlyGrowth = async (req: Request, res: Response) => {
    const result = await this.service.monthlyGrowth(req.params.businessId);
    return res.json(result);
  };
}
