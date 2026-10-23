import type { LoggedInUser } from "@/types/loggedInUser.types";
import { createContext } from "react";

export type AuthContext = {
  user: LoggedInUser | undefined;
  isPending: boolean
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);
