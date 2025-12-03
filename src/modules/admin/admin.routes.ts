import { Router } from "express";
import { AdminController } from "./controller/admin.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new AdminController();

// Middleware de autenticação (superadmin no futuro)
router.use(authMiddleware);

// Usuários
router.get("/users", controller.listUsers);
router.put("/users/:id/status", controller.toggleUser);

// Negócios
router.get("/businesses", controller.listBusinesses);
router.put("/businesses/:id/status", controller.toggleBusiness);

// Assinaturas
router.get("/subscriptions", controller.listSubscriptions);

// Métricas gerais
router.get("/metrics", controller.metrics);

export default router;
