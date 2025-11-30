import { Router } from "express";
import { authController } from "./controller/auth.controller";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);

export default router;
