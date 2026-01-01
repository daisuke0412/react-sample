import { api } from "~/lib/api-clients";
import type { LoginUser } from "~/types/login-user";
import type { LoginRequest } from "./types";

export const login = async (data: LoginRequest): Promise<LoginUser> => {
  return api.post<LoginUser>("/login", data);
};

export const logout = async (): Promise<void> => {
  return api.post<void>("/logout");
};