import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { appointmentController } from "./controller/appointment.controller";

const router = Router();

router.post("/", authMiddleware, appointmentController.create);
router.put("/:id/status", authMiddleware, appointmentController.updateStatus);
router.get("/", authMiddleware, appointmentController.list);

export default router;
