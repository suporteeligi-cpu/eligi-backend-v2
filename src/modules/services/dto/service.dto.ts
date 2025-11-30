import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  durationMin: z.number(),
  category: z.string().optional(),
  providerId: z.string().optional(),
});

export const updateServiceSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  durationMin: z.number().optional(),
  category: z.string().optional(),
  visible: z.boolean().optional(),
});

export const providerServiceSchema = z.object({
  priceOverride: z.number().optional(),
  durationOverride: z.number().optional(),
});
