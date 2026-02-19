# Sentinel Pulse Dedup Rules v1

## 목적

동일 사건이 다중 소스에서 중복 집계되는 문제를 줄이기 위한 판정 규칙과 임계치를 정의한다.

## 1) Dedup strategy overview

단계별로 중복 가능성을 평가한다.

1. `exact key match`
2. `strong heuristic match`
3. `fuzzy similarity match`
4. `manual review queue` (경계 케이스)

## 2) Canonical identity keys

## Primary key

- `source_event_key = source_id + external_event_id`

동일 `source_event_key`는 무조건 동일 이벤트로 처리(upsert).

## Secondary matching dimensions

- incident_type similarity
- time proximity window
- geo cell overlap
- normalized text similarity

## 3) Threshold rules

## Rule A: exact match (auto duplicate)

- 조건: `source_event_key` 동일
- 처리: duplicate 확정, 이벤트 업데이트 병합

## Rule B: strong heuristic (auto duplicate)

- 조건:
  - `incident_type` 동일 또는 같은 그룹
  - `|occurred_at diff| <= 45 min`
  - `geo_cell_id` 동일 또는 인접 셀
  - text similarity >= 0.82
- 처리: duplicate 확정

## Rule C: fuzzy candidate (review required)

- 조건:
  - `|occurred_at diff| <= 120 min`
  - `geo_cell_id` 동일/인접
  - text similarity 0.65~0.82
- 처리: review queue로 전송

## Rule D: non-duplicate

- 조건:
  - time diff > 120 min 또는
  - geo distance가 정책 임계치 초과 또는
  - incident_type 그룹 불일치 + text similarity 낮음
- 처리: 별도 이벤트로 유지

## 4) Merge policy for duplicates

- 대표 이벤트 선택 우선순위:
  1. trust tier 높은 소스
  2. 필수 필드 완성도 높은 레코드
  3. 최신 정정 반영 레코드
- 병합 시 유지:
  - 모든 source refs
  - confidence 계산 입력 요소
  - audit trail

## 5) Edge-case policy

- 연쇄 사건(동일 위치 다수 발생)은 시간 분리 기준으로 다른 사건 유지 가능
- 의도적 유사 보도(요약 재게시)는 duplicate로 병합
- corrected 상태 사건은 원본/정정 모두 trace 보존

## 6) Validation set (10 synthetic cases)

| Case | Type match | Time diff | Geo relation | Text sim | Expected |
|---|---|---:|---|---:|---|
| C01 | same | 5m | same cell | 0.95 | duplicate |
| C02 | same | 20m | adjacent | 0.87 | duplicate |
| C03 | same-group | 38m | same cell | 0.83 | duplicate |
| C04 | same | 60m | same cell | 0.78 | review |
| C05 | same | 100m | adjacent | 0.72 | review |
| C06 | same | 130m | same cell | 0.91 | non-duplicate |
| C07 | different-group | 15m | same cell | 0.40 | non-duplicate |
| C08 | same | 30m | far | 0.84 | non-duplicate |
| C09 | same-group | 10m | adjacent | 0.66 | review |
| C10 | exact key | 0m | same cell | 1.00 | duplicate |

## 7) KPI targets

- false merge rate < 3%
- missed duplicate rate < 5%
- review queue backlog SLA < 24h

## 8) Implementation notes

- similarity 모델 버전 기록 필수
- threshold 변경 시 버전 태그와 변경 이력 기록
- dedup 결정은 `audit_log`에 남김

## 9) Acceptance criteria for Issue DA-03

- 판정 규칙 문서화
- 임계치 수치화
- 샘플 검증 세트(10건) 제시
