# OpsGenie.AI Infrastructure

Infrastructure assets for deploying OpsGenie.AI.

- `docker-compose.yml` orchestrates the FastAPI backend and React frontend locally.
- `terraform/` contains Azure Container Apps scaffolding for a managed deployment.

## Local development

```bash
docker compose -f infra/docker-compose.yml up --build
```
