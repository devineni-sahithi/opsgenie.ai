from __future__ import annotations

import itertools
from datetime import datetime, timedelta
from typing import Iterable, List, Tuple

from ..schemas import incidents as schemas


class IncidentRepository:
    """In-memory store for demo incidents."""

    def __init__(self) -> None:
        self._incidents: dict[str, schemas.Incident] = {
            "INC-1001": schemas.Incident(
                id="INC-1001",
                title="Latency spike on payments API",
                service="payments",
                severity=schemas.Severity.sev2,
                status="monitoring",
                opened_at=datetime.utcnow() - timedelta(hours=2),
                summary="Payments API latency exceeded 95th percentile SLO.",
                timeline=[
                    schemas.IncidentTimelineEntry(
                        timestamp=datetime.utcnow() - timedelta(hours=2),
                        message="Pager triggered for elevated latency",
                        author="pager",
                    ),
                    schemas.IncidentTimelineEntry(
                        timestamp=datetime.utcnow() - timedelta(hours=1, minutes=20),
                        message="Identified spike in database connections",
                        author="jane@opsgenie.ai",
                    ),
                    schemas.IncidentTimelineEntry(
                        timestamp=datetime.utcnow() - timedelta(minutes=45),
                        message="Applied connection pool tuning",
                        author="jane@opsgenie.ai",
                    ),
                ],
                runbook_url="https://runbooks.opsgenie.ai/payments-latency",
            ),
            "INC-1002": schemas.Incident(
                id="INC-1002",
                title="Degraded throughput on analytics pipeline",
                service="analytics",
                severity=schemas.Severity.sev3,
                status="open",
                opened_at=datetime.utcnow() - timedelta(hours=5),
                summary="Batch jobs lagging by >45 minutes",
                timeline=[
                    schemas.IncidentTimelineEntry(
                        timestamp=datetime.utcnow() - timedelta(hours=5),
                        message="Alert from Airflow: task retries exceeded",
                        author="pager",
                    ),
                ],
                runbook_url="https://runbooks.opsgenie.ai/analytics-backlog",
            ),
        }
        self._id_counter = itertools.count(start=2000)

    def list_incidents(self) -> Iterable[schemas.Incident]:
        return self._incidents.values()

    def get_incident(self, incident_id: str) -> schemas.Incident | None:
        return self._incidents.get(incident_id)

    def create_incident(self, payload: schemas.IncidentCreate) -> schemas.Incident:
        incident_id = f"INC-{next(self._id_counter)}"
        incident = schemas.Incident(
            id=incident_id,
            title=payload.title,
            service=payload.service,
            severity=payload.severity,
            status="triaging",
            opened_at=datetime.utcnow(),
            timeline=[
                schemas.IncidentTimelineEntry(
                    timestamp=datetime.utcnow(),
                    message=payload.description,
                    author="reporter",
                )
            ],
        )
        self._incidents[incident_id] = incident
        return incident


class IncidentRecommender:
    """Generates lightweight AI-style recommendations for incidents."""

    @staticmethod
    def recommend_actions(incident: schemas.Incident) -> List[str]:
        suggestions: List[str] = []
        severity_actions: dict[schemas.Severity, str] = {
            schemas.Severity.sev1: "Page the incident commander and initiate war room.",
            schemas.Severity.sev2: "Notify service owner and evaluate customer impact.",
            schemas.Severity.sev3: "Update status page if customer-facing delays persist.",
        }
        suggestions.append(severity_actions.get(incident.severity, "Assess impact."))

        if "latency" in incident.title.lower():
            suggestions.append(
                "Check p99 latency dashboards in Grafana and validate database performance metrics."
            )
        if "throughput" in incident.title.lower() or "backlog" in (incident.summary or ""):
            suggestions.append(
                "Investigate worker autoscaling events and recent deploys affecting pipelines."
            )
        if incident.runbook_url:
            suggestions.append(f"Review associated runbook: {incident.runbook_url}")

        if incident.status != "closed":
            suggestions.append("Document mitigation steps in the timeline to aid retrospectives.")

        return suggestions


def summarize_incident(incident: schemas.Incident) -> Tuple[str, List[str]]:
    """Return summary text and bullet recommendations."""
    summary = incident.summary or (
        f"{incident.title} affecting {incident.service} currently {incident.status}."
    )
    recs = IncidentRecommender.recommend_actions(incident)
    return summary, recs
