import { format } from "date-fns";

import type { IncidentResponse } from "../api/incidents";

interface Props {
  incident?: IncidentResponse;
}

export const IncidentDetails = ({ incident }: Props) => {
  if (!incident) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-6 text-center text-slate-400">
        Select an incident to view timeline and recommendations.
      </div>
    );
  }

  const { incident: data, recommendations } = incident;

  return (
    <div className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-white">{data.title}</h2>
        <p className="text-sm text-slate-400">{data.summary}</p>
        {data.runbook_url ? (
          <a
            href={data.runbook_url}
            className="text-sm font-medium text-brand-400 hover:text-brand-300"
            target="_blank"
            rel="noreferrer"
          >
            View runbook
          </a>
        ) : null}
      </div>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Timeline
        </h3>
        <ol className="mt-3 space-y-3 border-l border-slate-700 pl-4">
          {data.timeline.map((entry, index) => (
            <li key={index} className="relative">
              <span className="absolute -left-5 top-1 h-2 w-2 rounded-full bg-brand-500" />
              <p className="text-xs text-slate-400">
                {format(new Date(entry.timestamp), "MMM d, HH:mm")} by {entry.author}
              </p>
              <p className="text-sm text-slate-200">{entry.message}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Recommendations
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-200">
          {recommendations.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default IncidentDetails;
