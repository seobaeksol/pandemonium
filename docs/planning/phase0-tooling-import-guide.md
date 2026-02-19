# Phase 0 보드 반영 가이드 (Jira / GitHub / Notion)

## 공통 입력 파일

- 원본: `ops/github/import/phase0-issue-import.csv`
- Jira용: `ops/github/import/phase0-jira-import.csv`
- Notion용: `ops/github/import/phase0-notion-import.csv`
- GitHub Issue 자동 생성 스크립트: `ops/github/scripts/phase0-github-issues-bootstrap.sh`
- GitHub 이슈 assignee/milestone 스크립트: `ops/github/scripts/phase0-github-assign.sh`
- GitHub 킥오프 체크리스트 코멘트 스크립트: `ops/github/scripts/phase0-github-seed-comments.sh`

## 1) Jira로 반영

1. Jira Project -> `Issues` -> `Import issues from CSV`
2. 파일로 `ops/github/import/phase0-jira-import.csv` 선택
3. 필드 매핑:
   - Summary -> Summary
   - Issue Type -> Issue Type
   - Priority -> Priority
   - Labels -> Labels
   - Description -> Description
   - Due Date -> Due date
4. Import 후 보드에서 라벨 기준 스윔레인 권장:
   - `stream-product-policy`
   - `stream-architecture-api`
   - `stream-data`
   - `stream-frontend`
   - `stream-qa-release`
   - `stream-devops-infra`

## 2) GitHub로 반영

사전 조건:
- `gh` 설치 및 로그인 완료
- 대상 저장소 권한 보유

실행:

```bash
chmod +x "ops/github/scripts/phase0-github-issues-bootstrap.sh"
./ops/github/scripts/phase0-github-issues-bootstrap.sh "ops/github/import/phase0-issue-import.csv" "owner/repo"
```

설명:
- 실행 시 17개 P0 이슈를 생성
- 각 이슈에 `phase-0`, `priority-p0`, `stream-*` 라벨 자동 부여

추가 자동화:

```bash
./ops/github/scripts/phase0-github-assign.sh "ops/github/import/phase0-issue-import.csv" "owner/repo" "github-login"
./ops/github/scripts/phase0-github-seed-comments.sh "ops/github/import/phase0-issue-import.csv" "owner/repo"
```

## 3) Notion으로 반영

1. Notion 데이터베이스에서 `Merge with CSV` 선택
2. `ops/github/import/phase0-notion-import.csv` 업로드
3. 속성 타입 매핑:
   - Name -> Title
   - Status -> Status
   - Priority -> Select
   - Stream -> Select
   - Owner Role / Reviewer Role -> Text or Person
   - Start Date / Due Date -> Date
   - Dependency -> Text
   - Policy Impact -> Select

## 4) 반영 후 즉시 해야 할 것

- `docs/planning/phase0-owner-plan.md`의 플레이스홀더를 실명으로 교체
- 17개 P0 이슈에 Owner/Reviewer/Due Date 최종 확인
- Day 1 킥오프에서 `docs/planning/kickoff-day1-agenda.md` 체크박스 실행
