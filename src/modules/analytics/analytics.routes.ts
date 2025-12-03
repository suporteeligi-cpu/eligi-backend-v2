import { Router } from "express";
import { AnalyticsController } from "./controller/analytics.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new AnalyticsController();

router.use(authMiddleware);

// resumo (faturamento + agendamentos)
router.get("/summary/:businessId", controller.summary);

// ranking de serviços
router.get("/services/:businessId", controller.servicesRanking);

// ranking de barbeiros
router.get("/providers/:businessId", controller.providersRanking);

// crescimento mensal
router.get("/growth/:businessId", controller.monthlyGrowth);

export default router;
