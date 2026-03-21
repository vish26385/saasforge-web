import { apiClient } from "@/lib/api/apiClient";

export interface SubscriptionInfo {
  id?: number;
  planCode?: string;
  status?: string;
  startDateUtc?: string;
  endDateUtc?: string | null;
  createdAtUtc?: string;
  updatedAtUtc?: string;
}

export type ChangePlanResult = {
  changed: boolean;
  message: string;
  subscription: SubscriptionInfo;
};

// export const subscriptionApi = {
//   getMe: () => apiClient.get<SubscriptionInfo>("/api/subscription/me"),

//   changePlanToPro: () =>
//     apiClient.post<SubscriptionInfo>(
//       "/api/subscription/change-plan?planCode=pro"
//     ),
// };

export const subscriptionApi = {
  getMe: () => apiClient.get<SubscriptionInfo>("/api/subscription/me"),

    changePlanToPro: () =>
    apiClient.post<ChangePlanResult>(
      "/api/subscription/change-plan?planCode=pro"
    ),
};