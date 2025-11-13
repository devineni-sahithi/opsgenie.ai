import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createIncident, type IncidentCreate, type IncidentResponse } from "../api/incidents";

interface Props {
  onCreated?: (incident: IncidentResponse) => void;
}

const initialState: IncidentCreate = {
  title: "",
  service: "",
  severity: "SEV2",
  description: "",
};

export const CreateIncidentForm = ({ onCreated }: Props) => {
  const [form, setForm] = useState<IncidentCreate>(initialState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createIncident,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      onCreated?.(response);
      setForm(initialState);
    },
  });

  const updateField = <K extends keyof IncidentCreate>(key: K, value: IncidentCreate[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6"
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate(form);
      }}
    >
      <div>
        <h2 className="text-lg font-semibold text-white">Create Incident</h2>
        <p className="text-xs text-slate-400">Raise a simulated incident for triage.</p>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-400" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          value={form.title}
          onChange={(event) => updateField("title", event.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-sm text-white focus:border-brand-500 focus:outline-none"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400" htmlFor="service">
            Service
          </label>
          <input
            id="service"
            value={form.service}
            onChange={(event) => updateField("service", event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-sm text-white focus:border-brand-500 focus:outline-none"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wide text-slate-400" htmlFor="severity">
            Severity
          </label>
          <select
            id="severity"
            value={form.severity}
            onChange={(event) => updateField("severity", event.target.value as IncidentCreate["severity"])}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-sm text-white focus:border-brand-500 focus:outline-none"
          >
            <option value="SEV1">SEV1 - Critical</option>
            <option value="SEV2">SEV2 - Major</option>
            <option value="SEV3">SEV3 - Minor</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label
          className="text-xs font-medium uppercase tracking-wide text-slate-400"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          className="h-24 w-full rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-sm text-white focus:border-brand-500 focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-emerald-500 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Creating…" : "Raise Incident"}
      </button>

      {mutation.isError ? (
        <p className="rounded-lg bg-rose-500/10 p-2 text-xs text-rose-200">
          Failed to create incident. Try again.
        </p>
      ) : null}
    </form>
  );
};

export default CreateIncidentForm;
