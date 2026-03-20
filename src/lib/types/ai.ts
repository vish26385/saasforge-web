export interface AskAiRequest {
  prompt: string;
  platform: string;
  tone: string;
  featureType: string;
  extraInstruction?: string;
}

export interface AskAiResponse {
  id: number;
  businessId: number;
  featureType: string;
  prompt: string;
  systemPrompt?: string | null;
  inputContextJson?: string | null;
  response: string;
  model?: string;
  createdAtUtc?: string;
}

export interface AiHistoryItem {
  id: number;
  businessId: number;
  featureType: string;
  prompt: string;
  systemPrompt?: string | null;
  inputContextJson?: string | null;
  response: string;
  model?: string;
  createdAtUtc?: string;
}