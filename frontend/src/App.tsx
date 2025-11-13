import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchOperationsOverview, type OperationsOverview } from "./api/operations";
import type { IncidentResponse } from "./api/incidents";
import AssistantPanel from "./components/AssistantPanel";
import CreateIncidentForm from "./components/CreateIncidentForm";
import Header from "./components/Header";
import IncidentDetails from "./components/IncidentDetails";
import IncidentList from "./components/IncidentList";
import OperationsOverviewCard from "./components/OperationsOverviewCard";
import { useIncidents } from "./hooks/useIncidents";

function App() {
  const { listQuery, selectIncident } = useIncidents();
  const operationsQuery = useQuery<OperationsOverview>({
    queryKey: ["operations-overview"],
    queryFn: fetchOperationsOverview,
  });
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | undefined>();
  const [selectedIncident, setSelectedIncident] = useState<IncidentResponse | undefined>();

  useEffect(() => {
    const initial = listQuery.data?.[0];
    if (initial && !selectedIncidentId) {
      setSelectedIncidentId(initial.id);
      selectIncident(initial.id).then(setSelectedIncident);
    }
  }, [listQuery.data, selectedIncidentId, selectIncident]);

  const handleSelectIncident = async (id: string) => {
    setSelectedIncidentId(id);
    const details = await selectIncident(id);
    setSelectedIncident(details);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[2fr_3fr_2fr]">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Active Incidents</h2>
            <span className="text-xs text-slate-500">
              {listQuery.isLoading ? "Loading…" : `${listQuery.data?.length ?? 0} incidents`}
            </span>
          </div>
          <IncidentList
            incidents={listQuery.data ?? []}
            selectedId={selectedIncidentId}
            onSelect={handleSelectIncident}
          />
          <CreateIncidentForm
            onCreated={(response) => {
              setSelectedIncidentId(response.incident.id);
              setSelectedIncident(response);
            }}
          />
        </section>

        <section className="space-y-4">
          <IncidentDetails incident={selectedIncident} />
          <OperationsOverviewCard overview={operationsQuery.data} isLoading={operationsQuery.isLoading} />
        </section>

        <section className="h-full min-h-[32rem]">
          <AssistantPanel onResponse={(reply) => console.log("assistant reply", reply)} />
        </section>
      </main>
    </div>
  );
}

export default App;
