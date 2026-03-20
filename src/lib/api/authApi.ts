import { apiClient } from "@/lib/api/apiClient";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "@/lib/types/auth";

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>("/api/Auth/login", data),

  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>("/api/Auth/register", data),
};