import { Router } from "express";
import { authMiddleware } from '@middlewares/auth.middleware';
import { availabilityController } from "./controller/availability.controller";

const router = Router();

router.get("/", authMiddleware, availabilityController.get);

export default router;
