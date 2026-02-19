# Sentinel Pulse Ingest -> Normalize Design v1

## 목적

다양한 소스 입력을 공통 사건 스키마로 표준화하고, 후속 Dedup/Correlate/Score 단계의 안정적 입력을 보장한다.

## 1) Pipeline scope

```text
Source Adapter -> Raw Event Queue -> Normalizer -> Validation Gate -> Normalized Store
```

본 문서 범위는 `Source Adapter`부터 `Normalized Store`까지다.

## 2) Input schema (raw event)

```json
{
  "source_id": "SRC-001",
  "external_event_id": "ext-12345",
  "published_at": "2026-02-24T01:22:00Z",
  "received_at": "2026-02-24T01:23:01Z",
  "headline": "...",
  "body": "...",
  "incident_hint": "arson",
  "location": {
    "lat": 37.56,
    "lng": 126.97,
    "address_text": "..."
  },
  "metadata": {}
}
```

## 3) Output schema (normalized event)

```json
{
  "event_id": "norm_...",
  "source_id": "SRC-001",
  "source_event_key": "SRC-001:ext-12345",
  "incident_type": "arson",
  "severity_hint": "high",
  "occurred_at": "2026-02-24T01:22:00Z",
  "ingested_at": "2026-02-24T01:23:01Z",
  "region_code": "KR-11",
  "geo_cell_id": "KR11-GRID-...",
  "text_summary": "...",
  "redaction_level": "L1_PARTIAL_REDACTED",
  "normalize_version": "v1"
}
```

## 4) Normalization rules

- Timestamp
  - `published_at` 우선 사용, 없으면 `received_at`
  - UTC로 통일

- Incident type mapping
  - source label -> internal enum 매핑 테이블 사용
  - unknown 값은 `incident_type=unknown` + review flag

- Location mapping
  - 원본 좌표 -> `geo_cell_id` 변환
  - 상세 주소는 텍스트 마스킹 후 저장

- Text normalization
  - HTML/markup 제거
  - 금지 패턴(전화번호/차량번호 등) 마스킹
  - summary 길이 제한

## 5) Validation gate

필수 필드 검증:

- `source_id`
- `source_event_key`
- `occurred_at`
- `incident_type`
- `geo_cell_id` 또는 `region_code`

실패 처리:

- 실패 레코드는 `dead-letter queue`로 이동
- 오류 유형(`schema_error`, `mapping_error`, `redaction_error`) 기록

## 6) Idempotency strategy

- key: `source_event_key`
- 동일 key 재수신 시 upsert
- 변경점 없으면 no-op, 변경점 있으면 version increment

## 7) Observability

- Metrics
  - ingest throughput
  - normalize success rate
  - validation failure rate
  - stale source lag

- Logs
  - source_id, source_event_key, normalize_version, error_code

- Alerts
  - validation failure rate 임계치 초과
  - source freshness SLA 위반

## 8) Security and compliance

- raw payload 접근은 최소 권한
- 민감 데이터 필드 별도 보호 저장소 분리
- normalize 단계에서 redaction 적용 여부 강제 체크

## 9) Out of scope

- Dedup rule tuning
- Correlation graph modeling
- Confidence scoring final weights

## 10) Acceptance criteria for Issue DA-02

- ingest input schema 정의
- normalized output schema 정의
- 실패 레코드 처리 정책(DLQ + error taxonomy) 정의
