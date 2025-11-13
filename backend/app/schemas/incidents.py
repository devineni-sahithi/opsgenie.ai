from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import List, Optional


class Severity(str, Enum):
    sev1 = "SEV1"
    sev2 = "SEV2"
    sev3 = "SEV3"


@dataclass
class IncidentTimelineEntry:
    timestamp: datetime
    message: str
    author: str


@dataclass
class Incident:
    id: str
    title: str
    service: str
    severity: Severity
    status: str
    opened_at: datetime
    closed_at: Optional[datetime] = None
    timeline: List[IncidentTimelineEntry] = field(default_factory=list)
    runbook_url: Optional[str] = None
    summary: Optional[str] = None


@dataclass
class IncidentCreate:
    title: str
    service: str
    severity: Severity
    description: str


@dataclass
class IncidentResponse:
    incident: Incident
    recommendations: List[str]
