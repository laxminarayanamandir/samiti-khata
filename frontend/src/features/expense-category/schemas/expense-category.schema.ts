import z from "zod";

export const expenseCategorySchema = z.object({
  name: z
    .string("Name is required.")
    .trim()
    .min(2, "Name should be at least 2 chars long.")
    .max(50, "Name cannot exceed 50 characters."),

  description: z
    .string()
    .trim()
    .max(50, "Description cannot exceed 50 characters.")
    .optional(),
});

export const updateExpenseCategorySchema = expenseCategorySchema.extend({
  id: z.number().min(1),
});

export type ExpenseCategorySchema = z.infer<typeof expenseCategorySchema>;
export type UpdateExpenseCategorySchema = z.infer<typeof updateExpenseCategorySchema>