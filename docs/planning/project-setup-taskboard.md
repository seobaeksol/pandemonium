# Sentinel Pulse 착수 준비 태스크보드 (Phase 0)

이 문서는 본격 개발 전에 반드시 완료해야 할 "작업을 위한 작업"을 실행 단위로 쪼갠 보드다.
권장 운영 방식은 2주(10 working days) 스프린트이며, 각 태스크는 이슈로 분리해 추적한다.

## 상태 컬럼

- `Backlog`
- `Ready`
- `In Progress`
- `Blocked`
- `In Review`
- `Done`

## 우선순위 규칙

- P0: 미완료 시 개발 착수 불가
- P1: MVP 리스크 크게 증가
- P2: 추후 보강 가능

## 1) Product/Policy 스트림

| ID | Priority | Task | Owner Role | Duration | Dependency | Acceptance Criteria |
|---|---|---|---|---:|---|---|
| PP-01 | P0 | PRD v1 확정 (MVP scope, 제외 범위 포함) | PO | 1d | - | 기능 범위, 제외 범위, 성공지표 문서화 |
| PP-02 | P0 | 사건 상태 모델 합의 (`verified/monitoring/corrected/restricted`) | PO + Tech Lead | 0.5d | PP-01 | 상태 전이도와 조건 명시 |
| PP-03 | P0 | 마스킹 정책 문서화 (신원/위치/미성년자) | Policy | 1d | PP-01 | 노출 금지 필드/레벨 정의 |
| PP-04 | P0 | 정정/이의신청 처리 SOP 작성 | Policy + Ops | 1d | PP-03 | 접수->검토->반영 SLA 확정 |
| PP-05 | P1 | UI 문구 가이드 (단정 표현 금지 룰) | PO + Policy | 0.5d | PP-02 | 금지 문구/대체 문구 리스트 |

## 2) Architecture/API 스트림

| ID | Priority | Task | Owner Role | Duration | Dependency | Acceptance Criteria |
|---|---|---|---|---:|---|---|
| AR-01 | P0 | 도메인 엔티티 ERD 확정 (`incident`, `event`, `evidence`, `source`) | Tech Lead + BE | 1d | PP-02 | ERD + 필드 사전 확정 |
| AR-02 | P0 | API 계약서 v1 작성 (REST/WS) | BE | 1d | AR-01 | OpenAPI/WS event schema 문서화 |
| AR-03 | P0 | 권한 모델(RBAC + 민감태그) 설계 | Tech Lead + BE | 0.5d | AR-01 | 역할별 접근표 완성 |
| AR-04 | P1 | 감사 로그 스키마/보존 전략 설계 | BE + Policy | 0.5d | AR-01 | audit 필드/보존기간 확정 |
| AR-05 | P1 | 비기능 요구 정의 (p95/SLO/지연 임계치) | Tech Lead + SRE | 0.5d | AR-02 | 성능/안정성 목표 수치 합의 |

## 3) Data 스트림

| ID | Priority | Task | Owner Role | Duration | Dependency | Acceptance Criteria |
|---|---|---|---|---:|---|---|
| DA-01 | P0 | 데이터 소스 인벤토리(공공/기관/언론) 작성 | Data Engineer | 1d | PP-01 | 소스별 신뢰등급/갱신주기 명시 |
| DA-02 | P0 | Ingest->Normalize 파이프라인 설계서 작성 | Data Engineer | 1d | DA-01 | 입력/출력 스키마 확정 |
| DA-03 | P0 | Dedup 규칙과 임계치 정의 | Data Engineer + BE | 0.5d | DA-02 | 중복판정 기준 수치화 |
| DA-04 | P1 | confidence 스코어링 공식 확정 | Data Engineer | 0.5d | DA-02 | 가중치/설명 가능성 문서화 |
| DA-05 | P1 | 데이터 품질 대시보드 지표 정의 | Data Engineer + QA | 0.5d | DA-03 | 누락/오탐/지연 지표 확정 |

## 4) Frontend/UX 스트림

