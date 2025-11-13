import { api } from "./client";

export interface AssistantReply {
  assistant: string;
  response: string;
  generated_at: string;
}

export const postAssistantPrompt = async (prompt: string): Promise<AssistantReply> => {
  const { data } = await api.post<AssistantReply>("/assistant/chat", { prompt });
  return data;
};
