# Sentinel Pulse Deploy & Rollback Runbook v1

## 목적

staging/prod 배포를 안전하게 수행하고, 실패 시 신속하게 롤백하기 위한 운영 절차를 정의한다.

## 1) Release flow

```text
Build artifact -> Deploy staging -> Soak check -> Approval -> Canary deploy prod -> Full rollout
```

## 2) Preconditions

- CI required checks all green
- 릴리즈 노트 작성 완료
- 마이그레이션 영향도 검토 완료
- rollback artifact 준비 완료

## 3) Staging deploy checklist

- [ ] staging deploy 성공
- [ ] smoke test 통과
- [ ] 핵심 API latency/error 확인
- [ ] restricted case 정책 동작 확인
- [ ] 24h (또는 정책 시간) 관측 결과 확인

## 4) Production deploy strategy

- canary 10% -> 30% -> 100%
- 단계별 관측 지표 확인 후 승격

필수 모니터링:

- error rate
- p95 latency
- queue lag
- freshness KPI
- policy violation events

## 5) Rollback triggers

다음 중 하나 충족 시 rollback 실행:

- error rate 임계치 초과 지속
- p95 latency 급격 악화
- 정책 위반(high severity) 발생
- 핵심 사용자 플로우 장애

## 6) Rollback procedure

1. 배포 중지
2. 직전 안정 버전으로 트래픽 전환
3. DB 변경이 있으면 backward-safe 경로 적용
4. 상태 확인 (API health + 핵심 시나리오)
5. incident channel 공지
6. postmortem 작성

## 7) Communication protocol

- 배포 시작/단계승격/완료 공지
- rollback 선언 시 영향 범위와 ETA 공유
- 복구 완료 후 원인/후속조치 공유

## 8) Evidence artifacts

- 배포 로그 링크
- canary 단계별 지표 스냅샷
- rollback 실행 로그
- postmortem 문서 링크

## 9) Drill policy

- 월 1회 rollback drill 실행
- 신규 운영자 온보딩 시 1회 실습 필수

## 10) Acceptance criteria for Issue OP-03

- staging/prod 배포 시나리오 정의
- canary 전략 정의
- rollback 절차 및 증빙 규칙 정의
