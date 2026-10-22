import { BookStatus } from "@/constants/bookStatus";
import NepaliDate from "nepali-date-converter";
import z from "zod";

export const updateBookStatusSchema = z
  .object({
    id: z.number().min(1),
    status: z.enum(BookStatus),
    assignedTo: z
      .string()
      .regex(/^\d*$/, {
        error: "Invalid member assigned.",
      })
      .transform((num) => (num.length > 0 ? Number(num) : undefined))
      .optional(),

    assignedAt: z
      .string()
      .regex(/^(20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[02]))?$/, {
        message: "Invalid date.",
      }),

    returnedAt: z
      .string()
      .regex(/^(20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[02]))?$/, {
        message: "Invalid date.",
      }),
  })
  .transform((data) => {
    let assignedAt = undefined;
    let returnedAt = undefined;

    if (data.assignedAt) {
      assignedAt = new NepaliDate(data.assignedAt).toJsDate().toISOString();
    }

    if (data.returnedAt) {
      returnedAt = new NepaliDate(data.returnedAt).toJsDate().toISOString();
    }

    return { ...data, assignedAt, returnedAt };
  })
  .superRefine((data, context) => {
    // assigned requires assigned to
    if (data.status === "ASSIGNED" && !data.assignedTo) {
      context.addIssue({
        code: "custom",
        message: "Member is required when book status is Assigned.",
        path: ["assignedTo"],
      });
    }

    if (
      data.assignedAt &&
      data.returnedAt &&
      data.assignedAt > data.returnedAt
    ) {
      context.addIssue({
        code: "custom",
        message: "Assigned date must be before than returned date.",
        path: ["assignedAt"],
      });
    }
  });

export type UpdateBookStatusSchema = z.infer<typeof updateBookStatusSchema>;
