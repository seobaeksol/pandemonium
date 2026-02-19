# Sentinel Pulse 상세 설계서 (v0.1)

## 1) 목표와 원칙

- 이 서비스는 자극적 소비형 뉴스 피드가 아니라 `공공안전 인텔리전스`를 목표로 한다.
- 핵심 탐색 축은 `시대(과거-현재) + 지역 + 실시간` 3가지다.
- 사용자에게는 사건 요약이 아니라 `맥락(타임라인, 근거, 출처 신뢰도, 진행 상태)`을 제공한다.
- 개인정보 및 2차 피해를 줄이기 위해 `정밀 위치/신원 비노출`을 기본 정책으로 둔다.

## 2) 제품 범위 (MVP)

### 포함
- 실시간 사건 피드 및 히트맵
- 시대/지역 필터 기반 탐색
- 사건 상세 페이지 (내러티브, 타임라인, 증거, 출처 검증)
- 관심 사건/지역 알림 구독

### 제외 (MVP 이후)
- 사용자 커뮤니티/댓글
- 원문 영상 직접 재생 저장소
- 자동 판결 예측 등 고위험 모델 기능

## 3) 주요 사용자와 권한

- `Viewer`(일반 사용자): 조회, 필터, 구독 알림
- `Analyst`(분석 사용자): 비교 대시보드, 고급 필터, 내보내기
- `Ops/Admin`: 데이터 출처 관리, 신고/정정 처리, 가시성 정책 적용

권한 모델은 `RBAC`로 시작하고, 민감 사건은 태그 기반 추가 제어(`ABAC-lite`)를 적용한다.

## 4) 정보 구조 (IA)

1. `Dashboard`
2. `Live Feed`
3. `Case Detail`
4. `Compare` (지역/시대 비교)
5. `Alerts`
6. `Admin Console` (운영자 전용)

## 5) 화면 상세 설계

## 5-1. Dashboard (리스트+지도)

목적: 현재 위험 신호를 빠르게 파악하고, 사건 상세로 진입한다.

핵심 영역:
- 좌측 필터: 사건 유형, 기간 슬라이더, 신뢰도, 지역
- 중앙 지도: 격자 기반 히트맵, 심각도 범례
- 우측 피드: 최신 사건 카드 목록
- 상단 상태바: 동기화 시각, 검색, 현재 적용 필터

인터랙션:
- 피드 카드 클릭 -> `Case Detail` 이동
- 지도 셀 클릭 -> 해당 셀 사건 목록으로 피드 재필터
- 기간 슬라이더 이동 -> 히트맵/통계/피드 동시 갱신

## 5-2. Case Detail (이번에 만든 목업 기준 핵심 화면)

목적: 특정 사건의 사실관계와 맥락을 신뢰 가능한 구조로 제공한다.

섹션 구성:
- `Case Header`: 사건명, 심각도, 진행 상태, 지역, 신뢰도, 마지막 업데이트
- `Location Snapshot`: 정밀 좌표 대신 마스킹된 격자 지도 + 사건 집중 구역
- `Case Narrative`: 사건 요약 설명, 탭(Overview/Chronology/Network/Legal)
- `Timeline`: 발생 -> 수집 -> 상관 분석 -> 법적 상태 전이
- `Evidence List`: 근거 항목, 출처, 신뢰도 점수
- `Verification`: 출처별 최신 점검 시각, 신뢰 등급
- `Actions`: 구독, 요약 리포트(PDF), 유사 패턴 비교

상태 설계:
- `verified`: 다중 출처로 검증 완료
- `monitoring`: 검증 진행 중
- `corrected`: 정정 반영
- `restricted`: 민감 정보 제한 노출

빈 상태/오류:
- 근거 비어 있음: "검증 가능한 데이터 수집 중"
- 출처 지연: "일부 출처가 지연되어 최신성이 제한됨"
- 제한 사건: 최소 정보만 노출 + 정책 안내

## 5-3. Compare (지역/시대 비교)

목적: 두 시점/지역의 사건 패턴을 구조적으로 비교한다.

핵심 지표:
- 발생 건수
- 10만명당 발생률
- 심각도 가중 지수
- 시간대 집중도
- 해결/종결률

출력:
- 비교 카드 + 트렌드 라인 + 차이 하이라이트

## 5-4. Alerts

목적: 관심 지역/유형의 이상 징후를 구독한다.

설정 항목:
- 지역(복수)
- 사건 유형
- 심각도 임계치
- 신뢰도 임계치
- 수신 채널(앱/이메일/웹훅)

## 6) 도메인 모델 (초안)

## 6-1. 핵심 엔티티

- `incident`
  - id, title, incident_type, severity_level, status
  - occurred_at, last_updated_at
  - region_code, geo_cell_id
  - confidence_score, redaction_level

