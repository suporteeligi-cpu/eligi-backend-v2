import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { financeController } from "./controller/finance.controller";

const router = Router();

router.get("/dashboard", authMiddleware, financeController.dashboard);

export default router;
