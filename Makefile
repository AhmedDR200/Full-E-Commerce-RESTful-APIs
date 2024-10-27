# Variables
IMAGE_NAME := ahmedmagdy007/e-commerce-app
CONTAINER_NAME := e-commerce-cont
TAG := v1.0

# Login to Docker Hub
login:
	@docker login

# Build the Docker image
build:
	@docker build -t $(IMAGE_NAME):$(TAG) .

# Push the Docker image to Docker Hub
push:
	@docker push $(IMAGE_NAME):$(TAG)

# Pull the Docker image from Docker Hub
pull:
	@docker pull $(IMAGE_NAME):$(TAG)

# Run the Docker container
run:
	@docker run -d -p 3000:3000 --name $(CONTAINER_NAME) $(IMAGE_NAME):$(TAG)

# Stop the Docker container
stop:
	@docker stop $(CONTAINER_NAME)

# Remove the Docker container
remove-cont:
	@docker rm $(CONTAINER_NAME)

# Remove the Docker image
remove-image:
	@docker rmi $(IMAGE_NAME):$(TAG)

# Clean up all stopped containers and unused images
clean:
	@docker system prune -f

# Docker Compose Commands:
# Run the services with Docker Compose
compose-up:
	@docker compose up -d

# Stop the services with Docker Compose
compose-down:
	@docker compose down

# Build the images with Docker Compose
compose-build:
	@docker compose build

# View real-time logs with Docker Compose
compose-logs:
	@docker compose logs -f

# Restart the services with Docker Compose
compose-restart:
	@docker compose down && docker compose up -d

# Usage instructions
help:
	@echo "Makefile Commands:"
	@echo "  make login             - Log in to Docker Hub"
	@echo "  make build             - Build the Docker image"
	@echo "  make push              - Push the Docker image to Docker Hub"
	@echo "  make pull              - Pull the Docker image from Docker Hub"
	@echo "  make run               - Run the Docker container with a custom name"
	@echo "  make stop              - Stop the running Docker container"
	@echo "  make remove-cont       - Remove the Docker container by name"
	@echo "  make remove-image      - Remove the Docker image"
	@echo "  make clean             - Clean up stopped containers and unused images"
	@echo "  make compose-up        - Start services with Docker Compose"
	@echo "  make compose-down      - Stop services with Docker Compose"
	@echo "  make compose-build     - Build images with Docker Compose"
	@echo "  make compose-logs      - View real-time logs with Docker Compose"
	@echo "  make compose-restart   - Restart services with Docker Compose"

# Default target
.DEFAULT_GOAL := help
