from __future__ import annotations

from fastapi import APIRouter, Body

from ..schemas import incidents as incident_schemas
from ..services import assistant as assistant_service
from ..services import incidents as incident_service

router = APIRouter()
_repo = incident_service.IncidentRepository()


@router.post("/chat")
def chat(prompt: str = Body(..., embed=True)) -> dict[str, str]:
    incidents = _repo.list_incidents()
    return assistant_service.craft_ai_reply(prompt, incidents)
