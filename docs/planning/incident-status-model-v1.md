# Sentinel Pulse Incident Status Model v1

## 목적

사건 상태를 제품/데이터/API/UI 전 영역에서 동일하게 해석하기 위한 공통 모델을 정의한다.

## 1) 상태 정의

- `monitoring`
  - 의미: 사건 신호는 있으나 검증이 진행 중인 상태
  - 최소 조건: 1개 이상 유효 source signal
  - 금지: 단정적 문구/확정 표현

- `verified`
  - 의미: 교차 검증이 완료된 상태
  - 최소 조건: Tier A/B source 2개 이상 또는 규칙 기반 고신뢰 교차매치
  - 허용: 상세 근거 노출(정책 범위 내)

- `corrected`
  - 의미: 기존 공개 정보에 정정이 반영된 상태
  - 최소 조건: correction request 처리 기록 + 정정 사유 + 변경 전후 diff
  - 의무: 정정 타임라인 이벤트 추가

- `restricted`
  - 의미: 민감성/법적 사유로 상세 공개가 제한된 상태
  - 최소 조건: 정책 룰 히트 또는 운영자 정책 승인
  - 의무: 최소 정보만 노출 + 제한 사유 코드 기록

## 2) 상태 전이 규칙

허용 전이:

- `monitoring -> verified`
- `monitoring -> restricted`
- `verified -> corrected`
- `verified -> restricted`
- `corrected -> verified` (정정 반영 후 최신 정보가 재검증된 경우)
- `corrected -> restricted`
- `restricted -> monitoring` (제한 해제 후 재검증)
- `restricted -> verified` (제한 해제 + 충분한 검증 충족)

금지 전이:

- `verified -> monitoring` (다운그레이드는 correction 또는 restricted 경유)
- `corrected -> monitoring` (정정 이력 손실 위험)

## 3) 전이 트리거와 증빙

각 전이에는 아래 증빙이 필수다.

- trigger type (`source_update`, `manual_review`, `correction_request`, `policy_rule`)
- actor (`system`, `ops_admin`)
- reason code
- source references
- transition timestamp

## 4) UI 노출 규칙

- `monitoring`: 배지 노출 + "검증 진행 중" 안내
- `verified`: 신뢰도/근거 우선 노출
- `corrected`: 정정 배지와 정정 시각 노출
- `restricted`: 상세 내용 비노출, 제한 안내 텍스트 노출

## 5) API/데이터 규격

## Incident record required fields

- `status`
- `status_reason_code`
- `status_updated_at`
- `confidence_score`
- `redaction_level`

## Incident event required fields

- `event_type = status_transition`
- `from_status`
- `to_status`
- `trigger_type`
- `evidence_refs[]`

## 6) 운영 정책 연계

- `restricted` 진입은 정책 룰 엔진 결과를 audit log에 기록한다.
- `corrected` 진입 시 외부 노출 데이터 캐시를 강제 재생성한다.
- 상태 변경 이벤트는 알림 규칙 평가 대상으로 포함한다.

## 7) 상태 코드 enum (v1)

```text
monitoring
verified
corrected
restricted
```

## 8) Acceptance criteria for Issue PP-02

- 상태 정의 및 의미 문서화
- 허용/금지 전이 규칙 문서화
- FE/BE/Policy가 동일하게 쓸 수 있는 데이터 필드 기준 제시
