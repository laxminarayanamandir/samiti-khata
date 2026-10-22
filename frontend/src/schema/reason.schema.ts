import z from "zod";

export const modifyReasonSchema = z.object({
  id: z
    .number({ error: "ID is required." })
    .min(1, { error: "ID should be greater than 1." }),
  reason: z
    .string()
    .trim()
    .min(2, "Provide a valid reason."),
});

export type ModifyReasonSchema = z.infer<typeof modifyReasonSchema>;
