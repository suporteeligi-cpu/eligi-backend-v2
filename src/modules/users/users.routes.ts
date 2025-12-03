import { Router } from "express";
import { UsersController } from "./controller/users.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new UsersController();

router.use(authMiddleware);

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
