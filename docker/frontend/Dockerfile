# TwinForge AI — Frontend Dockerfile
# Multi-stage build: build React app → serve with Node preview

# ── Stage 1: Build ────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (cached layer)
COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# Copy source and build
COPY . .
ARG VITE_API_BASE_URL=http://localhost:8000
ARG VITE_WS_URL=ws://localhost:8000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_WS_URL=$VITE_WS_URL
RUN npm run build

# ── Stage 2: Serve ────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Install only vite for preview server (minimal footprint)
RUN npm install --omit=dev vite

# Create non-root user
RUN adduser -D -u 1001 appuser
USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:3000 || exit 1

CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]
