import { z } from "zod";

export const createProviderSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
  specialization: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export const updateProviderSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
  specialization: z.string().optional(),
  visible: z.boolean().optional(),
});

export const workingHoursSchema = z.object({
  weekday: z.number().min(0).max(6),
  start: z.string(),
  end: z.string(),
});

export const breakSchema = z.object({
  date: z.string(),
  start: z.string(),
  end: z.string(),
  reason: z.string().optional(),
});
