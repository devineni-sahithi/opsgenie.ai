import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { postAssistantPrompt, type AssistantReply } from "../api/assistant";

interface Props {
  onResponse?: (reply: AssistantReply) => void;
}

export const AssistantPanel = ({ onResponse }: Props) => {
  const [prompt, setPrompt] = useState("");
  const mutation = useMutation({
    mutationFn: postAssistantPrompt,
    onSuccess: (reply) => {
      onResponse?.(reply);
    },
  });

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/60">
      <div className="border-b border-slate-800 p-4">
        <h2 className="text-lg font-semibold text-white">Ops Assistant</h2>
        <p className="text-xs text-slate-400">
          Ask for mitigation suggestions, runbook reminders, and SRE tips.
        </p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {mutation.data ? (
          <div className="space-y-2 text-sm text-slate-200">
            <p className="whitespace-pre-wrap text-slate-300">{mutation.data.response}</p>
            <p className="text-xs text-slate-500">Generated at {mutation.data.generated_at}</p>
          </div>
        ) : (
          <p className="text-sm text-slate-400">
            Prompt the assistant to surface playbooks, on-call context, and AI guidance.
          </p>
        )}
        {mutation.isError ? (
          <p className="rounded-lg bg-rose-500/10 p-2 text-xs text-rose-200">
            Failed to fetch assistant response. Please try again.
          </p>
        ) : null}
      </div>
      <form
        className="space-y-2 border-t border-slate-800 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!prompt.trim()) return;
          mutation.mutate(prompt);
        }}
      >
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="h-24 w-full rounded-lg border border-slate-700 bg-slate-950/80 p-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none"
          placeholder="Ask about incident mitigation, on-call status, or runbooks"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded-lg bg-brand-500 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {mutation.isPending ? "Thinking…" : "Ask OpsGenie.AI"}
        </button>
      </form>
    </div>
  );
};

export default AssistantPanel;
