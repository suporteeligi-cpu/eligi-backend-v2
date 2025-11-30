import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { invoiceController } from "./controller/invoice.controller";

const router = Router();

router.get("/", authMiddleware, invoiceController.list);

export default router;
