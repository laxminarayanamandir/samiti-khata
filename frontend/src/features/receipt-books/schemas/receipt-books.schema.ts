import { BookStatus } from "@/constants/bookStatus";
import NepaliDate from "nepali-date-converter";
import z from "zod";

export const receiptBookSchema = z
  .object({
    bookNumber: z
      .string()
      .min(1, "Book Number is required.")
      .refine((value) => !isNaN(Number(value)), {
        error: "Invalid Book Number.",
      })
      .transform((num) => Number(num)),

    receiptStartingNumber: z
      .string()
      .min(1, "Receipt Start Number is required.")
      .refine((value) => !isNaN(Number(value)), {
        error: "Invalid Receipt Start Number",
      })
      .transform((num) => Number(num)),

    receiptEndingNumber: z
      .string()
      .min(1, "Receipt End Number is required.")
      .refine((value) => !isNaN(Number(value)), {
        error: "Invalid Receipt End Number.",
      })
      .transform((num) => Number(num)),

    fiscalYearId: z
      .string()
      .min(1, "Fiscal Year is required.")
      .refine((value) => !isNaN(Number(value)), {
        error: "Invalid Fiscal Year.",
      })
      .transform((num) => Number(num)),

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
  // convert assigned and returned date to iso
  .transform((data) => {
    let assignedAt = undefined;
    let returnedAt = undefined;

    if (data.assignedAt) {
      assignedAt = new NepaliDate(data.assignedAt).toJsDate().toISOString();
    }

    if (data.returnedAt) {
      returnedAt = new NepaliDate(data.assignedAt).toJsDate().toISOString();
    }

    return { ...data, assignedAt, returnedAt };
  })
  .superRefine((data, context) => {
    // receipt start number can't be greater than end number
    if (data.receiptStartingNumber >= data.receiptEndingNumber) {
      context.addIssue({
        code: "custom",
        message: "Start Number should be less than End Number.",
        path: ["receiptStartingNumber"],
      });
    }

    // assigned requires assigned to
    if (data.status === "ASSIGNED" && !data.assignedTo) {
      context.addIssue({
        code: "custom",
        message: "Member is required when book status is Assigned.",
        path: ["assignedTo"],
      });
    }
  });

export type ReceiptBookForm = z.input<typeof receiptBookSchema>;
export type ReceiptBookSchema = z.output<typeof receiptBookSchema>;
