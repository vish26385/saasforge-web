import { apiClient } from "@/lib/api/apiClient";
import { AskAiRequest, AskAiResponse, AiHistoryItem } from "@/lib/types/ai";

export const aiApi = {
  ask: (data: AskAiRequest) =>
    apiClient.post<AskAiResponse>("/api/Ai/ask", data),

  history: () =>
    apiClient.get<AiHistoryItem[]>("/api/Ai/history"),
};