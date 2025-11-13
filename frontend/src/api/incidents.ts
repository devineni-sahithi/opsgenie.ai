import { api } from "./client";

export interface IncidentTimelineEntry {
  timestamp: string;
  message: string;
  author: string;
}

export interface Incident {
  id: string;
  title: string;
  service: string;
  severity: "SEV1" | "SEV2" | "SEV3";
  status: string;
  opened_at: string;
  closed_at?: string;
  timeline: IncidentTimelineEntry[];
  runbook_url?: string;
  summary?: string;
}

export interface IncidentResponse {
  incident: Incident;
  recommendations: string[];
}

export interface IncidentCreate {
  title: string;
  service: string;
  severity: "SEV1" | "SEV2" | "SEV3";
  description: string;
}

export const fetchIncidents = async (): Promise<Incident[]> => {
  const { data } = await api.get<Incident[]>("/incidents/");
  return data;
};

export const fetchIncident = async (id: string): Promise<IncidentResponse> => {
  const { data } = await api.get<IncidentResponse>(`/incidents/${id}`);
  return data;
};

export const createIncident = async (
  payload: IncidentCreate
): Promise<IncidentResponse> => {
  const { data } = await api.post<IncidentResponse>("/incidents/", payload);
  return data;
};
