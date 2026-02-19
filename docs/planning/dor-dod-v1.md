# Sentinel Pulse DoR / DoD v1

## 목적

작업 착수 기준(DoR)과 완료 기준(DoD)을 명확히 하여 품질 누수와 재작업을 줄인다.

## 1) Definition of Ready (DoR)

스토리가 `In Progress`로 이동하기 전에 아래를 만족해야 한다.

## Product clarity

- [ ] 문제 정의와 사용자 가치가 명확하다
- [ ] 범위(포함/제외)가 명확하다
- [ ] 수용 기준이 테스트 가능한 문장으로 작성되어 있다

## Technical clarity

- [ ] API/데이터/화면 의존성이 명시되어 있다
- [ ] 선행 이슈 상태가 확인되었다
- [ ] 정책/보안 영향도 태그가 지정되어 있다

## Execution readiness

- [ ] 담당자(owner)와 리뷰어가 지정되어 있다
- [ ] 목표 일정(due)과 검증 계획이 있다
- [ ] 산출물 형태(문서/코드/테스트)가 명시되어 있다

## 2) Definition of Done (DoD)

이슈를 `Done`으로 전환하기 전에 아래를 모두 만족해야 한다.

## Deliverable

- [ ] 요구된 산출물이 저장소에 반영되어 있다
- [ ] 이슈 코멘트에 산출물 경로가 첨부되어 있다

## Quality gate

- [ ] 관련 테스트(또는 문서 검증) 결과가 첨부되어 있다
- [ ] 회귀 영향 검토가 수행되었다
- [ ] 정책 영향 이슈는 정책 리뷰가 반영되었다

## Traceability

- [ ] 검토 승인 코멘트가 남아 있다
- [ ] 의사결정/변경 이유가 기록되어 있다
- [ ] 감사 추적 가능한 링크(문서/로그/스크린샷)가 있다

## 3) Status transition guardrails

- `Backlog -> Ready`
  - 최소 DoR 80% 충족 + blocker 없음
- `Ready -> In Progress`
  - owner/reviewer/due 확정
- `In Progress -> In Review`
  - 산출물 링크 + 검증 결과 첨부
- `In Review -> Done`
  - DoD 100% 충족

## 4) Policy-specific checks

아래 태그가 있으면 추가 체크를 강제한다.

- `policy-impact:high`
  - [ ] Policy reviewer 승인
- `restricted-data`
  - [ ] redaction 검증 증빙 첨부

## 5) Waiver policy

- DoR/DoD 예외는 기본 금지
- 긴급 예외는 Ops lead + Tech lead 공동 승인 필수
- 예외 이력은 주간 회고에서 재검토

## 6) Acceptance criteria for Issue QA-02

- DoR 체크리스트 정의
- DoD 체크리스트 정의
- 상태 전이 기준 명시
