import type { ID, Timestamp } from "@/types/model.types";
import type { CreateExpensePayload } from "../schemas/expense.schema";

export type Expense = CreateExpensePayload &
  ID &
  Timestamp & {
    Category: {
      id: number;
      name: string;
    };
    Committee: {
      id: number;
      name: string;
    };
    AuthorizedOrgMember: {
      id: number;
      name: string;
    } | null;
    SubCommittee: {
      id: number;
      name: string;
    } | null;
    User: {
      id: number;
      fullName: string;
    };
  };
