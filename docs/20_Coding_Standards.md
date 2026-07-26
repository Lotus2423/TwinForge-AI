# Coding Standards

## Python (Backend + AI)

```python
# Always: type hints, docstrings, meaningful names

def calculate_health_score(
    failure_probability: float,
    rul_days: float,
    rul_threshold: float = 30.0
) -> float:
    """
    Calculate machine health score from AI prediction outputs.

    Args:
        failure_probability: Probability of failure (0.0 to 1.0)
        rul_days: Remaining useful life in days
        rul_threshold: Days below which RUL penalty applies

    Returns:
        Health score from 0 to 100. Lower is worse.
    """
    base_score = (1 - failure_probability) * 100
    rul_factor = min(rul_days / rul_threshold, 1.0)
    return round(base_score * rul_factor, 2)
```

**Rules:**
- All functions: type hints + docstring
- Line length: 88 chars (Black formatter)
- Linter: ruff
- Formatter: black
- No bare `except:` — always catch specific exceptions
- No hardcoded values — use `core/config.py`

## TypeScript (Frontend)

```typescript
// Always: explicit types, no 'any', interface for shapes

interface SensorReading {
  machineId: string;
  temperatureC: number;
  vibrationMms: number;
  currentA: number;
  rpm: number;
  recordedAt: string;
}

const formatTemperature = (value: number): string => {
  return `${value.toFixed(1)}°C`;
};
```

**Rules:**
- Strict mode: `"strict": true` in tsconfig
- No `any` without `// eslint-disable` comment and justification
- Components: named exports, not default
- Hooks: custom hooks for all API calls
- CSS: TailwindCSS utilities only (no inline styles)

## Git Commit Format

```
type(scope): description

feat(backend): add sensor ingestion rate limiting
fix(ai): correct bearing wear RUL formula
docs(db): add ER diagram to database design
test(api): add machine endpoint integration tests
refactor(frontend): extract SensorCard component
chore(infra): update docker base images
```
