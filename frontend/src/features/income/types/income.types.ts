import type { ID, Timestamp } from "@/types/model.types";
import type { CreateIncomePayload } from "../schemas/income.schema";

export type Income = CreateIncomePayload &
  ID &
  Timestamp & {
    receiptBook: {
      id: number;
      bookNumber: number;
    };
    Committee: {
      id: number;
      name: string;
    };
    SubCommittee: {
      id: number;
      name: string;
    } | null;
    User: {
      id: number;
      fullName: string;
    };
    AuthorizedOrgMember: {
      id: number;
      name: string;
    } | null;
  };
