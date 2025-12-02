import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z.string().min(2, "Name is short minimum 2 character")
        .nonempty({ message: "name is required" }),

    email: z.string()
        .nonempty({ message: "Email is required" })
        .email({ message: "Invalid email address!" }),

    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" }).optional(),

    role: z.enum([Role.USER], {
        message: "Role must be either SENDER or RECEIVER"
    }).default(Role.USER).optional(),

    isActive: z.enum(Object.values(IsActive))
        .default(IsActive.ACTIVE).optional()
})


export const updateUserZodSchema = z.object({
    name: z.string().min(2, "Name is short minimum 2 character")
        .optional(),
    isActive: z.enum(Object.values(IsActive)).optional()
})