import { z } from "zod";

export const createReviewSchema = z.object({
  providerId: z.string(),
  businessId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  images: z.array(z.string()).optional(),  // URLs das imagens
});
