# Sentinel Pulse Phase 0 - Owner Assignment & Schedule

기준 시작일(권장): `2026-02-23 (Mon)`
완료 목표일: `2026-03-06 (Fri)`

## 1) 역할별 실명 매핑 (먼저 채우기)

- Product Owner: `<PO_NAME>`
- Tech Lead: `<TECH_LEAD_NAME>`
- Frontend Engineer: `<FE_NAME>`
- Backend Engineer A: `<BE_A_NAME>`
- Backend Engineer B: `<BE_B_NAME>`
- Data Engineer: `<DATA_NAME>`
- QA Automation: `<QA_NAME>`
- SRE/DevOps: `<SRE_NAME>`
- Policy/Legal: `<POLICY_NAME>`

## 2) P0 일정표 (Issue Owner + Reviewer + Due)

| ID | Owner | Reviewer | Start | Due | Handoff Output |
|---|---|---|---|---|---|
| PP-01 | PO | Tech Lead | 02/23 | 02/23 | PRD v1 |
| FE-01 | FE | Tech Lead | 02/23 | 02/23 | 라우팅 맵 |
| DA-01 | Data | PO | 02/23 | 02/23 | 소스 인벤토리 |
| PP-02 | PO | Policy | 02/24 | 02/24 | 상태 전이 표 |
| PP-03 | Policy | Tech Lead | 02/24 | 02/24 | 마스킹 정책 v1 |
| FE-02 | FE | QA | 02/24 | 02/24 | 상세 컴포넌트 계약 |
| DA-02 | Data | BE A | 02/24 | 02/24 | normalize 스키마 |
| AR-01 | Tech Lead + BE A | BE B | 02/25 | 02/25 | ERD + 필드 사전 |
| AR-02 | BE A | FE | 02/25 | 02/25 | API/WS 계약서 |
| AR-03 | BE B | Policy | 02/25 | 02/25 | 권한 매트릭스 |
| DA-03 | Data + BE B | Tech Lead | 02/25 | 02/25 | dedup 규칙표 |
| PP-04 | Policy + PO | Ops/Admin | 02/25 | 02/25 | 정정 SOP |
| QA-01 | QA | Tech Lead | 02/26 | 02/26 | 테스트 전략서 |
| QA-02 | QA + Tech Lead | PO | 02/26 | 02/26 | DoR/DoD 확정본 |
| OP-01 | SRE | Tech Lead | 02/26 | 02/26 | 환경 분리 정책 |
| OP-02 | SRE | QA | 02/27 | 02/27 | CI 파이프라인 |
| OP-03 | SRE | Tech Lead | 03/02 | 03/02 | 배포/롤백 리허설 로그 |

## 3) 일자별 체크포인트

- `Day 1 (02/23)`: PRD/소스/라우팅 고정 -> Scope drift 차단
- `Day 2 (02/24)`: 정책/컴포넌트/정규화 규격 고정 -> 병렬개발 기반 생성
- `Day 3 (02/25)`: ERD/API/권한/Dedup/SOP 일괄 잠금
- `Day 4 (02/26)`: QA 전략 + DoR/DoD + 환경정책 확정
- `Day 5 (02/27)`: CI 게이트 강제 적용
- `Day 6 (03/02)`: 배포/롤백 검증 완료
- `Day 7~10 (03/03~03/06)`: 버퍼 + 문서보강 + Go/No-Go 준비

## 4) 핸드오프 규칙 (강제)

- 모든 산출물은 문서 링크 + 승인자 코멘트 1개 이상 첨부
- 의존 이슈는 선행 이슈 `Done` 전 `In Progress` 금지
- 정책 영향(high) 이슈는 Policy 승인 없으면 `Done` 금지
- QA/배포 이슈는 실행 로그(스크린샷 또는 링크) 없으면 `Done` 금지

## 5) Go/No-Go 미팅 입력물

다음이 준비되면 Go/No-Go 회의 개최:

- 17개 P0 이슈 상태표
- 남은 리스크 상위 5개 + 대응 담당자
- Phase 1 첫 주 백로그 후보(최소 10개)
- CI 최근 3회 실행 결과
- 배포/롤백 리허설 결과
