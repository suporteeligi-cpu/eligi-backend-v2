import { Router } from "express";
import { businessController } from "./controller/business.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, businessController.create);
router.get("/me", authMiddleware, businessController.me);
router.put("/", authMiddleware, businessController.update);
router.put("/address", authMiddleware, businessController.updateAddress);
router.put("/settings", authMiddleware, businessController.updateSettings);

export default router;
