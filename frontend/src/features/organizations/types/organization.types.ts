import type { ID, Timestamp } from "@/types/model.types";
import type { OrganizationSchema } from "../schemas/organization.schema";

export type Organization = OrganizationSchema & ID & Timestamp & {
    createdBy: number;
}
