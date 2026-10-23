import type { ID, Timestamp } from "@/types/model.types";
import type { FiscalYearSchema } from "../schemas/fiscal-year.schema";

export type FiscalYear = FiscalYearSchema &
  ID &
  Timestamp & {
    name: string;
    organizationId: number;
  };
