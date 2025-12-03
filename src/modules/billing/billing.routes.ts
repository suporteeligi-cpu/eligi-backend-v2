import { Router } from "express";
import { BillingController } from "./controller/billing.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new BillingController();

router.use(authMiddleware);

// planos
router.post("/plans", controller.createPlan);
router.get("/plans", controller.listPlans);

// assinaturas
router.post("/subscribe", controller.subscribe);
router.get("/subscription/:businessId", controller.getByBusiness);
router.put("/change-plan", controller.changePlan);

export default router;
