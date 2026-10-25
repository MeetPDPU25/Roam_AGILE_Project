# ─────────────────────────────────────────────────────────────────
# Frontend Dockerfile — Multi-stage: Build with Vite, serve with Nginx
# ─────────────────────────────────────────────────────────────────

# Stage 1: Build React app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install ALL deps (including devDeps for build)
COPY frontend/package*.json ./
RUN npm ci

# Copy source and build
COPY frontend/ .
RUN npm run build

# Stage 2: Serve with Nginx (lightweight)
FROM nginx:1.27-alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
