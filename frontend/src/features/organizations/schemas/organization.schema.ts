import z from "zod";

export const organizationSchema = z.object({
  name: z
    .string("Name is required.")
    .trim()
    .min(2, "Name should be at least 2 chars long.")
    .max(50, "Name cannot exceed 50 characters."),

  email: z.email("Invalid Email Address"),

  address: z
    .string()
    .trim()
    .min(2, "Address should be at least 2 chars long.")
    .max(50, "Address cannot exceed 50 characters."),

  phoneNumber: z.string().regex(/^\d{10}$/, { error: "Invalid Phone Number." }),
});

export type OrganizationSchema = z.infer<typeof organizationSchema>;
