import { formatDistanceToNow } from "date-fns";

import type { OperationsOverview } from "../api/operations";

interface Props {
  overview?: OperationsOverview;
  isLoading?: boolean;
}

export const OperationsOverviewCard = ({ overview, isLoading }: Props) => {
  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-lg font-semibold text-white">Operations Overview</h2>
      {isLoading ? (
        <p className="text-sm text-slate-400">Loading operations data…</p>
      ) : overview ? (
        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              On-Call Rotation
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-200">
              {overview.on_call.map((engineer) => (
                <li key={engineer.email} className="rounded-lg bg-slate-900/80 p-3">
                  <p className="font-medium text-white">{engineer.name}</p>
                  <p className="text-xs text-slate-400">{engineer.email}</p>
                  <p className="text-xs text-slate-400">
                    Shift ends {formatDistanceToNow(new Date(engineer.shift_end), { addSuffix: true })}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">SLOs</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-200">
              {overview.slos.map((slo) => (
                <li key={slo.service} className="flex items-center justify-between rounded-lg bg-slate-900/80 p-3">
                  <div>
                    <p className="font-medium text-white">{slo.service}</p>
                    <p className="text-xs text-slate-400">Last 24h</p>
                  </div>
                  <div className="text-right text-xs text-slate-300">
                    <p>{slo.availability.toFixed(2)}% availability</p>
                    <p>{slo.latency_ms}ms latency p95</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Maintenance
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-200">
              {overview.maintenance.map((event) => (
                <li key={event.id} className="rounded-lg bg-slate-900/80 p-3">
                  <p className="font-medium text-white">{event.description}</p>
                  <p className="text-xs text-slate-400">{event.impact}</p>
                  <p className="text-xs text-slate-500">
                    Scheduled {formatDistanceToNow(new Date(event.scheduled_for), { addSuffix: true })}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <p className="text-sm text-slate-400">No operations data available.</p>
      )}
    </div>
  );
};

export default OperationsOverviewCard;
