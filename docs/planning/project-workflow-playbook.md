# Sentinel Pulse 프로젝트 워크플로우 플레이북 (Pre-Development)

## 문서 목적

이 문서는 본 개발 착수 전에 필요한 운영 체계, 인력 구성, 의사결정 절차, 품질 게이트를 한 번에 정의한다.
목표는 "빠르게 만들기"가 아니라 "안전하게, 반복 가능하게, 확장 가능하게" 만드는 것이다.

## 프로젝트 성공 기준 (착수 전 합의)

- 제품: 시대/지역/실시간 축으로 사건 탐색과 상세 맥락 제공이 가능할 것
- 기술: 데이터 정확성, 신뢰도, 추적 가능성(audit) 보장
- 운영: 정정/이의신청/마스킹 정책이 실제로 작동할 것
- 배포: CI/CD + 롤백 + 관측성까지 포함한 운영 준비 완료

## 1) 운영 원칙

1. `Public Safety First`: 선정성보다 공공안전 맥락을 우선한다.
2. `Evidence-Linked`: 모든 사건 상태 변경은 근거와 출처를 남긴다.
3. `Privacy by Default`: 정밀 위치/신원은 기본 비노출, 필요 시 운영자 승인.
4. `Trunk + Short Branch`: 작은 단위 병합, 빠른 피드백 루프 유지.
5. `No Gate Bypass`: 품질/보안/정책 게이트는 예외 없이 통과해야 한다.

## 2) 개발 스트림 구조

동시에 돌아가야 하는 핵심 스트림 5개:

1. `Product & Policy`: PRD, 정책, 법적/윤리 가드레일
2. `Data Platform`: 수집/정규화/중복제거/신뢰도 점수화
3. `Backend/API`: 사건 조회/상세/비교/알림 API + 웹소켓
4. `Frontend`: 대시보드/상세/비교/알림 UX 구현
5. `Quality & Ops`: 테스트 자동화, 배포, 모니터링, 운영 콘솔

## 3) 필요한 작업자(역할) 정의

## 3-1. 최소 인력 (MVP 가능)

| 역할 | 인원 | 핵심 책임 | 투입 시점 |
|---|---:|---|---|
| Product Owner | 1 | 요구사항 우선순위, 수용 기준 확정 | Day 1 |
| Tech Lead / Architect | 1 | 시스템 설계, 기술 의사결정, 코드 기준 | Day 1 |
| Frontend Engineer | 1 | Dashboard/Case Detail/Compare 구현 | Day 1 |
| Backend Engineer | 2 | API/WS/도메인 로직/권한/감사로그 | Day 1 |
| Data Engineer | 1 | Ingest/Normalize/Dedup/Scoring 파이프라인 | Day 1 |
| QA Automation | 1 | 테스트 전략, E2E/회귀 자동화, 릴리즈 게이트 | Sprint 1 중반 |
| DevOps/SRE (파트타임 가능) | 0.5~1 | CI/CD, 관측성, 장애 대응 체계 | Sprint 1 |
| Policy & Legal Advisor (자문) | 0.2~0.5 | 마스킹/정정/보존 정책 검토 | Sprint 1 |

## 3-2. 권장 인력 (리스크 낮춤)

- Frontend 2명(지도/시각화 전담 1)
- Backend 3명(API/알림/운영도구 분리)
- Data QA Analyst 1명(데이터 품질/정정 워크플로우 전담)

## 4) RACI (핵심 산출물 기준)

| 산출물 | PO | Tech Lead | FE | BE | Data | QA | SRE | Policy |
|---|---|---|---|---|---|---|---|---|
| PRD / 기능 우선순위 | A | C | I | I | I | I | I | C |
| 도메인 스키마/API 계약 | C | A | C | R | C | C | I | I |
| 데이터 파이프라인 설계 | I | C | I | C | A/R | C | I | I |
| 상세 화면 UX/상호작용 | C | C | A/R | C | I | C | I | I |
| 정책(마스킹/정정/보존) | A | C | I | C | C | I | I | R |
| 테스트 전략/릴리즈 게이트 | I | C | C | C | C | A/R | C | I |
| CI/CD 및 운영 관측성 | I | C | I | C | I | C | A/R | I |

Legend: `A` 최종책임, `R` 실행책임, `C` 협의, `I` 공유

## 5) 개발 워크플로우 (실행 규칙)

## 5-1. 요구사항 -> 백로그

1. PO가 기능 요구를 `User Story + Acceptance Criteria`로 작성
2. Tech Lead가 기술 분해(도메인/API/UI/데이터)를 수행
3. 팀이 스토리를 `Ready`로 올리기 전 DoR 체크

### Definition of Ready (DoR)

- 사용자 가치와 문제 정의가 명확함
- 수용 기준(테스트 가능 문장) 존재
- 데이터/보안/정책 영향도 태깅 완료
- 의존성(선행 작업) 명시됨

