import { Request, Response } from "express";
import { WebhookService } from "../service/webhooks.service";

export class WebhookController {
  private service = new WebhookService();

  receive = async (req: Request, res: Response) => {
    const provider = req.params.provider;
    const result = await this.service.handle(provider, req.body);

    // Webhooks sempre retornam 200
    return res.json({ received: true, result });
  };
}
