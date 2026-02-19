# Sentinel Pulse API Contract v1

## 목적

Frontend, Backend, Data 팀이 동일한 계약으로 병렬 개발할 수 있도록 REST/WS 인터페이스를 고정한다.

## 1) Base conventions

- Base path: `/api/v1`
- Content type: `application/json; charset=utf-8`
- Time format: ISO-8601 UTC (`YYYY-MM-DDTHH:mm:ssZ`)
- Paging: `page`, `pageSize`, `total`
- Error envelope:

```json
{
  "error": {
    "code": "INVALID_QUERY",
    "message": "...",
    "traceId": "..."
  }
}
```

## 2) REST endpoints

## `GET /api/v1/incidents`

query:

- `region` (optional)
- `from`, `to` (optional, ISO datetime)
- `incidentType[]` (optional)
- `minSeverity` (optional)
- `minConfidence` (optional, 0~1)
- `status` (optional)
- `page`, `pageSize`

response 200:

```json
{
  "items": [
    {
      "id": "SP-2094",
      "title": "Warehouse Block Arson Pattern",
      "incidentType": "arson",
      "severityLevel": "high",
      "status": "monitoring",
      "confidenceScore": 0.91,
      "regionCode": "KR-11-WEST",
      "geoCellId": "KR11-GRID-1452",
      "occurredAt": "2026-01-24T02:26:00Z",
      "updatedAt": "2026-01-24T02:37:00Z"
    }
  ],
  "page": 1,
  "pageSize": 20,
  "total": 187
}
```

## `GET /api/v1/incidents/{incidentId}`

response 200:

```json
{
  "id": "SP-2094",
  "title": "Warehouse Block Arson Pattern",
  "status": "monitoring",
  "severityLevel": "high",
  "confidenceScore": 0.91,
  "redactionLevel": "L1_PARTIAL_REDACTED",
  "regionCode": "KR-11-WEST",
  "geoCellId": "KR11-GRID-1452",
  "summary": "...",
  "occurredAt": "2026-01-24T02:26:00Z",
  "updatedAt": "2026-01-24T02:37:00Z"
}
```

## `GET /api/v1/incidents/{incidentId}/timeline`

response 200:

```json
{
  "incidentId": "SP-2094",
  "events": [
    {
      "id": "EV-1",
      "eventType": "status_transition",
      "title": "Initial emergency report",
      "summary": "...",
      "eventTime": "2026-01-24T02:26:00Z"
    }
  ]
}
```

## `GET /api/v1/incidents/{incidentId}/evidence`

response 200:

```json
{
  "incidentId": "SP-2094",
  "items": [
    {
      "id": "ED-1",
      "evidenceType": "cctv",
      "description": "Thermal camera anomaly chain",
      "reliabilityScore": 0.95,
      "sourceId": "SRC-002",
      "sourceName": "Municipal CCTV",
      "collectedAt": "2026-01-24T01:10:00Z"
    }
  ]
}
```

## `GET /api/v1/incidents/{incidentId}/sources`

response 200:

```json
{
  "incidentId": "SP-2094",
  "sources": [
    {
      "id": "SRC-002",
      "name": "Municipal CCTV",
      "trustTier": "A",
      "lastCheckedAt": "2026-01-24T02:34:00Z",
      "note": "Matched segments: 14"
    }
  ]
}
```

## `GET /api/v1/compare`

query:

- `baseRegion`, `targetRegion`
- `baseFrom`, `baseTo`
- `targetFrom`, `targetTo`
- `incidentType[]`

response 200:

```json
{
  "base": {
    "regionCode": "KR-11-WEST",
    "count": 120,
    "ratePer100k": 18.2,
    "severityIndex": 2.1
  },
  "target": {
    "regionCode": "KR-11-EAST",
    "count": 96,
    "ratePer100k": 14.9,
    "severityIndex": 1.8
  },
  "delta": {
    "count": 24,
    "ratePer100k": 3.3,
    "severityIndex": 0.3
  }
}
```

## `POST /api/v1/subscriptions`

request:

```json
{
  "regionCodes": ["KR-11-WEST"],
  "incidentTypes": ["arson", "violence"],
  "minSeverity": "high",
  "minConfidence": 0.8,
  "channel": "email"
}
```

response 201:

```json
{
  "id": "SUB-101",
  "isActive": true
}
```

## `PATCH /api/v1/subscriptions/{subscriptionId}`
- partial update

## `DELETE /api/v1/subscriptions/{subscriptionId}`
- hard delete or deactivate by policy

## 3) WebSocket contract

- endpoint: `WS /ws/incidents`
- connection payload:

```json
{
  "regionCodes": ["KR-11-WEST"],
  "incidentTypes": ["arson"],
  "minSeverity": "high",
  "minConfidence": 0.8
}
```

- server events:
  - `incident.created`
  - `incident.updated`
  - `incident.corrected`

event shape:

```json
{
  "type": "incident.updated",
  "incidentId": "SP-2094",
  "status": "monitoring",
  "severityLevel": "high",
  "confidenceScore": 0.91,
  "regionCode": "KR-11-WEST",
  "occurredAt": "2026-01-24T02:26:00Z",
  "updatedAt": "2026-01-24T02:37:00Z"
}
```

## 4) Status and error code matrix

- `200` success
- `201` created
- `400` invalid query/payload
- `401` unauthorized
- `403` forbidden (restricted incident role mismatch)
- `404` incident not found
- `409` conflict (duplicate subscription)
- `429` too many requests
- `500` internal error

## 5) Versioning policy

- breaking changes: `/api/v2`에서만 허용
- non-breaking 추가 필드는 v1에서 허용
- deprecated 필드는 최소 1 release 유지

## 6) Acceptance criteria for Issue AR-02

- 주요 REST endpoint 스키마 정의
- WS 이벤트 타입/페이로드 정의
- 표준 오류 응답 규격 정의
