import { z } from "zod";

export const createPaymentSchema = z.object({
  appointmentId: z.string(),
  method: z.enum(["pix", "card", "cash", "marketplace"]),
  amount: z.number(),
});
