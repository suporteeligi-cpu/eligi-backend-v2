import { Router } from "express";
import { AppointmentController } from "./controller/appointments.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new AppointmentController();

router.use(authMiddleware);

// Criar agendamento
router.post("/", controller.create);

// Listar
router.get("/business/:businessId", controller.listByBusiness);
router.get("/provider/:providerId", controller.listByProvider);

// Buscar individual
router.get("/:id", controller.getOne);

// Atualizar
router.put("/:id", controller.update);

// Deletar
router.delete("/:id", controller.delete);

export default router;
