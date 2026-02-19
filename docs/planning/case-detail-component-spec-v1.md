# Sentinel Pulse Case Detail Component Spec v1

## 목적

Case Detail 화면을 컴포넌트 단위로 분해하고 입력 계약(props contract)을 정의해 구현/테스트 병렬 진행을 가능하게 한다.

## 1) Component tree

```text
CaseDetailPage
├─ CaseHeader
├─ LocationSnapshotPanel
├─ CaseNarrativePanel
│  ├─ CaseTabs
│  └─ NarrativeBlock
├─ TimelinePanel
│  └─ TimelineItem[]
├─ EvidencePanel
│  └─ EvidenceRow[]
├─ VerificationPanel
│  └─ SourceCard[]
└─ CaseActionsPanel
```

## 2) Shared types

```ts
type IncidentStatus = "monitoring" | "verified" | "corrected" | "restricted";

type SeverityLevel = "low" | "medium" | "high" | "critical";

type CaseTabKey = "overview" | "chronology" | "network" | "legal";

interface CaseHeaderModel {
  caseId: string;
  title: string;
  status: IncidentStatus;
  severity: SeverityLevel;
  confidenceScore: number;
  regionLabel: string;
  updatedAt: string;
}

interface TimelineEventModel {
  id: string;
  title: string;
  summary: string;
  eventTime: string;
  eventType: string;
}

interface EvidenceModel {
  id: string;
  evidenceType: string;
  description: string;
  reliabilityScore: number;
  sourceName: string;
  collectedAt: string;
}

interface SourceVerificationModel {
  sourceId: string;
  sourceName: string;
  trustTier: "A" | "B" | "C" | "D";
  lastCheckedAt: string;
  note: string;
}
```

## 3) Component contracts

## `CaseHeader`

props:

```ts
interface CaseHeaderProps {
  model: CaseHeaderModel;
  onBack: () => void;
}
```

render requirements:

- title, case id, status badge, severity badge
- confidence and last update timestamp

## `LocationSnapshotPanel`

props:

```ts
interface LocationSnapshotPanelProps {
  geoCellId: string;
  spreadRadiusKm: number;
  firstSignalAt: string;
  latestSignalAt: string;
  redactionLevel: string;
}
```

render requirements:

- masked grid map only (no precise coordinate)
- redaction notice

## `CaseNarrativePanel`

props:

```ts
interface CaseNarrativePanelProps {
  activeTab: CaseTabKey;
  onTabChange: (tab: CaseTabKey) => void;
  narrativeText: string;
}
```

render requirements:

- tab switcher
- tab-specific summary content

## `TimelinePanel`

props:

```ts
interface TimelinePanelProps {
  events: TimelineEventModel[];
}
```

render requirements:

- chronological ordering (newest/oldest toggle optional)
- each event shows title, summary, eventTime

## `EvidencePanel`

props:

```ts
interface EvidencePanelProps {
  items: EvidenceModel[];
  sortBy: "reliability" | "time";
}
```

render requirements:

- reliability score chip
- source name and collected timestamp

## `VerificationPanel`

props:

```ts
interface VerificationPanelProps {
  sources: SourceVerificationModel[];
}
```

render requirements:

- source trust tier and freshness
- verification note

## `CaseActionsPanel`

props:

```ts
interface CaseActionsPanelProps {
  onSubscribe: () => void;
  onExportRedactedPdf: () => void;
  onOpenDossier: () => void;
}
```

render requirements:

- subscribe button
- export redacted timeline button
- open dossier button

## 4) State-specific render rules

- `restricted`: Narrative/Evidence detail 최소화, 안내 배너 우선
- `monitoring`: "검증 진행 중" 배지 + 단정 문구 금지
- `corrected`: 정정 태그와 정정 시각 강조

## 5) Empty and error states

- Timeline empty: "연결된 타임라인 이벤트가 아직 없습니다"
- Evidence empty: "검증 가능한 근거 수집 중입니다"
- Source empty: "출처 검증 데이터 지연"
- Fatal fetch error: error boundary + retry action

## 6) Acceptance criteria for Issue FE-02

- 상세 화면 컴포넌트 목록 및 책임 분리 문서화
- props contract(입력 스키마) 정의
- 상태별 렌더링 규칙 정의