| ID | Priority | Task | Owner Role | Duration | Dependency | Acceptance Criteria |
|---|---|---|---|---:|---|---|
| FE-01 | P0 | 페이지 구조 확정 (Dashboard, Detail, Compare, Alerts) | FE | 0.5d | PP-01 | 라우팅 맵 완성 |
| FE-02 | P0 | 상세 화면 컴포넌트 명세 작성 (header/timeline/evidence/source/actions) | FE | 1d | FE-01 | props contract 문서화 |
| FE-03 | P1 | 상태/빈화면/오류 상태 UX 명세 | FE + PO | 0.5d | FE-02 | 케이스별 표시 규칙 정의 |
| FE-04 | P1 | 접근성 기본 기준 정의 (색 대비, 키보드 탐색) | FE + QA | 0.5d | FE-02 | a11y 체크리스트 확정 |

## 5) QA/Release 스트림

| ID | Priority | Task | Owner Role | Duration | Dependency | Acceptance Criteria |
|---|---|---|---|---:|---|---|
| QA-01 | P0 | 테스트 전략 문서화 (단위/통합/E2E 범위) | QA | 1d | AR-02, FE-02 | 테스트 피라미드와 책임 분리 |
| QA-02 | P0 | DoR/DoD 최종 합의 및 보드 반영 | QA + Tech Lead | 0.5d | QA-01 | 팀 전체 승인 댓글 기록 |
| QA-03 | P1 | 회귀 테스트 우선순위 리스트 작성 | QA | 0.5d | QA-01 | 핵심 시나리오 10개 이상 |
| QA-04 | P1 | PR 템플릿에 검증항목 강제 | QA + Tech Lead | 0.5d | QA-02 | 템플릿 필수 항목 적용 |

## 6) DevOps/Infra 스트림

| ID | Priority | Task | Owner Role | Duration | Dependency | Acceptance Criteria |
|---|---|---|---|---:|---|---|
| OP-01 | P0 | dev/staging/prod 환경 분리 및 변수 정책 수립 | SRE | 1d | - | 환경별 설정 분리 완료 |
| OP-02 | P0 | CI 파이프라인 구축 (lint/typecheck/test/build) | SRE + Tech Lead | 1d | QA-01 | PR마다 자동 실행 |
| OP-03 | P0 | 배포 파이프라인 + 롤백 스크립트 준비 | SRE | 1d | OP-02 | staging/prod 시뮬레이션 성공 |
| OP-04 | P1 | 로그/메트릭/알림 기본 대시보드 구축 | SRE | 0.5d | OP-02 | 4대 지표 가시화 |
| OP-05 | P1 | 장애 대응 룬북 v1 작성 | SRE + Tech Lead | 0.5d | OP-03 | 주요 장애 시나리오 대응 절차 확정 |

## 7) 운영 시작 게이트 (Go/No-Go)

아래 P0 항목이 모두 `Done`이어야 본격 구현 스프린트 진입 가능:

- PP-01, PP-02, PP-03, PP-04
- AR-01, AR-02, AR-03
- DA-01, DA-02, DA-03
- FE-01, FE-02
- QA-01, QA-02
- OP-01, OP-02, OP-03

## 8) 2주 실행 캘린더 예시

### Week 1

- Day 1: PP-01, AR-01, DA-01, FE-01 시작
- Day 2: PP-02/03, AR-02, DA-02, FE-02
- Day 3: PP-04, AR-03, DA-03, QA-01
- Day 4: QA-02, OP-01, OP-02
- Day 5: OP-03, 전체 게이트 중간 점검

### Week 2

- P1 항목 병행 (PP-05, AR-04/05, DA-04/05, FE-03/04, QA-03/04, OP-04/05)
- 금요일: Go/No-Go 리뷰, Phase 1 스프린트 백로그 확정

## 9) 이슈 템플릿 (권장)

모든 이슈는 아래 템플릿을 따른다:

```text
Title: [ID] 작업명
Goal: 이 작업이 왜 필요한가
Scope: 포함/제외
Acceptance Criteria:
  - [ ] ...
Dependencies:
Verification:
  - command/log/screenshot
Policy Impact: none / low / high
```
