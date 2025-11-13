from __future__ import annotations

from datetime import datetime
from typing import Iterable, List

from ..schemas import incidents as incident_schemas

SYSTEM_PROMPT = """You are OpsGenie.AI, a pragmatic site reliability co-pilot.
Summarize incidents, suggest mitigation steps, and remind engineers about SRE best practices.
Keep responses concise and actionable.
"""


def craft_ai_reply(
    message: str,
    incidents: Iterable[incident_schemas.Incident],
) -> dict[str, str]:
    """Return a synthetic AI assistant style response."""
    message_lower = message.lower()
    context: List[str] = []

    if "latency" in message_lower:
        context.append(
            "Review recent latency SLO breaches and confirm database query plans are healthy."
        )
    if "deploy" in message_lower:
        context.append("Check the deploy train dashboard for failed canaries or blocked releases.")
    if "pager" in message_lower:
        context.append("Ensure escalation policy targets are reachable and acknowledged the page.")

    latest_incident = next(iter(incidents), None)
    if latest_incident:
        context.append(
            f"Most recent incident {latest_incident.id} ({latest_incident.title}) is {latest_incident.status}."
        )

    if not context:
        context.append(
            "No immediate playbook found. Review service dashboards and confirm alerts are actionable."
        )

    return {
        "assistant": SYSTEM_PROMPT.strip(),
        "response": "\n".join(f"• {item}" for item in context),
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }
