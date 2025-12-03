import { Router } from "express";
import { NotificationController } from "./controller/notifications.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new NotificationController();

router.use(authMiddleware);

// envio direto
router.post("/", controller.send);

// envio por template
router.post("/template", controller.sendTemplate);

// lista por usuário
router.get("/user/:userId", controller.listByUser);

export default router;
