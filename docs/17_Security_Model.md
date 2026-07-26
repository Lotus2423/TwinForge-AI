# Security Model

## Authentication & Authorization

- **JWT** (JSON Web Tokens) for all API access
- Token lifetime: 60 minutes (configurable)
- Refresh token: 7 days
- Password hashing: bcrypt with cost factor 12
- Role-based access: `admin`, `manager`, `engineer`, `viewer`

## IoT Device Security

- Each ESP32 device has a unique `api_key` assigned at machine registration
- Key sent in `X-Device-Key` header (not in URL or payload)
- Keys stored as bcrypt hashes in database
- Rate limited: 1 reading per 5 seconds per device

## Data Security

- PostgreSQL: SSL/TLS connections only
- Sensor data encrypted at rest (PostgreSQL tablespace encryption)
- MQTT: TLS 1.3 (production deployment)
- HTTPS everywhere (Nginx + Let's Encrypt)

## API Security

- CORS: Whitelist only known frontend origins
- Rate limiting: 100 req/min per authenticated user
- Input validation: All sensor values validated before storage
- SQL injection: Prevented via SQLAlchemy ORM (parameterized queries)
- XSS: Content-Security-Policy headers via Nginx

## Threat Model

| Threat | Mitigation |
|---|---|
| Unauthorized API access | JWT required on all routes |
| Fake sensor data injection | Device API key + payload validation |
| SQL injection | SQLAlchemy ORM |
| Data exfiltration | Rate limiting + audit logging |
| Session hijacking | Short-lived JWT + secure cookies |
| MQTT spoofing | TLS + device certificates (Phase 2) |
