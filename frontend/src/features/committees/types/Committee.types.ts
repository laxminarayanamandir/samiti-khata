import type { ID, Timestamp } from "@/types/model.types";
import type {
  CommitteeSchema,
  SubCommitteePayload,
} from "../schemas/committee.schema";

export type Committee = CommitteeSchema &
  ID &
  Timestamp & {
    isActive: boolean;
    organizationId: number;
    createdBy: number;
  };

export type SubCommittee = SubCommitteePayload &
  ID &
  Timestamp & {
    createdBy: number;
    Committee: {
      id: number;
      name: string;
    };
  };
