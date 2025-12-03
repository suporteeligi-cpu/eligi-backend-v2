import { Router } from "express";
import { WebhookController } from "./controller/webhooks.controller";

const router = Router();
const controller = new WebhookController();

// não tem authMiddleware — webhooks precisam ser PUBLIC
// porém você pode adicionar assinatura/secret no futuro

router.post("/:provider", controller.receive);

export default router;
