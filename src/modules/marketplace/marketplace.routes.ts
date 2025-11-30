import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { reviewController } from "./controller/review.controller";
import { favoriteController } from "./controller/favorite.controler";

const router = Router();

router.post("/review", authMiddleware, reviewController.create);
router.get("/reviews/business/:businessId", authMiddleware, reviewController.listByBusiness);
router.get("/reviews/provider/:providerId", authMiddleware, reviewController.listByProvider);

router.post("/favorite", authMiddleware, favoriteController.toggle);
router.get("/favorites", authMiddleware, favoriteController.myFavorites);

export default router;
