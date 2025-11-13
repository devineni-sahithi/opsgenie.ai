from dataclasses import dataclass
from datetime import datetime
from typing import List


@dataclass
class OnCallEngineer:
    name: str
    email: str
    shift_start: datetime
    shift_end: datetime


@dataclass
class SloWindow:
    service: str
    availability: float
    latency_ms: float
    window_start: datetime
    window_end: datetime


@dataclass
class MaintenanceEvent:
    id: str
    description: str
    scheduled_for: datetime
    impact: str


@dataclass
class OperationsOverview:
    on_call: List[OnCallEngineer]
    slos: List[SloWindow]
    maintenance: List[MaintenanceEvent]
