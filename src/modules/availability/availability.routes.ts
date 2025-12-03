import { Router } from "express";
import { AvailabilityController } from "./controller/availability.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new AvailabilityController();

router.use(authMiddleware);

// disponibilidade semanal
router.post("/", controller.create);
router.get("/provider/:providerId", controller.listByProvider);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

// exceções (bloqueios, folgas, pausas)
router.post("/exception", controller.createException);
router.get("/exception/:providerId", controller.listExceptions);

export default router;
