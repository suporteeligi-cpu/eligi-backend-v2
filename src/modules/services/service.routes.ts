import { Router } from "express";
import { serviceController } from "./controller/service.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, serviceController.create);
router.get("/", authMiddleware, serviceController.list);
router.put("/:id", authMiddleware, serviceController.update);

router.post("/:serviceId/provider/:providerId", authMiddleware, serviceController.linkProvider);
router.delete("/:serviceId/provider/:providerId", authMiddleware, serviceController.unlinkProvider);

export default router;
