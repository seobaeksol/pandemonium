# Sentinel Pulse Test Strategy v1

## 목적

기능 결함 누수를 줄이기 위해 테스트 책임 경계를 unit/integration/E2E로 명확히 정의한다.

## 1) Test pyramid

- Unit tests: 60%
- Integration tests: 30%
- E2E tests: 10%

원칙: 빠른 피드백은 unit/integration에서, 사용자 시나리오 검증은 E2E에서 수행.

## 2) Scope by layer

## Unit test scope

- Domain rules
  - status transition rules
  - redaction rule evaluator
  - dedup threshold classifier
- Utility
  - mapper/normalizer helpers
  - serializer/deserializer

## Integration test scope

- API endpoints + DB contract
- ingest -> normalize pipeline validation gate
- authz middleware (RBAC + restricted tag)
- subscription CRUD and notification trigger

## E2E test scope (critical user flows)

1. Dashboard filter -> feed update -> detail navigation
2. Detail tab switch + evidence/source rendering
3. Restricted case access fallback UI
4. Compare query -> result rendering
5. Alert subscription create/update/delete

## 3) Regression suite (minimum)

우선 회귀 시나리오 10개:

1. Incident list query parameter filtering
2. Incident detail not-found handling
3. Restricted incident response -> restricted UI route
4. Timeline ordering and rendering
5. Evidence sort by reliability
6. Source trust-tier display
7. Compare endpoint delta consistency
8. Subscription conflict handling (`409`)
9. Correction status event appears in timeline
10. WebSocket incident.updated event handling

## 4) Quality gates by pipeline stage

- PR gate
  - lint, typecheck, unit tests must pass
- Merge gate
  - integration tests pass
- Release candidate gate
  - smoke E2E + contract tests pass

## 5) Test data policy

- PII-free synthetic fixtures 우선
- restricted 케이스 테스트는 마스킹된 fixture 사용
- 시간 의존 테스트는 fixed clock 사용

## 6) Ownership model

- FE: UI unit/E2E ownership
- BE: API unit/integration ownership
- Data: pipeline integration ownership
- QA: cross-flow E2E and regression ownership

## 7) Reporting and triage

- flaky test 자동 라벨링
- 실패 테스트는 issue 생성 + severity 분류
- release blocker 기준: critical flow E2E fail

## 8) Acceptance criteria for Issue QA-01

- 테스트 계층별 대상 정의
- 필수 회귀 시나리오(최소 10개) 정의
- PR/릴리즈 게이트 기준 포함
