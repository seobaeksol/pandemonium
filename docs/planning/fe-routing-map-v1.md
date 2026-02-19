# Sentinel Pulse Frontend Routing Map v1

## 목적

MVP 화면 구조와 URL 전략을 고정해 FE/BE 병렬 개발 리스크를 줄인다.

## 1) Route tree

```text
/
├─ /dashboard
│  ├─ ?region=
│  ├─ ?type=
│  ├─ ?from=
│  ├─ ?to=
│  └─ ?confidence=
├─ /cases/:caseId
│  ├─ ?tab=overview|chronology|network|legal
│  └─ ?from=feed|map|compare
├─ /compare
│  ├─ ?baseRegion=
│  ├─ ?targetRegion=
│  ├─ ?baseFrom=
│  ├─ ?baseTo=
│  ├─ ?targetFrom=
│  └─ ?targetTo=
├─ /alerts
│  ├─ /alerts/new
│  └─ /alerts/:subscriptionId
├─ /restricted
├─ /not-found
└─ /error
```

## 2) Navigation model

- Primary nav: `Dashboard`, `Compare`, `Alerts`
- Context nav: Case Detail 내부 탭(Overview/Chronology/Network/Legal)
- Cross-entry links:
  - Dashboard feed card -> `/cases/:caseId?from=feed`
  - Dashboard map cell -> filtered `/dashboard` query update
  - Compare anomaly row -> `/cases/:caseId?from=compare`

## 3) Route responsibilities

## `/dashboard`

- Purpose: 탐색 시작점 + 필터 조합 + 실시간 상황 확인
- Required blocks:
  - Filter panel
  - Heatmap viewport
  - Live feed list
  - Top status bar

## `/cases/:caseId`

- Purpose: 단일 사건의 증거 기반 상세 조회
- Required blocks:
  - Case header (status/severity/confidence/update)
  - Location snapshot (masked)
  - Narrative + tab content
  - Timeline
  - Evidence list
  - Verification/source panel

## `/compare`

- Purpose: 시계열/지역 비교 분석
- Required blocks:
  - Compare selector
  - Metric cards
  - Trend and delta view

## `/alerts`

- Purpose: 구독 관리
- Required blocks:
  - Current subscriptions list
  - New/edit form

## 4) Guard routes

- Restricted incident access -> `/restricted`
- Unknown route -> `/not-found`
- Runtime fetch/render fatal -> `/error`

## 5) State and deep-link rules

- Dashboard filter state는 query param으로 보존한다.
- Case detail tab state는 `tab` param으로 유지한다.
- Compare 설정도 query param으로 유지하여 공유 가능한 URL을 보장한다.

## 6) Error/empty handling by route

- `/dashboard`: no events -> "조건에 맞는 사건이 없습니다"
- `/cases/:caseId`: not found -> `/not-found`
- `/cases/:caseId`: restricted -> `/restricted`
- `/compare`: insufficient input -> selection prompt view
- `/alerts`: no subscription -> onboarding empty state

## 7) Component ownership map

- `ShellLayout`: global topbar + nav + route outlet
- `DashboardPage`: filter/map/feed orchestration
- `CaseDetailPage`: header/tabs/evidence/source orchestration
- `ComparePage`: compare input + chart + summary orchestration
- `AlertsPage`: subscription CRUD orchestration

## 8) Acceptance criteria for Issue FE-01

- Dashboard/Detail/Compare/Alerts route map defined
- Feed -> detail path defined
- Error/restricted/not-found routes defined
