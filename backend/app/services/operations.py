from __future__ import annotations

from datetime import datetime, timedelta

from ..schemas import operations as schemas


def generate_operations_snapshot() -> schemas.OperationsOverview:
    """Return synthetic but realistic operations snapshot data."""
    now = datetime.utcnow()
    on_call = [
        schemas.OnCallEngineer(
            name="Jane Doe",
            email="jane.doe@opsgenie.ai",
            shift_start=now - timedelta(hours=4),
            shift_end=now + timedelta(hours=8),
        ),
        schemas.OnCallEngineer(
            name="Carlos Alvarez",
            email="carlos.alvarez@opsgenie.ai",
            shift_start=now + timedelta(hours=8),
            shift_end=now + timedelta(hours=20),
        ),
    ]

    slos = [
        schemas.SloWindow(
            service="payments",
            availability=99.82,
            latency_ms=245,
            window_start=now - timedelta(hours=24),
            window_end=now,
        ),
        schemas.SloWindow(
            service="analytics",
            availability=99.54,
            latency_ms=512,
            window_start=now - timedelta(hours=24),
            window_end=now,
        ),
    ]

    maintenance = [
        schemas.MaintenanceEvent(
            id="MNT-3001",
            description="Database schema migration for orders",
            scheduled_for=now + timedelta(hours=6),
            impact="Read-only mode for 5 minutes",
        ),
        schemas.MaintenanceEvent(
            id="MNT-3002",
            description="Kubernetes cluster node pool upgrade",
            scheduled_for=now + timedelta(days=1),
            impact="Gradual rollout with cordoned nodes",
        ),
    ]

    return schemas.OperationsOverview(on_call=on_call, slos=slos, maintenance=maintenance)
