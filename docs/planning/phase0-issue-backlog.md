# Sentinel Pulse Phase 0 - Executable Issue Backlog (P0)

이 문서는 `docs/planning/project-setup-taskboard.md`의 P0 항목만 뽑아서 바로 이슈로 등록할 수 있게 정리한 실행본이다.

## Board Defaults

- Initial status: `Backlog`
- Labels: `phase-0`, `priority-p0`, `[stream-*]`
- Required fields: owner, due date, dependency, verification evidence

## Issue Seeds

## [PP-01] PRD v1 확정 (MVP scope + 제외 범위)

- Stream: `stream-product-policy`
- Goal: MVP 범위를 확정해 스코프 흔들림을 방지한다.
- Scope:
  - Include: 핵심 기능, 제외 기능, 성공 지표
  - Exclude: 구현 세부기술 결정
- Acceptance Criteria:
  - [ ] MVP 포함/제외 목록이 문서화됨
  - [ ] 성공 지표(제품/기술/운영)가 수치 또는 판단 기준으로 명시됨
  - [ ] PO/Tech Lead 리뷰 승인 완료
- Dependencies: none
- Verification:
  - 문서 링크 + 승인 코멘트
- Policy Impact: low

## [PP-02] 사건 상태 모델 합의 (`verified/monitoring/corrected/restricted`)

- Stream: `stream-product-policy`
- Goal: 사건 상태 표현과 전이 규칙을 전사 공통으로 고정한다.
- Scope:
  - Include: 상태 정의, 상태 전이 조건, UI 노출 규칙
  - Exclude: 상세 DB 구현
- Acceptance Criteria:
  - [ ] 상태 전이 다이어그램 존재
  - [ ] 상태별 진입/이탈 조건 명시
  - [ ] FE/BE/Policy 리뷰 승인
- Dependencies: PP-01
- Verification:
  - 상태 전이 표 + 리뷰 기록
- Policy Impact: high

## [PP-03] 마스킹 정책 문서화 (신원/위치/미성년자)

- Stream: `stream-product-policy`
- Goal: 민감 정보 노출 사고를 사전 차단한다.
- Scope:
  - Include: 금지 필드, 레벨별 마스킹, 예외 승인 규칙
  - Exclude: 운영 콘솔 구현
- Acceptance Criteria:
  - [ ] 마스킹 대상 필드 목록 확정
  - [ ] 위치 비식별(격자화) 기준 수치 명시
  - [ ] Policy 책임자 승인
- Dependencies: PP-01
- Verification:
  - 정책 문서 링크 + 승인 캡처
- Policy Impact: high

## [PP-04] 정정/이의신청 처리 SOP 작성

- Stream: `stream-product-policy`
- Goal: 오탐/오보 발생 시 신속한 정정 절차를 운영 가능하게 만든다.
- Scope:
  - Include: 접수-검토-반영-공지 단계, SLA
  - Exclude: 외부 신고 UI 개발
- Acceptance Criteria:
  - [ ] 단계별 담당 역할 명시
  - [ ] 처리 SLA 수치 확정
  - [ ] `corrected` 상태 반영 규칙 포함
- Dependencies: PP-03
- Verification:
  - SOP 문서 링크 + 워크스루 회의록
- Policy Impact: high

## [AR-01] 도메인 ERD 확정

- Stream: `stream-architecture-api`
- Goal: 도메인 모델을 고정해 API/데이터 개발 기준점을 만든다.
- Scope:
  - Include: incident/event/evidence/source/subscription/audit
  - Exclude: 인프라 배포
- Acceptance Criteria:
  - [ ] ERD 다이어그램 완성
  - [ ] 필드 사전(data dictionary) 작성
  - [ ] FK/인덱스 전략 초안 포함
- Dependencies: PP-02
- Verification:
  - ERD 파일 + 리뷰 승인
- Policy Impact: medium

## [AR-02] API 계약서 v1 (REST/WS)

