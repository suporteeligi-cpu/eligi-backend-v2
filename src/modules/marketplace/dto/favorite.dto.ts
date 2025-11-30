import { z } from "zod";

export const toggleFavoriteSchema = z.object({
  businessId: z.string(),
});