- `incident_event` (사건의 단계별 이력)
  - id, incident_id, event_type, event_time, summary
  - source_refs[], created_by_system

- `evidence_item`
  - id, incident_id, evidence_type, description
  - source_id, reliability_score, collected_at

- `source`
  - id, name, source_type, trust_tier, refresh_interval_sec

- `subscription`
  - id, user_id, filters_json, channel, is_active, last_notified_at

- `audit_log`
  - id, actor_id, action_type, target_type, target_id, created_at

## 6-2. 관계

- incident 1:N incident_event
- incident 1:N evidence_item
- evidence_item N:1 source
- user 1:N subscription

## 7) API 설계 (MVP)

## 7-1. 조회 API

- `GET /api/v1/incidents`
  - query: region, from, to, incidentType[], minSeverity, minConfidence, page
- `GET /api/v1/incidents/{incidentId}`
  - 상세 헤더 + 요약 + 위치 + 상태
- `GET /api/v1/incidents/{incidentId}/timeline`
- `GET /api/v1/incidents/{incidentId}/evidence`
- `GET /api/v1/incidents/{incidentId}/sources`
- `GET /api/v1/compare`
  - query: baseRegion, targetRegion, baseRange, targetRange, incidentType[]

## 7-2. 알림 API

- `POST /api/v1/subscriptions`
- `PATCH /api/v1/subscriptions/{id}`
- `DELETE /api/v1/subscriptions/{id}`

## 7-3. 실시간

- `WS /ws/incidents`
  - 이벤트 타입: `incident.created`, `incident.updated`, `incident.corrected`
  - 클라이언트는 구독 필터를 연결 시 전달한다.

예시 payload:

```json
{
  "type": "incident.updated",
  "incidentId": "SP-2094",
  "status": "monitoring",
  "severityLevel": "high",
  "confidenceScore": 0.91,
  "regionCode": "KR-11-WEST",
  "occurredAt": "2026-01-24T02:26:00Z",
  "updatedAt": "2026-01-24T02:37:00Z"
}
```

## 8) 데이터 처리 파이프라인

1. `Ingest`: 공공/언론/기관 피드 수집
2. `Normalize`: 시간/위치/유형 표준화
3. `Dedup`: 유사 사건 병합
4. `Correlate`: 증거/출처 상관 분석
5. `Score`: confidence_score, severity_index 산출
6. `Publish`: API/WS에 반영, 알림 규칙 평가

신뢰도 점수(초안):

```text
confidence = sourceTrustWeight * 0.5
           + crossSourceMatch * 0.3
           + temporalConsistency * 0.1
           + geoConsistency * 0.1
```

## 9) 개인정보/윤리/법적 가드레일

- 정확 좌표 비노출(격자 단위 노출)
- 피해자/미성년자/민감 신원정보 자동 마스킹
- 사건 원문에서 선정적 제목/썸네일 억제 규칙
- 정정 요청/이의 제기 접수 및 `corrected` 상태 반영
- 법적 보존 기간 정책(로그/증거 메타데이터 분리)

## 10) UX 규칙 (상세 화면 기준)

- 사건 상세 진입 후 첫 화면에서 반드시 보이는 요소
  - 상태, 심각도, 신뢰도, 마지막 갱신 시각
- 증거 항목은 신뢰도 높은 순 정렬
- 출처가 단일이면 `모니터링` 배지 강제
- 법적 상태가 미확정이면 단정적 문구 금지
- 리포트 내보내기는 기본적으로 `redacted` 버전 제공

## 11) 성능/신뢰성 기준 (MVP)

- 목록 API p95 < 500ms
- 상세 API p95 < 700ms
- 실시간 이벤트 전달 지연 < 5초
- 데이터 파이프라인 장애 시 마지막 정상 스냅샷 표시

## 12) 개발 로드맵 (4스프린트)

### Sprint 1
- 데이터 스키마/인덱스 설계
- Dashboard/Case Detail 프론트 정적 구현

### Sprint 2
- Incident 조회 API + 상세 API
- Timeline/Evidence/Source 연결

### Sprint 3
- WS 실시간 업데이트 + 알림 구독
- Compare 화면 구현

### Sprint 4
- 운영 콘솔(정정/마스킹 정책)
- 감사 로그/리포트 내보내기/배포 안정화

## 13) 현재 목업 대비 구현 체크리스트

- [x] Dashboard 레이아웃 샘플
- [x] Case Detail 레이아웃 샘플
- [ ] 탭 전환 인터랙션
- [ ] 피드 -> 상세 라우팅
- [ ] 실제 데이터 바인딩
- [ ] 알림 구독 연동

## 14) 다음 구현 우선순위

1. `Case Detail JSON contract` 확정
2. 피드 카드 클릭 시 상세 라우팅 프로토타입
3. 상세 화면 탭/타임라인 인터랙션
4. mock API + websocket 이벤트 시뮬레이터
