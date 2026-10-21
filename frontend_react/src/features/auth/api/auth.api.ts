import axiosInstance from "@/lib/axios";
import type { LoginSchema } from "../schemas/login.schema";
import type { LoggedInUser } from "@/types/loggedInUser.types";

export async function login(data: LoginSchema) {
  const response = await axiosInstance.post(`/auth/login`, data);
  return response.data.data;
}

export async function me():Promise<LoggedInUser> {
  const response = await axiosInstance.get(`/auth/me`);
  return response.data.data;
}

export async function logout() {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
}