import { Router } from "express";
import { FinanceController } from "./controller/finance.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new FinanceController();

router.use(authMiddleware);

router.get("/summary/:businessId", controller.summary);

router.get("/payments/:businessId", controller.payments);

export default router;
