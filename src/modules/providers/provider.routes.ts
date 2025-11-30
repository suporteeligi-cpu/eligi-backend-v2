import { Router } from "express";
import { providerController } from "./controller/provider.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, providerController.create);
router.get("/", authMiddleware, providerController.list);
router.put("/:id", authMiddleware, providerController.update);

router.put("/:id/working-hours", authMiddleware, providerController.setWorkingHours);
router.post("/:id/breaks", authMiddleware, providerController.addBreak);

export default router;
