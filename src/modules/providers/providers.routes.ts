import { Router } from "express";
import { ProviderController } from "./controller/providers.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new ProviderController();

router.use(authMiddleware);

// criar profissional
router.post("/", controller.create);

// listar por business
router.get("/business/:businessId", controller.getByBusiness);

// buscar um provider
router.get("/:id", controller.getOne);

// atualizar
router.put("/:id", controller.update);

// deletar
router.delete("/:id", controller.delete);

export default router;
