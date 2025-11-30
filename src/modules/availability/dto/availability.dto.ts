import { z } from "zod";

export const availabilitySchema = z.object({
  providerId: z.string(),
  serviceId: z.string(),
  date: z.string(), // yyyy-mm-dd
});
