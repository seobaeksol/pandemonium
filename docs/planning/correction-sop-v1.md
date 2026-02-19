# Sentinel Pulse Correction Request SOP v1

## 목적

오탐/오보/변경사항에 대한 정정 요청을 일관된 절차로 처리하고, 사건 상태를 `corrected`로 안전하게 반영한다.

## 1) Scope

- 대상: 공개 사건 정보에 대한 정정/이의신청 요청
- 채널: 운영자 콘솔 접수, 공식 문의 채널, 파트너 제휴 채널
- 제외: 시스템 장애 대응(별도 incident runbook)

## 2) Roles

- Intake Operator (Ops)
  - 요청 접수, 필수 정보 확인, 티켓 생성
- Reviewer (Policy + Domain Reviewer)
  - 증빙 검토, 승인/반려 결정
- Data/Backend Operator
  - 데이터 반영, 상태 전이, 캐시 재생성
- Approver (Ops Lead)
  - 고위험 케이스 최종 승인

## 3) Workflow

```text
Intake -> Triage -> Review -> Decision -> Apply -> Notify -> Audit Close
```

## Step details

1. Intake
   - case id, 요청 사유, 요청자 정보, 증빙 링크 수집
2. Triage
   - 심각도/민감도 분류 (high/normal)
3. Review
   - source trace 검토, 정책 위반 여부 검토
4. Decision
   - `approved` 또는 `rejected`
5. Apply
   - approved 시 사건 상태 `corrected` 전이
   - 변경 전/후 diff 저장
6. Notify
   - 요청자/운영 채널에 처리 결과 공지
7. Audit close
   - 처리 로그와 증빙 링크 최종 저장

## 4) SLA

| 단계 | 일반 케이스 | 고위험 케이스 |
|---|---:|---:|
| 접수 확인(first response) | 24h 이내 | 8h 이내 |
| 검토 완료(review decision) | 72h 이내 | 24h 이내 |
| 반영 완료(apply correction) | 24h 이내 | 8h 이내 |
| 결과 통지(notify) | 반영 후 4h 이내 | 반영 후 2h 이내 |

## 5) `corrected` 상태 반영 규칙

`corrected`로 전이하려면 아래가 모두 필요하다.

- correction request id
- approval actor
- correction reason code
- before/after diff snapshot
- source trace refs
- corrected timestamp

전이 후 필수 후속 작업:

- 사건 상세 캐시 무효화
- feed 요약 업데이트
- timeline에 correction 이벤트 추가
- audit log 기록

## 6) Rejection policy

- 증빙 부족
- 악의적/허위 요청
- 정책 범위 외 요청

반려 시에도 이유 코드와 안내 문구를 기록한다.

## 7) Communication template

- 승인:
  - "요청하신 정정이 반영되었습니다. 반영 시각: ..."
- 반려:
  - "요청하신 정정은 현재 증빙 기준을 충족하지 않아 반려되었습니다. 사유 코드: ..."

## 8) Audit fields (required)

- `request_id`
- `incident_id`
- `decision`
- `decision_reason_code`
- `approved_by`
- `applied_by`
- `applied_at`
- `evidence_links[]`

## 9) Acceptance criteria for Issue PP-04

- 단계별 담당 역할 정의
- SLA 수치 정의
- `corrected` 상태 반영 규칙 문서화
