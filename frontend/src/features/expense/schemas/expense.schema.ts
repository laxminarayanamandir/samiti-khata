import { PaymentModes } from "@/constants/paymentModes";
import z from "zod";
import NepaliDate from "nepali-date-converter";

const baseExpenseSchema = z.object({
  billNumber: z
    .string()
    .regex(/^\d*$/, {
      error: "Invalid Bill Number.",
    })
    .transform((num) => (num.length > 0 ? Number(num) : undefined))
    .optional(),

  voucherNumber: z.string().trim().optional(),

  nepaliDate: z
    .string("Date is required.")
    .regex(/^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[02])$/, {
      message: "Invalid date.",
    }),

  particulars: z
    .string("Particulars is required.")
    .trim()
    .min(2, "Particulars must be at least 2 chars long.")
    .max(50, "Particulars name cannot exceed 50 characters."),

  quantity: z
    .string()
    .trim()
    .max(50, "Quantity cannot exceed 50 chars.")
    .optional(),

  amount: z
    .string("Amount is required.")
    .regex(/^\d+(\.\d{1,2})?$/, {
      error:
        "Invalid amount. Amount should contain at most 2 numbers after decimal point.",
    })
    .transform((a) => Number(a)),

  paymentMode: z.enum(PaymentModes),

  recepientName: z.string().trim().max(50, "Name cannot exceed 50 characters."),

  recepientAddress: z
    .string()
    .trim()
    .max(50, "Recepient Address cannot exceed 50 characters.")
    .optional()
    .default("empty"),

  // date: z.iso.datetime().optional(),

  remarks: z.string().optional(),

  categoryId: z
    .string()
    .trim()
    .min(1, "Category is required.")
    .refine((value) => !isNaN(Number(value)), {
      error: "Invalid category.",
    })
    .transform((num) => Number(num)),

  committeeId: z
    .string()
    .trim()
    .min(1, "Committee is required.")
    .refine((value) => !isNaN(Number(value)), {
      error: "Invalid committee.",
    })
    .transform((num) => Number(num)),

  subCommitteeId: z
    .string()
    .regex(/^\d*$/, {
      error: "Invalid Sub Committee",
    })
    .transform((num) => (num.length > 0 ? Number(num) : undefined))
    .optional(),

  payerId: z
    .string()
    .regex(/^\d*$/, {
      error: "Invalid Payer",
    })
    .transform((num) => (num.length > 0 ? Number(num) : undefined))
    .optional(),
});

export const createExpenseSchema = baseExpenseSchema.transform((data) => {
  const ISOdateString = new NepaliDate(data.nepaliDate)
    .toJsDate()
    .toISOString();
  return { ...data, date: ISOdateString };
});

export const updateExpenseSchema = baseExpenseSchema
  .extend({
    id: z.number().min(1),
    description: z.string().trim().min(2, "Provide a valid reason to update."),
  })
  .transform((data) => {
    const ISOdateString = new NepaliDate(data.nepaliDate)
      .toJsDate()
      .toISOString();
    return { ...data, date: ISOdateString };
  });

export type CreateExpenseForm = z.input<typeof createExpenseSchema>;
export type CreateExpensePayload = z.output<typeof createExpenseSchema>;
export type UpdateExpenseForm = z.input<typeof updateExpenseSchema>;
export type UpdateExpensePayload = z.output<typeof updateExpenseSchema>;
