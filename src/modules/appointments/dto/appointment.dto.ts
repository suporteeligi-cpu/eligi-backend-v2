import { z } from "zod";

export const createAppointmentSchema = z.object({
  providerId: z.string(),
  serviceId: z.string(),
  userId: z.string(), // cliente
  start: z.string(), // ISO date
});

export const updateStatusSchema = z.object({
  status: z.enum(["scheduled", "finished", "canceled", "no_show", "expired"]),
  reason: z.string().optional(),
});
