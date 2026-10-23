import z from "zod";

export const committeeSchema = z.object({
  name: z
    .string("Name is required.")
    .trim()
    .min(2, "Name must be at least 2 chars long.")
    .max(50, "Committee name cannot exceed 50 characters."),

  description: z
    .string("Description is required.")
    .trim()
    .min(2, "Description must be at least 2 chars long.")
    .max(100, "Description cannot exceed 100 characters."),
});

export const updateCommitteeSchema = committeeSchema.extend({
  id: z.number().min(1),
});

export const subCommitteeSchema = z.object({
  name: z
    .string("Name is required.")
    .trim()
    .min(2, "Name must be at least 2 chars long.")
    .max(50, "Committee name cannot exceed 50 characters."),

  description: z.string().optional().default(""),

  mainCommitteeId: z
    .string()
    .trim()
    .min(1, "Main Committee is required.")
    .refine((value) => !isNaN(Number(value)), {
      error: "Invalid Main Committee.",
    })
    .transform((num) => Number(num)),
});

export type CommitteeSchema = z.infer<typeof committeeSchema>;
export type UpdateCommitteeSchema = z.infer<typeof updateCommitteeSchema>;
export type SubCommitteeForm = z.input<typeof subCommitteeSchema>;
export type SubCommitteePayload = z.output<typeof subCommitteeSchema>;
