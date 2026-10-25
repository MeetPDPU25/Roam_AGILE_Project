# ─────────────────────────────────────────────────────────────────
# Backend Dockerfile — Multi-stage, production-ready
# ─────────────────────────────────────────────────────────────────

# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy only package files first for better layer caching
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Stage 2: Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source code
COPY backend/ .

# Copy uploads directory (shared volume in production)
RUN mkdir -p /app/../uploads && chown -R appuser:appgroup /app

USER appuser

EXPOSE 5000

ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:5000/ || exit 1

CMD ["node", "server.js"]
