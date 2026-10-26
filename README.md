# RoamRajasthan MERN App

RoamRajasthan is a full-stack travel and tourism application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to browse Rajasthan cities, view attractions, itineraries, and profiles, and interact with travel-related content.

This repository includes:
- a React frontend for the web app
- an Express + MongoDB backend API
- Docker setup for local and deployment use
- GitHub Actions CI/CD automation
- Docker Hub publishing for backend/frontend images

---

## Project Overview

The app is designed for a tourist experience around Rajasthan. Users can:
- browse cities and popular destinations
- view place details and itinerary data
- create and manage trip-related content
- register/login to a profile
- upload profile or post content
- explore travel content in a modern frontend interface

---

## CI/CD and Docker Workflow

This project is set up for modern DevOps automation using GitHub Actions and Docker.

### CI/CD pipeline

The workflow file is located at:

- [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml)

When code is pushed to `main` or `master`, GitHub Actions automatically runs:

1. Backend install and validation
   - installs Node.js dependencies
   - checks that the backend entry file exists

2. Frontend install, lint, and build
   - installs frontend packages
   - runs ESLint
   - builds the production bundle
   - uploads the frontend build output as an artifact

3. Docker publish step
   - logs in to Docker Hub using repository secrets
   - builds the backend image from `backend/Dockerfile`
   - builds the frontend image from `frontend/Dockerfile`
   - pushes both images to Docker Hub

### Docker files

The project includes dedicated Docker setup files:

- [backend/Dockerfile](backend/Dockerfile)
- [frontend/Dockerfile](frontend/Dockerfile)
- [docker-compose.yml](docker-compose.yml)

These allow the app to run in containers for both local development and deployment.

### Required GitHub secrets

To enable automatic Docker Hub push, GitHub repository secrets must be configured:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

These are used in the workflow to authenticate with Docker Hub before pushing images.

### Why this matters

This setup gives you:
- automated code validation
- consistent container builds
- reliable environment setup
- no manual Docker pushes required after each merge

---

## Tech Stack

Frontend:
- React
- Vite
- React Router
- Axios
- CSS / custom styling

Backend:
- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads

DevOps:
- Docker
- Docker Compose
- GitHub Actions
- Docker Hub

---

## Repository Structure

```text
RoamRajasthan-MERN-main/
├── backend/
│   ├── Dockerfile
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   ├── middleware/
│   ├── models/
│   └── routes/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── vite.config.js
│   └── src/
├── uploads/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## Local Development

### 1) Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 2) Start MongoDB

You can either run MongoDB locally or use Docker Compose.

Using Docker Compose from the project root:

```bash
docker compose up -d mongo
```

### 3) Run backend

```bash
cd backend
npm run dev
```

### 4) Run frontend

```bash
cd frontend
npm run dev
```

The frontend will usually run on a local Vite port, and the backend runs on its configured API port.

---

## Docker Setup

This project includes Docker configurations for both frontend and backend.

### Build and run local containers

From the project root:

```bash
docker compose up --build
```

This starts:
- MongoDB database
- backend API
- frontend app served through Nginx

### Docker file roles

- backend/Dockerfile: builds the Node.js API image
- frontend/Dockerfile: builds the React app and serves it with Nginx
- docker-compose.yml: defines the full multi-container setup

---

## CI/CD Pipeline

The GitHub Actions workflow in `.github/workflows/ci-cd.yml` handles automation.

### What it does

On every push or pull request to `main` or `master`:
- installs backend dependencies
- verifies the backend entry file exists
- installs frontend dependencies
- runs ESLint on the frontend
- builds the frontend production bundle
- uploads the build artifact

On pushes to `main` or `master`:
- logs into Docker Hub
- builds backend image
- builds frontend image
- pushes both images to Docker Hub

### Required GitHub secrets

For Docker Hub deployment, add these repository secrets in GitHub:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

These are required for the publish step to work.

---

## Docker Hub Publishing

Once the secrets are valid, GitHub Actions will push images like:

```text
<your-dockerhub-username>/roamrajasthan-backend:latest
<your-dockerhub-username>/roamrajasthan-frontend:latest
```

This makes the project easy to pull and deploy anywhere using Docker.

---

## Environment Notes

The backend uses environment variables such as:
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`

These are commonly configured in a `.env` file or injected via Docker environment variables.

---

## Scripts

Backend:

```bash
npm run dev
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
```

---

## Common Workflow

The typical full project lifecycle is:

1. code changes in project files
2. commit and push to GitHub
3. GitHub Actions runs checks and build steps
4. Docker images are built and pushed if secrets are valid
5. app is deployable through Docker images or Docker Compose

---

## Troubleshooting

If Docker image publishing fails:
- verify Docker Hub secrets in GitHub
- ensure token is a valid access token, not a password
- refresh the token if expired
- re-run the GitHub Actions workflow

If local app startup fails:
- ensure MongoDB is running
- verify the backend is using the correct `MONGO_URI`
- check that dependencies are installed correctly

---

## Summary

This project demonstrates a full-stack MERN application with:
- backend API and database integration
- frontend user experience for travel content
- Docker-based environment consistency
- automated CI/CD via GitHub Actions
- Docker Hub image publishing for deployment readiness

It is structured to be both a working project and a good example of a typical modern full-stack deployment flow.
