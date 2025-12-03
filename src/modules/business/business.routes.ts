import { Router } from "express";
import { BusinessController } from "./controller/business.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new BusinessController();

router.use(authMiddleware);

router.post("/", controller.create);
router.get("/", controller.getByOwner);
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