- Stream: `stream-architecture-api`
- Goal: FE/BE 병렬개발을 위해 계약 우선 개발 계약을 고정한다.
- Scope:
  - Include: incidents/detail/timeline/evidence/sources/compare/subscription/ws-events
  - Exclude: 실제 구현 코드
- Acceptance Criteria:
  - [ ] 주요 endpoint 스키마 완성
  - [ ] WS 이벤트 타입/페이로드 정의
  - [ ] 오류 응답 규격(4xx/5xx) 포함
- Dependencies: AR-01
- Verification:
  - OpenAPI/스키마 문서 링크
- Policy Impact: medium

## [AR-03] 권한 모델 설계 (RBAC + 민감 태그)

- Stream: `stream-architecture-api`
- Goal: 역할별 데이터 접근 경계를 명확히 한다.
- Scope:
  - Include: Viewer/Analyst/Ops/Admin 권한 매트릭스
  - Exclude: SSO 연동
- Acceptance Criteria:
  - [ ] 역할별 Read/Write 권한표 완성
  - [ ] restricted 사건 접근 규칙 정의
  - [ ] Policy 리뷰 승인
- Dependencies: AR-01
- Verification:
  - 권한표 문서 + 승인 기록
- Policy Impact: high

## [DA-01] 데이터 소스 인벤토리 작성

- Stream: `stream-data`
- Goal: 수집 소스의 신뢰도와 갱신성을 비교 가능하게 만든다.
- Scope:
  - Include: 공공/기관/언론 소스 목록, 신뢰등급, 갱신주기
  - Exclude: 수집기 코드 개발
- Acceptance Criteria:
  - [ ] 소스 최소 1차 목록 확정
  - [ ] 소스별 trust tier 부여
  - [ ] 법적 사용 조건/제한 메모 포함
- Dependencies: PP-01
- Verification:
  - 인벤토리 문서 링크
- Policy Impact: medium

## [DA-02] Ingest -> Normalize 설계

- Stream: `stream-data`
- Goal: 입력 데이터 형식 차이를 통합 스키마로 표준화한다.
- Scope:
  - Include: 입력/출력 스키마, 표준 타임존/지역코드 매핑
  - Exclude: Dedup/Scoring 고도화
- Acceptance Criteria:
  - [ ] ingest input schema 확정
  - [ ] normalized output schema 확정
  - [ ] 실패 레코드 처리 정책 정의
- Dependencies: DA-01
- Verification:
  - 설계서 링크 + 샘플 변환 결과
- Policy Impact: medium

## [DA-03] Dedup 규칙/임계치 정의

- Stream: `stream-data`
- Goal: 동일 사건 중복 집계를 줄여 지표 신뢰성을 확보한다.
- Scope:
  - Include: 중복 판정 키, 임계치, 충돌 처리 방식
  - Exclude: ML 기반 고급 매칭
- Acceptance Criteria:
  - [ ] 판정 규칙 표 작성
  - [ ] 임계치 기준 수치화
  - [ ] 샘플 케이스 10건 검증
- Dependencies: DA-02
- Verification:
  - 테스트 시트 + 결과 캡처
- Policy Impact: medium

## [FE-01] 페이지 구조/라우팅 맵 확정

- Stream: `stream-frontend`
- Goal: 화면 진입 경로와 URL 구조를 고정해 UI 구현 리스크를 낮춘다.
- Scope:
  - Include: dashboard/detail/compare/alerts 라우팅
  - Exclude: 세부 인터랙션 구현
- Acceptance Criteria:
  - [ ] 라우트 목록 확정
  - [ ] 피드 -> 상세 진입 흐름 정의
  - [ ] 오류/권한부족 라우트 정의
- Dependencies: PP-01
- Verification:
  - 라우팅 맵 문서 링크
- Policy Impact: low

## [FE-02] 상세 화면 컴포넌트 명세

