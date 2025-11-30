import { Router } from "express";
import { notificationController } from "./controller/notification.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// usado internamente pelo sistema
router.post("/", notificationController.send);

// notificações do usuário logado
router.get("/", authMiddleware, notificationController.list);

// marcar como lida
router.put("/:id/read", authMiddleware, notificationController.markRead);

export default router;
