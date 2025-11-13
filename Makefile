.PHONY: backend frontend test docker

backend:
cd backend && uvicorn app.main:app --reload

frontend:
cd frontend && npm run dev

test:
cd backend && pytest

docker:
docker compose -f infra/docker-compose.yml up --build
