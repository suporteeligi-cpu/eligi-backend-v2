import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminController } from "./controller/admin.controller";

const router = Router();

router.get("/businesses", authMiddleware, adminController.list);
router.put("/suspend/:id", authMiddleware, adminController.suspend);
router.put("/activate/:id", authMiddleware, adminController.activate);
router.delete("/:id", authMiddleware, adminController.delete);

export default router;