## 5-2. 이슈 상태 흐름

`Backlog -> Ready -> In Progress -> In Review -> QA -> Done`

상태 전이 규칙:

- `Ready -> In Progress`: 담당자/예상소요/검증계획 필수
- `In Progress -> In Review`: 테스트 결과, 스크린샷/로그 첨부
- `In Review -> QA`: 코드리뷰 승인 + CI green
- `QA -> Done`: 수용 기준 100% 충족 + 회귀 영향 없음

## 5-3. Git/PR 규칙

- 브랜치: `feature/<ticket-id>-<slug>`
- 커밋: 작고 원자적인 단위(기능/리팩터/테스트 분리)
- PR 템플릿 필수 항목:
  - 무엇이 바뀌었는가
  - 왜 바뀌었는가
  - 어떻게 검증했는가(명령/결과)
  - 정책/보안 영향

리뷰 규칙:

- 최소 1명 승인 + 핵심 모듈은 2명 승인
- 정책/개인정보 영향이 있으면 Policy reviewer 확인 필수

## 5-4. 품질 게이트 (Definition of Done)

- 단위 테스트 + 통합 테스트 + 핵심 E2E 통과
- 타입체크/린트/빌드 성공
- API 계약 테스트(스키마 검증) 통과
- 관측성(로그/메트릭/트레이스) 포인트 추가
- 정책 체크(마스킹/제한노출/문구 가이드) 통과

## 5-5. 데이터 품질 워크플로우

`Ingest -> Normalize -> Dedup -> Correlate -> Score -> Publish`

게이트:

- 스키마 유효성 실패율 기준 이하
- 중복 제거 정확도 샘플링 검증
- 출처 신뢰도 점수 분포 이상치 탐지
- 사고(오탐/누락) 발생 시 원인 추적 가능한 audit 유지

## 6) 운영/협업 리듬

- Daily Standup (15m): 어제/오늘/리스크
- Backlog Refinement (주 2회): Ready 후보 다듬기
- Sprint Planning (주 1회): 목표/커밋 범위 확정
- Demo (주 1회): 실제 동작 기반 시연
- Retro (주 1회): 프로세스 개선 액션 1~2개 확정
- Incident Review (격주): 데이터 오탐/정정 케이스 분석

## 7) 환경 전략

- `dev`: 기능 개발 및 실험
- `staging`: 릴리즈 후보 검증
- `prod`: 운영

배포 규칙:

- staging에서 최소 24시간 관측 후 prod 반영
- prod는 점진 배포(canary) + 즉시 롤백 스크립트 보유

## 8) 리스크 레지스터 (초기)

| 리스크 | 영향 | 선제 대응 |
|---|---|---|
| 데이터 오탐으로 인한 신뢰 하락 | 높음 | 다중 출처 검증, corrected 상태 즉시 반영 |
| 개인정보 노출 | 매우 높음 | redaction 레벨 기본 적용 + 정책 게이트 |
| 실시간 파이프라인 지연 | 중간~높음 | 큐 모니터링, 지연 임계치 알림, fallback 스냅샷 |
| 릴리즈 품질 저하 | 높음 | DoD/QA 게이트 강제, canary/rollback 준비 |
| 역할 공백(정책/운영) | 중간 | Policy 자문, 운영 콘솔 조기 구축 |

## 9) 단계별 실행 계획

## Phase 0 (2주) - "작업을 위한 작업" 완성

- 요구사항/정책/데이터 출처 확정
- 스키마/API 계약서 확정
- 워크플로우/템플릿/게이트 자동화
- CI/CD + 모니터링 최소 버전 구축

산출물:

- PRD v1, API Contract v1, Data Contract v1
- PR 템플릿/이슈 템플릿/릴리즈 체크리스트
- 정책 가이드(마스킹, 정정, 문구)

## Phase 1 (4주) - MVP 핵심 구현

- Dashboard + Case Detail + 핵심 API + mock 실시간

## Phase 2 (4주) - 운영 안정화

- Compare/Alerts, 운영 콘솔, 관측성 고도화

## 10) 착수 전 "완료" 체크리스트

- [ ] 핵심 역할 배정 완료(실명 기준)
- [ ] 작업 보드/상태 흐름 생성
- [ ] DoR/DoD 팀 합의
- [ ] PR/이슈/릴리즈 템플릿 배포
- [ ] 데이터 출처 신뢰도 등급표 합의
- [ ] 마스킹/정정 정책 승인
- [ ] staging/prod 배포 경로 테스트
- [ ] 장애 시 커뮤니케이션 룬북 준비

---

이 문서는 제품 개발 자체가 아니라, 제품 개발을 실패하지 않기 위한 운영 설계 문서다.
다음 단계는 `docs/planning/project-setup-taskboard.md`의 항목을 바로 이슈로 전개해 실행하는 것이다.
