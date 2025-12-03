import { Router } from "express";
import { InvoiceController } from "./controller/invoices.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new InvoiceController();

router.use(authMiddleware);

router.post("/", controller.create);

router.get("/business/:businessId", controller.listByBusiness);

router.get("/:id", controller.getOne);

router.put("/:id", controller.update);

export default router;
