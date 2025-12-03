import { Request, Response } from "express";
import { FinanceService } from "../service/finance.service";

export class FinanceController {
  private service = new FinanceService();

  summary = async (req: Request, res: Response) => {
    const result = await this.service.getFinanceSummary(
      req.params.businessId
    );
    return res.json(result);
  };

  payments = async (req: Request, res: Response) => {
    const result = await this.service.getPaymentsFiltered({
      businessId: req.params.businessId,
      startDate: req.query.start as string,
      endDate: req.query.end as string
    });
    return res.json(result);
  };
}
