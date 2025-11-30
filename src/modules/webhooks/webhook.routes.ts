import { Router } from "express";
import { webhookService } from "./service/webhook.service";

const router = Router();

router.post("/", async (req, res) => {
  try {
    await webhookService.trigger(req.body.event, req.body.payload);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "failed to trigger webhook" });
  }
});

export default router;