import { Role } from "@/constants/roles";
import { UserStatus } from "@/constants/userStatus";
import z from "zod";

export const userSchema = z.object({
  fullName: z
    .string("Name is required.")
    .trim()
    .min(2, "Name should be at least 2 chars long.")
    .max(50, "Name cannot exceed 50 characters."),

  email: z.email("Invalid Email Address."),
  password: z
    .string("Password is required.")
    .trim()
    .min(8, "Password should be at least 8 chars long."),

  address: z
    .string()
    .trim()
    .min(2, "Address should be at least 2 chars long.")
    .max(50, "Address cannot exceed 50 characters."),

  phoneNumber: z.string().regex(/^\d{10}$/, { error: "Invalid Phone Number." }),

  role: z.enum(Role),
});

export const userOrganizationSchema = z.object({
  userId: z
    .number("User is required.")
    .positive("Invalid User")
    .min(1, "Invalid User"),
  organizationId: z
    .number("Organization is required.")
    .positive("Invalid Organization.")
    .min(1, "Invalid Organization"),

  status: z.enum(UserStatus),
});

export type UserSchema = z.infer<typeof userSchema>;
export type UserOrganizationSchema = z.infer<typeof userOrganizationSchema>;
