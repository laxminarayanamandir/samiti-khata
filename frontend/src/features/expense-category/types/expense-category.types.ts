import type { ID, Timestamp } from "@/types/model.types";
import type { ExpenseCategorySchema } from "../schemas/expense-category.schema";

export type ExpenseCategory = ExpenseCategorySchema & ID & Timestamp & {
    organizationId: number;
    createdBy: number;
}
