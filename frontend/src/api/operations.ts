import { api } from "./client";

export interface OnCallEngineer {
  name: string;
  email: string;
  shift_start: string;
  shift_end: string;
}

export interface SloWindow {
  service: string;
  availability: number;
  latency_ms: number;
  window_start: string;
  window_end: string;
}

export interface MaintenanceEvent {
  id: string;
  description: string;
  scheduled_for: string;
  impact: string;
}

export interface OperationsOverview {
  on_call: OnCallEngineer[];
  slos: SloWindow[];
  maintenance: MaintenanceEvent[];
}

export const fetchOperationsOverview = async (): Promise<OperationsOverview> => {
  const { data } = await api.get<OperationsOverview>("/operations/overview");
  return data;
};
