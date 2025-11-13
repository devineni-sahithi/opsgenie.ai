from datetime import datetime

from app.schemas import incidents as schemas
from app.services import incidents


def test_recommendations_include_runbook():
    incident = schemas.Incident(
        id="INC-1",
        title="Latency spike",
        service="api",
        severity=schemas.Severity.sev2,
        status="open",
        opened_at=datetime.utcnow(),
        runbook_url="https://runbooks.opsgenie.ai/test",
    )

    _, recs = incidents.summarize_incident(incident)
    assert any("runbook" in rec.lower() for rec in recs)


def test_create_incident_assigns_new_id():
    repo = incidents.IncidentRepository()
    initial_ids = {inc.id for inc in repo.list_incidents()}

    created = repo.create_incident(
        schemas.IncidentCreate(
            title="Cache failure",
            service="web",
            severity=schemas.Severity.sev3,
            description="Redis eviction rate spiked",
        )
    )

    assert created.id not in initial_ids
    assert created.status == "triaging"
