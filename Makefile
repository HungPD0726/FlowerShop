.PHONY: dev build up down logs db-up db-down clean help

help:
	@echo "Lá & Hoa Flower Shop E-Commerce Management Commands:"
	@echo "  make dev         - Start development database container"
	@echo "  make up          - Start all docker production containers"
	@echo "  make down        - Stop all docker containers"
	@echo "  make logs        - View container logs"
	@echo "  make build       - Build docker images"
	@echo "  make clean       - Remove built files and temporary data"

dev:
	docker compose -f docker-compose.dev.yml up -d

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f

clean:
	rm -rf backend/target frontend/.next
