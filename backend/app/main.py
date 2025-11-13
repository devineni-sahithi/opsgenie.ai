from fastapi import FastAPI

from .routers import incidents, operations, assistant

app = FastAPI(
    title="OpsGenie.AI API",
    description="AI-powered incident and operations assistant backend",
    version="0.1.0",
)

app.include_router(incidents.router, prefix="/incidents", tags=["incidents"])
app.include_router(operations.router, prefix="/operations", tags=["operations"])
app.include_router(assistant.router, prefix="/assistant", tags=["assistant"])


@app.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    """Simple health check endpoint for uptime monitoring."""
    return {"status": "ok"}
