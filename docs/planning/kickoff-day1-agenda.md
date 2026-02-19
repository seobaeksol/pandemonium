# Sentinel Pulse 킥오프 아젠다 (Day 1, 90분)

목적: 본격 개발 전에 팀 운영 규칙과 Phase 0 실행 범위를 잠그는 회의.

## 참석자

- PO, Tech Lead, FE, BE, Data, QA, SRE, Policy/Legal

## 준비물

- `docs/design/public-safety-detailed-design.md`
- `docs/planning/project-workflow-playbook.md`
- `docs/planning/project-setup-taskboard.md`
- `docs/planning/phase0-issue-backlog.md`
- `docs/planning/phase0-owner-plan.md`

## 타임박스 아젠다

## 0:00-0:10 (10m) - 목표 정렬

- 왜 지금 "작업을 위한 작업"이 필요한지 정렬
- 성공 기준 4개(제품/기술/운영/배포) 재확인

결정 산출물:

- [ ] 킥오프 목적과 성공 기준 합의

## 0:10-0:25 (15m) - 범위 잠금

- MVP 포함/제외 항목 확인
- Phase 0에서 끝내야 할 P0 목록(17개) 확정

결정 산출물:

- [ ] P0 항목 누락 없음 확인
- [ ] 스코프 변경 승인자(PO+Tech Lead) 확정

## 0:25-0:45 (20m) - 역할/책임 확정

- 역할별 실명 매핑 완료
- RACI에서 충돌나는 책임 정리

결정 산출물:

- [ ] `docs/planning/phase0-owner-plan.md` 실명 채움
- [ ] 리뷰어/승인자 충돌 0건

## 0:45-1:05 (20m) - 운영 규칙 확정

- 이슈 상태 흐름/DoR/DoD 합의
- PR 리뷰/품질 게이트/정책 승인 규칙 확정

결정 산출물:

- [ ] DoR/DoD 승인
- [ ] PR 템플릿 필수 항목 동의

## 1:05-1:20 (15m) - 일정/의존성 점검

- Day 1~Day 6 체크포인트 검토
- Blocker 대응 프로토콜 합의

결정 산출물:

- [ ] 주간 캘린더 확정
- [ ] Blocker escalation 경로 확정

## 1:20-1:30 (10m) - 액션 아이템 확정

- 오늘 생성할 이슈/담당자/마감일 확정
- 첫 데일리(내일) 리포트 형식 고정

결정 산출물:

- [ ] 오늘 EOD 전 생성할 이슈 목록 확정
- [ ] 내일 데일리 보고 템플릿 확정

## 회의 직후 실행 체크리스트 (EOD)

- [ ] 17개 P0 이슈 생성 완료
- [ ] 각 이슈 Owner/Reviewer/Due date 입력 완료
- [ ] Board 상태 컬럼 구성 완료
- [ ] PR/Issue 템플릿 반영 완료
- [ ] 첫 주 캘린더 초대 발송 완료

## 데일리 보고 템플릿 (권장)

```text
[Date]
Done: 어제 완료 항목
Today: 오늘 목표
Blocker: 리스크/의존 이슈
Need Decision: 의사결정 필요 사항
```
