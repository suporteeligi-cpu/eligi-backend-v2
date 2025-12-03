import { Router } from "express";
import { ServiceController } from "./controller/services.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new ServiceController();

router.use(authMiddleware);

router.post("/", controller.create);

router.get("/business/:businessId", controller.listByBusiness);
router.get("/:id", controller.getOne);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;
