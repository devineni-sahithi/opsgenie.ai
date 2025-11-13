# OpsGenie.AI

OpsGenie.AI is an end-to-end demo platform that blends product engineering, polished UI, pragmatic AI assistance, and SRE operations practices. It simulates an AI-powered incident commander that surfaces active incidents, operational health, and automated runbook recommendations.

## Project layout

- `backend/` — FastAPI service exposing incident, operations, and AI assistant APIs.
- `frontend/` — React + Vite dashboard that consumes the backend and highlights AI-assisted workflows.
- `infra/` — Infrastructure-as-code samples for deploying OpsGenie.AI.
- `ops/` — Operational runbooks, SLO definitions, and playbooks for the platform.
- `docs/` — Product requirements, UX flows, and architecture notes.

## Getting started

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` to the backend URL (defaults to `http://localhost:8000`).

### Tests

```bash
cd backend
pytest
```

## Why this project?

OpsGenie.AI demonstrates:

- **Product development** — Clear domain model for incidents, operations data, and collaboration workflows.
- **UI polish** — Tailwind-styled dashboard with responsive layout, rich cards, and interactive assistant panel.
- **AI integration** — Backend assistant service generating contextual recommendations and guidance.
- **SRE ops** — Synthetic on-call rotations, SLO snapshots, and deployment runbooks packaged with IaC samples.
