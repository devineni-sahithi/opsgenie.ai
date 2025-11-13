from __future__ import annotations

from fastapi import APIRouter

from ..schemas import operations as schemas
from ..services import operations as service

router = APIRouter()


@router.get("/overview", response_model=schemas.OperationsOverview)
def get_overview() -> schemas.OperationsOverview:
    return service.generate_operations_snapshot()
