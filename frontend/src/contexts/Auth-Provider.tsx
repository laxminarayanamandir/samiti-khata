import type { ReactNode } from "react";
import { AuthContext } from "./auth.context";
import useGetLoggedInUser from "@/features/auth/hooks/useGetLoggedInUser";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const { data, isPending } = useGetLoggedInUser();

  return (
    <AuthContext.Provider value={{ user: data, isPending }}>
      {children}
    </AuthContext.Provider>
  );
}
