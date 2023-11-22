import { userSchema } from "./users.schema.js"

export const sessionSchema = userSchema.pick({
    email: true,
    password: true
})