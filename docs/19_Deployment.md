# Deployment Architecture

## Environments

| Environment | Purpose | Infrastructure |
|---|---|---|
| Development | Local development | Docker Compose |
| Staging | Testing before release | Cloud VM (1 instance) |
| Production | Live factory deployment | Cloud + Load Balancer |

## Docker Compose (Development)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Run migrations
docker-compose exec backend alembic upgrade head
```

## Production Architecture (Phase 8)

```
Internet
    ↓
Cloudflare (DDoS protection + CDN)
    ↓
Nginx (SSL termination + load balancing)
    ↓
┌──────────────┬───────────────┐
│   Frontend   │    Backend    │
│ Static CDN   │  FastAPI ×2   │
│ (Vercel)     │  (AWS EC2)    │
└──────────────┴───────────────┘
                      ↓
               PostgreSQL (RDS)
                      ↓
              Redis (session + WS pub/sub)
```

## CI/CD Pipeline (GitHub Actions)

```yaml
# On push to main:
1. Run all tests
2. Build Docker images
3. Push to container registry
4. Deploy to staging
5. Health check
6. Manual approval → Deploy to production
```

## Monitoring (Phase 8)

- Uptime: UptimeRobot
- Error tracking: Sentry
- Metrics: Prometheus + Grafana
- Logs: Loki + Grafana
