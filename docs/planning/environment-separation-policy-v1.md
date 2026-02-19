# Sentinel Pulse Environment Separation Policy v1

## 목적

`dev`, `staging`, `prod` 환경을 분리해 배포 안정성과 보안성을 확보한다.

## 1) Environment roles

- `dev`
  - 목적: 기능 개발/실험/통합
  - 데이터: 합성 데이터 또는 비식별 샘플 데이터
  - 가용성 요구: 낮음

- `staging`
  - 목적: 릴리즈 후보 검증
  - 데이터: 운영과 유사한 비식별 데이터
  - 가용성 요구: 중간

- `prod`
  - 목적: 사용자 서비스 제공
  - 데이터: 운영 데이터
  - 가용성 요구: 높음

## 2) Configuration boundaries

- 환경별 독립 변수 세트 사용
- 공통 키 이름은 동일, 값은 환경별 분리
- `prod` 값은 `dev/staging`으로 복사 금지

필수 변수 카테고리:

- application settings
- data source endpoints
- message queue / cache endpoints
- secret references
- observability endpoints

## 3) Secret management policy

- 비밀값은 코드/문서/로그에 평문 저장 금지
- secret manager를 단일 소스로 사용
- 접근권한 최소화(least privilege)
- rotation 주기 정책 정의 (예: 90일)

## 4) Access control

- `dev`: 개발팀 write 허용
- `staging`: 제한된 release group만 write
- `prod`: 운영 승인된 소수 인원만 배포 권한
- 긴급권한(elevated access)은 시간 제한 + 감사로그 필수

## 5) CI/CD gate policy

기본 흐름:

```text
PR -> CI (lint/typecheck/test/build) -> merge -> deploy dev
release candidate -> deploy staging -> soak check -> deploy prod (canary)
```

배포 전 필수 게이트:

- 테스트/빌드 green
- 정책 체크(pass)
- 변경 영향 리뷰 승인

## 6) Promotion and rollback

- `staging -> prod` 승격은 승인 기반
- prod 배포는 canary 또는 점진 배포 사용
- rollback 스크립트 사전 검증 필수
- rollback 발생 시 incident log 기록

## 7) Data safety rules

- dev/staging에는 운영 PII 원본 반입 금지
- prod snapshot이 필요하면 비식별 처리 후 제한 공유
- 환경 간 데이터 이동 작업은 audit log 필수

## 8) Observability baseline

환경별로 최소 아래를 확보한다.

- logs: 배포/오류/정책 위반 이벤트
- metrics: latency/error/freshness/deploy status
- alerting: high-severity 에러 및 배포 실패

## 9) Incident handling

- prod incident 발생 시 운영 룬북 기준 대응
- 우선 조치: 영향 범위 격리 -> rollback 또는 hotfix
- 사후: 원인분석 + 재발방지 액션 기록

## 10) Acceptance criteria for Issue OP-01

- dev/staging/prod 역할 정의
- 환경 변수/시크릿 분리 정책 정의
- 접근권한 및 배포 게이트 규칙 정의
