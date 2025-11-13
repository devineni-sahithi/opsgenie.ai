import { useQuery } from "@tanstack/react-query";

import { fetchIncident, fetchIncidents, type IncidentResponse } from "../api/incidents";

export const useIncidents = () => {
  const listQuery = useQuery({ queryKey: ["incidents"], queryFn: fetchIncidents });

  const selectIncident = async (id: string): Promise<IncidentResponse> => {
    return fetchIncident(id);
  };

  return { listQuery, selectIncident };
};
