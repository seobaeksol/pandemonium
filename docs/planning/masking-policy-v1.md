# Sentinel Pulse Masking Policy v1

## 목적

개인정보 및 민감 정보 노출을 방지하기 위해 데이터 저장/노출 단계의 마스킹 규칙을 정의한다.

## 1) Redaction levels

- `L0_PUBLIC_SAFE`
  - 공개 가능한 메타 정보만 포함
  - 사건 유형/지역(광역)/시간(버킷) 노출 가능

- `L1_PARTIAL_REDACTED`
  - 세부 텍스트 일부 마스킹
  - 좌표는 격자화, 주소는 동/구 단위로 축약

- `L2_STRICT_REDACTED`
  - 개인 식별 가능 문자열 제거
  - 상세 서술 최소화, 근거 목록 제한

- `L3_RESTRICTED_VIEW`
  - 제한 노출 전용
  - 상태/유형/최소 시점 정보만 노출

## 2) Data class by sensitivity

- `Class A (Direct PII)`
  - 이름, 주민등록번호, 전화번호, 차량번호, 상세 주소
  - 기본 정책: 저장 시 분리/암호화, 기본 노출 금지

- `Class B (Quasi-identifiers)`
  - 세부 위치 좌표, 특정 시간+장소 조합, 소수 케이스 식별 단서
  - 기본 정책: 격자화/범주화 후 노출

- `Class C (Operational context)`
  - 사건 유형, 심각도, 시간 버킷, 지역 코드
  - 기본 정책: L0 이상에서 노출 가능

## 3) Mandatory masking rules

1. 미성년자 관련 사건은 최소 `L2_STRICT_REDACTED` 이상 강제
2. 성폭력/가정폭력/혐오범죄 등 고민감 유형은 `L2` 이상 강제
3. `restricted` 상태 사건은 `L3` 강제
4. 텍스트 내 개인식별 패턴(전화번호/차량번호/계좌번호)은 저장 전 마스킹
5. 원본 좌표는 별도 보호 저장소 분리, 서비스 응답에는 `geo_cell_id`만 사용

## 4) Location anonymization policy

- 내부 저장: 원본 좌표 + `geo_cell_id`
- 외부 응답: `geo_cell_id`만 반환
- 지도 표시: 최소 격자 크기 기준 적용(도심/비도심 차등)
- 소규모 사건(동일 셀 n<k)에는 k-anonymity 룰로 셀 병합

## 5) Text redaction policy

- Named entity redaction:
  - Person, exact address, school name, workplace name(고위험)
- Pattern redaction:
  - phone, plate number, account number, long numeric identifiers
- Lexical caution:
  - 단정/자극 표현은 정책 사전으로 치환

## 6) Operational workflow

1. Ingest 단계에서 자동 마스킹
2. Publish 직전 정책 게이트 재검사
3. 위반 탐지 시 publish 차단 + 운영 알림
4. 정정 요청 시 원인 필드와 정책 룰 로그 첨부

## 7) Audit and compliance

- `redaction_level`, `policy_rule_id`, `policy_applied_at`, `applied_by` 기록 필수
- 정책 위반 이벤트는 severity `high`로 모니터링
- 월 1회 샘플링 리뷰(최소 50건)

## 8) UI rules

- 제한 사건: "정책에 따라 상세 정보가 제한됩니다" 문구 노출
- 정정 반영 사건: 정정 시각/정정 사유 코드 표시
- 신뢰도가 낮은 사건: 단정 문구 금지

## 9) Acceptance criteria for Issue PP-03

- 마스킹 레벨과 적용 조건 문서화
- 민감 필드/위치/텍스트 마스킹 규칙 명시
- 운영 적용(게이트, 감사로그) 규칙 포함
