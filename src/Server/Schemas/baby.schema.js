import { z } from "zod";

export const babySchema = z.object({
  id: z.number().positive(),
  name: z.string().max(100),
  age: z.number().positive(),
  weight: z
    .number()
    .min(0)
    .transform((value) => parseFloat(value.toFixed(2))),
  blood_type: z.string(),
});

export const babyCreateSchema = babySchema.omit({ id: true });
export const listBabySchema = babySchema.array()