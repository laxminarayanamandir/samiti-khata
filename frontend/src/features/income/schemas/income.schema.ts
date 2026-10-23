import z from "zod";
import NepaliDate from "nepali-date-converter";
import { PaymentModes } from "@/constants/paymentModes";

const baseIncomeSchema = z.object({
  receiptBookId: z
    .string()
    .trim()
    .min(1, "Receipt Book is required.")
    .refine((value) => !isNaN(Number(value)), {
      error: "Invalid Book.",
    })
    .transform((num) => Number(num)),

  receiptNumber: z
    .string()
    .trim()
    .min(1, "Receipt Number is required.")
    .refine((value) => !isNaN(Number(value)), {
      error: "Invalid Receipt Number.",
    })
    .transform((num) => Number(num)),

  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 chars long.")
    .max(50, "Name cannot exceed 50 characters."),

  address: z
    .string()
    .trim()
    .min(2, "Address must be at least 2 chars long.")
    .max(50, "Address cannot exceed 50 characters."),

  amount: z
    .string("Amount is required.")
    .regex(/^\d+(\.\d{1,2})?$/, {
      error:
        "Invalid amount. Amount should contain at most 2 numbers after decimal point.",
    })
    .transform((a) => Number(a)),

  paymentMode: z.enum(PaymentModes),

  remarks: z.string().trim().optional(),

  receiptIssuerId: z
    .string()
    .regex(/^\d*$/, {
      error: "Invalid member assigned.",
    })
    .transform((num) => (num.length > 0 ? Number(num) : undefined))
    .optional(),

  committeeId: z
    .string()
    .trim()
    .min(1, "Committee is required.")
    .refine((value) => !isNaN(Number(value)), {
      error: "Invalid Committee.",
    })
    .transform((a) => Number(a)),

  date: z.iso.datetime().optional(),

  nepaliDate: z
    .string("Date is required.")
    .regex(/^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[02])$/, {
      message: "Invalid date.",
    }),

  subCommitteeId: z
    .string()
    .regex(/^\d*$/, {
      error: "Invalid Sub Committee",
    })
    .transform((num) => (num.length > 0 ? Number(num) : undefined))
    .optional(),
});

export const createIncomeSchema = baseIncomeSchema.transform((data) => {
  const ISOdateString = new NepaliDate(data.nepaliDate)
    .toJsDate()
    .toISOString();
  return { ...data, date: ISOdateString };
});

export const updateIncomeSchema = baseIncomeSchema
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

export type CreateIncomeForm = z.input<typeof createIncomeSchema>;
export type CreateIncomePayload = z.output<typeof createIncomeSchema>;
export type UpdateIncomeForm = z.input<typeof updateIncomeSchema>;
export type UpdateIncomePayload = z.output<typeof updateIncomeSchema>;
