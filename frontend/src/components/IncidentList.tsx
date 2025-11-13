import { formatDistanceToNow } from "date-fns";

import type { Incident } from "../api/incidents";

interface IncidentListProps {
  incidents: Incident[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const severityColors: Record<Incident["severity"], string> = {
  SEV1: "bg-rose-500/20 text-rose-200",
  SEV2: "bg-amber-500/20 text-amber-200",
  SEV3: "bg-sky-500/20 text-sky-200",
};

export const IncidentList = ({ incidents, selectedId, onSelect }: IncidentListProps) => (
  <div className="space-y-2">
    {incidents.map((incident) => (
      <button
        key={incident.id}
        onClick={() => onSelect(incident.id)}
        className={`w-full rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-left transition hover:border-brand-500 ${
          incident.id === selectedId ? "border-brand-500" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">{incident.title}</h3>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${severityColors[incident.severity]}`}
          >
            {incident.severity}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
          <span>{incident.service}</span>
          <span>
            {incident.status} • opened {formatDistanceToNow(new Date(incident.opened_at), {
              addSuffix: true,
            })}
          </span>
        </div>
      </button>
    ))}
  </div>
);

export default IncidentList;
