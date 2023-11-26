import { z } from "zod";

const relationship = z.enum(["parent", "grandparent", "other"]);

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(60).min(3),
  email: z.string().email(),
  password: z.string().max(255),
  relationship: relationship,
});

export const userCreateSchema = userSchema.omit({ id: true });
export const userUpdateSchema = userCreateSchema.partial();
export const userReturnSchema = userSchema.omit({ password: true });
export const listUserSchema = userReturnSchema.array();
