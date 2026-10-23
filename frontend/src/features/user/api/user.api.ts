import axiosInstance from "@/lib/axios";
import type { UserSchema } from "../schemas/user.schema";

export async function createUser(data: UserSchema) {
  const response = await axiosInstance.post(`/user`, data);
  return response.data.data;
}
