# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 0.1.x (MVP) | ✅ Active |

## Reporting a Vulnerability

If you discover a security vulnerability in TwinForge AI:

1. **Do not** open a public GitHub issue
2. Email: security@twinforge.ai
3. Include: description, reproduction steps, potential impact
4. We will respond within 48 hours

## Security Standards

- All API endpoints require JWT authentication
- Passwords hashed with bcrypt (cost factor 12)
- Sensor data encrypted in transit (TLS 1.3)
- Database credentials never exposed in logs
- Environment variables for all secrets
- Rate limiting on all public endpoints
- Input validation on all sensor ingestion endpoints

## Known Security Considerations

- ESP32 communication uses MQTT over TLS
- WebSocket connections require authenticated sessions
- AI model inputs are sanitized before inference
