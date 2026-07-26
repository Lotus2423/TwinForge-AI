# Contributing to TwinForge AI

Thank you for your interest in contributing to TwinForge AI.

## Development Philosophy

TwinForge AI is not a college project. Every contribution must meet production standards.

## Before You Contribute

1. Read the [Project Bible](docs/01_Project_Bible.md)
2. Understand the [System Architecture](docs/02_System_Architecture.md)
3. Follow the [Coding Standards](docs/20_Coding_Standards.md)
4. Follow the [Git Workflow](docs/21_Git_Workflow.md)

## Git Commit Convention

```
type(scope): short description

Types: feat | fix | docs | style | refactor | test | chore
Scope: frontend | backend | ai | iot | twin | db | infra

Examples:
  feat(backend): add machine health score endpoint
  fix(ai): correct RUL calculation for bearing wear
  docs(api): update sensor ingestion specification
  feat(frontend): add real-time vibration chart
```

## Pull Request Process

1. Branch from `develop`, never from `main`
2. One feature per pull request
3. Write tests before implementation
4. Document every public function
5. Update relevant docs in `/docs`
6. Request review before merging

## Code Quality

- TypeScript strict mode on frontend
- Type hints required on all Python functions
- No `any` types without justification
- Test coverage minimum: 80%
- All API endpoints must have integration tests

## Questions?

Open a GitHub Discussion or tag @maintainers in your issue.
