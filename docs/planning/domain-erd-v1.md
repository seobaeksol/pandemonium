# Sentinel Pulse Domain ERD v1

## 목적

핵심 도메인 엔티티와 관계를 고정하여 API/데이터/운영 개발의 공통 기준점을 제공한다.

## 1) ERD (logical)

```text
incident (1) ──< (N) incident_event
incident (1) ──< (N) evidence_item >── (1) source
incident (1) ──< (N) correction_request
incident (1) ──< (N) audit_log
user (1) ──< (N) subscription
```

## 2) Entity dictionary

## `incident`

- PK: `id` (string)
- Core fields:
  - `title`
  - `incident_type`
  - `severity_level`
  - `status` (`monitoring|verified|corrected|restricted`)
  - `confidence_score` (0~1)
  - `region_code`
  - `geo_cell_id`
  - `redaction_level`
  - `occurred_at`
  - `last_updated_at`

## `incident_event`

- PK: `id`
- FK: `incident_id -> incident.id`
- Fields:
  - `event_type` (status_transition, evidence_added, correction_applied, etc.)
  - `event_time`
  - `summary`
  - `trigger_type`
  - `source_refs` (json array)

## `evidence_item`

- PK: `id`
- FK:
  - `incident_id -> incident.id`
  - `source_id -> source.id`
- Fields:
  - `evidence_type`
  - `description`
  - `reliability_score`
  - `collected_at`

## `source`

- PK: `id`
- Fields:
  - `name`
  - `source_type`
  - `trust_tier` (A/B/C/D)
  - `refresh_interval_sec`
  - `is_active`

## `subscription`

- PK: `id`
- FK: `user_id -> user.id`
- Fields:
  - `filters_json`
  - `channel` (app/email/webhook)
  - `is_active`
  - `last_notified_at`

## `correction_request`

- PK: `id`
- FK: `incident_id -> incident.id`
- Fields:
  - `requested_at`
  - `requested_by`
  - `reason_code`
  - `request_note`
  - `review_status` (open|in_review|approved|rejected)
  - `resolved_at`

## `audit_log`

- PK: `id`
- FK: `incident_id -> incident.id` (nullable for global ops)
- Fields:
  - `actor_id`
  - `action_type`
  - `target_type`
  - `target_id`
  - `payload_hash`
  - `created_at`

## 3) FK and integrity rules

- `incident_event.incident_id` ON DELETE CASCADE
- `evidence_item.incident_id` ON DELETE CASCADE
- `evidence_item.source_id` ON DELETE RESTRICT
- `correction_request.incident_id` ON DELETE RESTRICT
- `audit_log`는 운영 추적 보존을 위해 soft-delete only

## 4) Index strategy (v1)

## `incident`

- `idx_incident_status_updated` (`status`, `last_updated_at DESC`)
- `idx_incident_region_occurred` (`region_code`, `occurred_at DESC`)
- `idx_incident_type_occurred` (`incident_type`, `occurred_at DESC`)
- `idx_incident_geo_cell` (`geo_cell_id`)

## `incident_event`

- `idx_event_incident_time` (`incident_id`, `event_time DESC`)

## `evidence_item`

- `idx_evidence_incident_reliability` (`incident_id`, `reliability_score DESC`)
- `idx_evidence_source_collected` (`source_id`, `collected_at DESC`)

## `correction_request`

- `idx_correction_incident_status` (`incident_id`, `review_status`, `requested_at DESC`)

## `audit_log`

- `idx_audit_target_time` (`target_type`, `target_id`, `created_at DESC`)
- `idx_audit_actor_time` (`actor_id`, `created_at DESC`)

## 5) Migration and versioning notes

- schema version tag: `domain_schema_v1`
- enum 변경 시 backward-compat mapping 유지
- breaking field rename 금지 (deprecated 기간 확보)

## 6) Acceptance criteria for Issue AR-01

- ERD 관계 정의 완료
- 필드 사전(data dictionary) 작성 완료
- FK/인덱스 전략 포함
