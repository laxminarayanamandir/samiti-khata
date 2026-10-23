import z from "zod";

export const orgMemberSchema = z.object({
  name: z
    .string("Name is required.")
    .trim()
    .min(2, "Name should be at least 2 chars long.")
    .max(50, "Name cannot exceed 50 characters."),

  address: z
    .string()
    .trim()
    .max(50, "Address cannot exceed 50 characters.")
    .optional(),

  phone: z
    .string()
    .regex(/^(\d{10})?$/, { error: "Invalid Phone Number." })
    .optional(),
});

export type OrgMemberSchema = z.infer<typeof orgMemberSchema>;
