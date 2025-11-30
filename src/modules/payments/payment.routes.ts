import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { paymentController } from "./controller/payment.controller";

const router = Router();

router.post("/", authMiddleware, paymentController.create);
router.get("/", authMiddleware, paymentController.list);

router.get("/payouts/:providerId", authMiddleware, paymentController.listPayouts);

export default router;
