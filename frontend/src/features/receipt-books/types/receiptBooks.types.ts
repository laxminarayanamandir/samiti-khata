import type { ID, Timestamp } from "@/types/model.types";
import type { ReceiptBookSchema } from "../schemas/receipt-books.schema";

export type ReceiptBook = ReceiptBookSchema &
  ID &
  Timestamp & {
    organizationId: number;
    fiscalYear: {
      id: number;
      name: string;
    };
    assignedMember: null | {
      id: number;
      name: string;
    };
  };
