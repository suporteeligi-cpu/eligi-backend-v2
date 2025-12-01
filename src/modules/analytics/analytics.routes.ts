import { Router } from "express";
import { authMiddleware } from '@middlewares/auth.middleware';
import { analyticsController } from "./controller/analytics.controller";

const router = Router();

router.get("/dashboard", authMiddleware, analyticsController.dashboard);

export default router;