- Stream: `stream-frontend`
- Goal: 상세 화면을 컴포넌트 단위로 분해해 병렬 개발 가능 상태로 만든다.
- Scope:
  - Include: header/timeline/evidence/source/actions props contract
  - Exclude: 실제 API 연결
- Acceptance Criteria:
  - [ ] 컴포넌트 목록/책임 분리 문서화
  - [ ] 각 컴포넌트 입력 스키마 정의
  - [ ] 상태별 렌더링 규칙 포함
- Dependencies: FE-01
- Verification:
  - 컴포넌트 명세 문서 링크
- Policy Impact: medium

## [QA-01] 테스트 전략 수립 (unit/integration/E2E)

- Stream: `stream-qa-release`
- Goal: 테스트 책임 범위를 명확히 하여 결함 누수를 줄인다.
- Scope:
  - Include: 테스트 피라미드, 커버 범위, 실행 게이트
  - Exclude: 테스트 코드 작성
- Acceptance Criteria:
  - [ ] 계층별 테스트 대상 정의
  - [ ] 필수 회귀 시나리오 초안 포함
  - [ ] PR/배포 게이트 반영 기준 포함
- Dependencies: AR-02, FE-02
- Verification:
  - 테스트 전략 문서 링크
- Policy Impact: low

## [QA-02] DoR/DoD 최종 합의

- Stream: `stream-qa-release`
- Goal: 작업 시작/완료 기준을 팀 공통 규칙으로 확정한다.
- Scope:
  - Include: DoR/DoD 본문, 보드 적용 규칙
  - Exclude: 툴 자동화 구현
- Acceptance Criteria:
  - [ ] DoR 체크리스트 확정
  - [ ] DoD 체크리스트 확정
  - [ ] 전원 승인 기록 남김
- Dependencies: QA-01
- Verification:
  - 회의록 + 승인 코멘트 링크
- Policy Impact: low

## [OP-01] 환경 분리 정책 (dev/staging/prod)

- Stream: `stream-devops-infra`
- Goal: 환경 혼선을 방지하고 릴리즈 안전성을 확보한다.
- Scope:
  - Include: 환경 변수 정책, 시크릿 관리 기준
  - Exclude: 운영 자동복구 시스템
- Acceptance Criteria:
  - [ ] 환경별 설정 문서화
  - [ ] 시크릿 주입 규칙 정의
  - [ ] 접근 권한 분리 원칙 합의
- Dependencies: none
- Verification:
  - 환경 정책 문서 링크
- Policy Impact: medium

## [OP-02] CI 파이프라인 구축

- Stream: `stream-devops-infra`
- Goal: PR 단위 자동 검증으로 품질 게이트를 강제한다.
- Scope:
  - Include: lint/typecheck/test/build 자동화
  - Exclude: 배포 단계
- Acceptance Criteria:
  - [ ] PR 생성 시 CI 자동 실행
  - [ ] 실패 시 머지 차단 동작 확인
  - [ ] 로그/아티팩트 확인 가능
- Dependencies: QA-01
- Verification:
  - CI 실행 링크 + 성공/실패 샘플
- Policy Impact: low

## [OP-03] 배포 파이프라인 + 롤백 준비

- Stream: `stream-devops-infra`
- Goal: 장애 시 복구 가능한 릴리즈 체계를 보장한다.
- Scope:
  - Include: staging/prod 배포 시나리오, 롤백 스크립트
  - Exclude: 멀티리전 재해복구
- Acceptance Criteria:
  - [ ] staging 배포 성공 로그 확보
  - [ ] canary 또는 점진 배포 전략 문서화
  - [ ] 롤백 리허설 1회 완료
- Dependencies: OP-02
- Verification:
  - 배포 로그 + 롤백 리허설 기록
- Policy Impact: low

## Go/No-Go Gate

- 본 문서의 17개 P0 이슈가 모두 `Done`일 때만 본 개발(Phase 1) 착수.
