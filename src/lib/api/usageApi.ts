import { apiClient } from "@/lib/api/apiClient";

export interface UsageInfo {
  businessId?: number;
  planCode?: string;
  currentPeriodStartUtc?: string;
  aiRequestsUsed?: number;
  aiRequestLimit?: number;
  lastUpdatedAtUtc?: string;
}

export const usageApi = {
  getMe: () => apiClient.get<UsageInfo>("/api/usage/me"),
};