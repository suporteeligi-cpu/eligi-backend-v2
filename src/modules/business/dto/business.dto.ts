import { z } from "zod";

export const createBusinessSchema = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string().optional(),
  phone: z.string().optional(),
  document: z.string().optional(), // CNPJ
  timezone: z.string().default("America/Sao_Paulo")
});

export const updateAddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  lat: z.number().optional(),
  lng: z.number().optional()
});

export const updateSettingsSchema = z.object({
  cancelPolicy: z.string().optional(),
  minBookingTime: z.number().optional(),
  minAdvanceTime: z.number().optional(),
  allowOnlinePayment: z.boolean().optional(),
  allowDeposit: z.boolean().optional(),
  allowReschedule: z.boolean().optional()
});
