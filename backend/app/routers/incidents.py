from __future__ import annotations

from fastapi import APIRouter, HTTPException

from ..schemas import incidents as schemas
from ..services import incidents as service

router = APIRouter()
_repo = service.IncidentRepository()


@router.get("/", response_model=list[schemas.Incident])
def list_incidents() -> list[schemas.Incident]:
    return list(_repo.list_incidents())


@router.get("/{incident_id}", response_model=schemas.IncidentResponse)
def get_incident(incident_id: str) -> schemas.IncidentResponse:
    incident = _repo.get_incident(incident_id)
    if incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")

    summary, recs = service.summarize_incident(incident)
    incident.summary = summary
    return schemas.IncidentResponse(incident=incident, recommendations=recs)


@router.post("/", response_model=schemas.IncidentResponse, status_code=201)
def create_incident(payload: schemas.IncidentCreate) -> schemas.IncidentResponse:
    incident = _repo.create_incident(payload)
    summary, recs = service.summarize_incident(incident)
    incident.summary = summary
    return schemas.IncidentResponse(incident=incident, recommendations=recs)
