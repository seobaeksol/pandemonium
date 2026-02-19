# Sentinel Pulse Access Model v1 (RBAC + Restricted Tag)

## 목적

역할 기반 권한(RBAC)과 민감 사건 제한 태그(restricted tag)를 결합해 데이터 노출 경계를 명확히 한다.

## 1) Roles

- `viewer`
  - 일반 조회 사용자
- `analyst`
  - 비교/분석 기능 사용자
- `ops_admin`
  - 정책/정정/운영 워크플로우 관리자
- `system`
  - 파이프라인/자동화 서비스 계정

## 2) Resource groups

- Incident list/detail
- Timeline/evidence/source
- Compare analytics
- Subscription settings
- Correction workflow
- Policy/administration endpoints

## 3) Permission matrix

| Resource | viewer | analyst | ops_admin | system |
|---|---|---|---|---|
| Incident list | R | R | R/W | R/W |
| Incident detail (non-restricted) | R | R | R/W | R/W |
| Incident detail (restricted) | R (L3 only) | R (L2/L3 by policy) | R/W | R/W |
| Timeline/evidence/source | R (masked) | R (masked/full by policy) | R/W | R/W |
| Compare analytics | R (basic) | R (full) | R (full) | R/W |
| Subscription CRUD | R/W (self) | R/W (self/team by scope) | R/W | R/W |
| Correction request | submit only | submit/review (limited) | full | full |
| Policy/admin endpoints | - | - | full | limited internal |

## 4) Restricted-tag policy

## Tag types

- `restricted:minors`
- `restricted:sexual_violence`
- `restricted:domestic_violence`
- `restricted:active_investigation`

## Enforcement

- `viewer`: restricted 사건은 `L3_RESTRICTED_VIEW`만 허용
- `analyst`: 정책 승인이 있는 범위에서 `L2/L3` 허용
- `ops_admin/system`: 정책 목적 범위 내 full access

API authorization 실패 시:

- `403 FORBIDDEN` + `error.code=RESTRICTED_ACCESS`

## 5) Scope model

- region scope: 특정 지역 권한
- action scope: read/write/review
- data scope: masked/full

예시 claim:

```json
{
  "role": "analyst",
  "regionScopes": ["KR-11-WEST"],
  "actions": ["read_incident", "read_compare"],
  "dataScope": "masked"
}
```

## 6) Decision flow

```text
Authenticate -> Resolve role -> Check base permission -> Check restricted tags -> Apply redaction level -> Authorize/deny
```

## 7) Audit requirements

- restricted 리소스 접근 시 audit 이벤트 필수
- `actor_id`, `role`, `incident_id`, `tag`, `decision`, `timestamp`
- deny 이벤트도 반드시 저장

## 8) Operational controls

- 권한 변경은 승인 워크플로우 필수
- 임시 권한 부여는 TTL 필수
- 월 1회 권한 리뷰 수행

## 9) Acceptance criteria for Issue AR-03

- 역할별 접근표 정의
- restricted 사건 접근 규칙 정의
- 권한 결정/감사 추적 규칙 정의
