import { Router } from "express";
import { FavoriteController } from "./favorites/controller/favorites.controller";
import { ReviewController } from "./reviews/controller/reviews.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const favorite = new FavoriteController();
const review = new ReviewController();

router.use(authMiddleware);

// FAVORITES
router.post("/favorite", favorite.create);
router.get("/favorite/:clientId", favorite.listByClient);
router.delete("/favorite/:id", favorite.delete);

// REVIEWS
router.post("/review", review.create);
router.get("/review/provider/:providerId", review.listByProvider);

export default router;
