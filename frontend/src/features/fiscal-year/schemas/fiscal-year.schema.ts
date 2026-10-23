import NepaliDate from "nepali-date-converter";
import z from "zod";

export const fiscalYearSchema = z
  .object({
    startDateBs: z
      .string("Start Date is required.")
      .regex(/^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[02])$/, {
        message: "Invalid date.",
      }),

    endDateBs: z
      .string("End Date is required.")
      .regex(/^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[02])$/, {
        message: "Invalid date.",
      }),

    startDateIso: z.iso.datetime().optional(),
    endDateIso: z.iso.datetime().optional(),
  })

  .transform((data) => {
    const startDateIso = new NepaliDate(data.startDateBs)
      .toJsDate()
      .toISOString();

    const endDateIso = new NepaliDate(data.endDateBs).toJsDate().toISOString();

    return { ...data, startDateIso, endDateIso };
  })
  .superRefine((data, context) => {
    if (data.startDateIso > data.endDateIso) {
      context.addIssue({
        code: "custom",
        path: ["startDateBs"],
        message: "Start date cannot be ahead of end date.",
      });
    }

    if (data.startDateIso === data.endDateIso) {
      context.addIssue({
        code: "custom",
        path: ["startDateBs", "endDateBs"],
        message: "Start and End date cannot be equal.",
      });
    }
  });

export type FiscalYearSchema = z.infer<typeof fiscalYearSchema>;
export type FiscalYearInputSchema = z.input<typeof fiscalYearSchema>;
