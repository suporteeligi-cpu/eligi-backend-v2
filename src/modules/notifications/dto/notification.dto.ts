import { z } from "zod";

export const createNotificationSchema = z.object({
  userId: z.string(),
  type: z.string(),          // ex: "appointment_created"
  title: z.string(),
  message: z.string(),
});
