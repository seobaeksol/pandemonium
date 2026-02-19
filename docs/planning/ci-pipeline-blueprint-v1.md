# Sentinel Pulse CI Pipeline Blueprint v1

## 목적

PR 기준 자동 검증 게이트를 구축해 품질 기준을 강제하고, 릴리즈 리스크를 낮춘다.

## 1) Trigger strategy

- `pull_request` (opened, synchronize, reopened)
- `push` to protected branches (`main`, `release/*`)
- optional scheduled nightly regression

## 2) Pipeline stages

```text
prepare -> lint -> typecheck -> unit-test -> integration-test -> build -> artifacts -> status-report
```

## 3) Required checks

- `lint`
- `typecheck`
- `unit-tests`
- `integration-tests`
- `build`

모든 체크 green이어야 merge 가능.

## 4) Fail-fast and dependency rules

- prepare 실패 시 전체 중단
- lint/typecheck 실패 시 test/build 스킵 가능
- integration-test는 unit-test 성공 후 실행

## 5) Caching and speed policy

- dependency cache keyed by lockfile hash
- test cache는 branch scoped
- target PR runtime: <= 10 min (p95)

## 6) Security checks

- secret scan (pre-merge)
- dependency vulnerability scan (daily + PR delta)
- workflow permission 최소화

## 7) Artifact policy

- build artifact 업로드 (staging candidate)
- test reports (junit/coverage) 저장
- 실패 로그 최소 14일 보관

## 8) Branch protection requirements

- required status checks 모두 통과
- 최소 1 리뷰 승인
- 정책 영향(high) 변경 시 지정 reviewer 승인
- stale review dismissal 활성화

## 9) Example job matrix

```text
job: lint
job: typecheck
job: unit-tests (node 20)
job: integration-tests (service containers)
job: build
job: upload-artifacts
```

## 10) Rollout plan

1. dry run (warning only)
2. soft gate (merge allowed with override)
3. hard gate (required checks enforced)

## 11) Acceptance criteria for Issue OP-02

- PR마다 자동 실행
- 실패 시 merge 차단 가능 상태
- 로그/아티팩트 접근 가능
