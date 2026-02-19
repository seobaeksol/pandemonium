# Sentinel Pulse Data Source Inventory v1

## 목적

MVP에서 사용할 사건 데이터 소스를 후보군으로 정리하고, 신뢰등급과 법적/운영상 제약을 초기 정의한다.

주의: 본 문서는 Phase 0 초안이며 실제 계약/API 접근성/법적 사용 허용은 별도 검증 후 확정한다.

## 1) Trust tier definition

- Tier A: 공공기관 공식 원천 데이터, 정기 갱신, 감사추적 가능
- Tier B: 공신력 있는 기관/언론 1차 보도, 교차검증 가능
- Tier C: 보조 신호 데이터(지역 커뮤니티, 오픈 리포트), 단독 사용 금지
- Tier D: 미검증 수집 채널, 탐지 후보로만 사용

## 2) Source inventory (candidate)

| Source ID | Source name | Category | Use for | Refresh target | Trust tier | Legal/compliance note | PII risk |
|---|---|---|---|---|---|---|---|
| SRC-001 | National police official briefings | Public agency | Violence/homicide baseline events | 1h | A | 공개 제공 범위 외 개인식별정보 수집 금지 | High |
| SRC-002 | Fire department incident disclosure | Public agency | Arson/fire event metadata | 1h | A | 주소 상세 좌표 저장 금지, 격자 변환 필수 | High |
| SRC-003 | Municipal open data portals | Public agency | Regional incident counts/trends | Daily | A | 라이선스 표기 및 재배포 조건 확인 필요 | Medium |
| SRC-004 | Court/prosecution public status feed | Judicial status | Case progression status | Daily | A | 사건 식별자 매핑 규칙 필요, 민감 사건 제한 | Medium |
| SRC-005 | National emergency bulletin feed | Public alert | High-severity alert signal | Near real-time | A | 경보 데이터 원문 보존 기간 정책 필요 | Medium |
| SRC-006 | Major wire news (licensed) | Media | Event enrichment and context | 30m | B | 저작권/라이선스 계약 필수, 본문 재게시 제한 | Medium |
| SRC-007 | Major broadcaster newsroom API/feed | Media | Rapid incident updates | 30m | B | 헤드라인/요약 사용 조건 검토 필요 | Medium |
| SRC-008 | Local government press releases | Public agency | Local correction and updates | 2h | B | 기관별 형식 불일치 대비 normalization 필요 | Low |
| SRC-009 | Traffic/disaster public control center feed | Public ops | Area disruption and emergency context | 10m | B | 위치 정밀도 제한 표시 필요 | Low |
| SRC-010 | Community reports (moderated) | Community | Early weak-signal candidate | real-time | C | 단독 게시 금지, 최소 2개 검증 소스 필요 | High |

## 3) Ingestion recommendation by tier

- Tier A: 자동 수집 + 우선 파이프라인
- Tier B: 자동 수집 + 교차검증 후 publish
- Tier C: 탐지 큐 적재, 즉시 publish 금지
- Tier D: 수집 실험 영역으로 분리, 운영 노출 금지

## 4) Mandatory gating rules

1. Tier C/D 단독 소스로 사건 상태 `verified` 금지
2. 개인식별 가능 문자열은 ingest 단계에서 마스킹
3. 위치는 저장 시 `geo_cell_id`로 변환 후 정밀 좌표 폐기/분리보관
4. corrected 요청 발생 시 source trace를 사건 이력에 강제 첨부

## 5) Data quality KPIs (Phase 0 baseline)

- Source freshness pass rate >= 95%
- Duplicate collision false-merge rate < 3%
- Missing critical fields rate < 2%
- Redaction violation = 0

## 6) Open validation items

- 각 후보 소스의 실제 API 접근권/약관 검토
- 저작권 및 재배포 정책의 서비스 노출 범위 확정
- 지자체/기관별 필드 표준화 난이도 평가

## 7) Acceptance criteria for Issue DA-01

- 소스 목록(후보) 문서화
- trust tier 부여
- 법적/규정 메모 포함
