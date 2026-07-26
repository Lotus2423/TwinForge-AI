# Git Workflow

## Branch Strategy

```
main          — Production-ready code only. Protected.
develop       — Integration branch. PR target.
feature/*     — Individual features.
fix/*         — Bug fixes.
docs/*        — Documentation updates.
release/*     — Release preparation.
```

## Flow

```
1. Create branch from develop:
   git checkout develop
   git pull origin develop
   git checkout -b feature/sensor-ingestion-api

2. Develop with regular commits:
   git commit -m "feat(backend): add POST /sensors/ingest endpoint"
   git commit -m "test(api): add sensor ingestion integration test"
   git commit -m "docs(api): document sensor ingestion spec"

3. Push and open PR to develop:
   git push origin feature/sensor-ingestion-api
   # Open PR → code review → merge

4. Release to main:
   # Create release/v0.2.0 branch
   # Final testing
   # Merge to main
   # Tag: git tag -a v0.2.0 -m "Release 0.2.0: Sensor ingestion complete"
```

## Protected Rules

- `main` and `develop` are protected — no direct push
- PRs require at least one review
- All CI checks must pass before merge
- Squash and merge for feature branches
