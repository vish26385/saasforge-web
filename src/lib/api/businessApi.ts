import { apiClient } from "@/lib/api/apiClient";
import {
  BusinessProfile,
  CreateBusinessRequest,
} from "@/lib/types/business";

export const businessApi = {
  create: (data: CreateBusinessRequest) =>
    apiClient.post<BusinessProfile>("/api/business", data),

  getMe: () =>
    apiClient.get<BusinessProfile>("/api/business/me"),

  updateMe: (data: Partial<CreateBusinessRequest>) =>
    apiClient.put<BusinessProfile>("/api/business/me", data),
};