#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_CSV_PATH="${SCRIPT_DIR}/../import/phase0-issue-import.csv"

CSV_PATH="${1:-$DEFAULT_CSV_PATH}"
REPO="${2:-seobaeksol/pandemonium}"

if ! command -v gh >/dev/null 2>&1; then
  printf "gh CLI not found. Install GitHub CLI first.\n" >&2
  exit 1
fi

if [ ! -f "$CSV_PATH" ]; then
  printf "CSV file not found: %s\n" "$CSV_PATH" >&2
  exit 1
fi

python3 - "$CSV_PATH" "$REPO" <<'PY'
import csv
import json
import re
import subprocess
import sys

csv_path = sys.argv[1]
repo = sys.argv[2]


def run(args):
    return subprocess.check_output(args, text=True).strip()


def run_json(args):
    out = run(args)
    return json.loads(out) if out else []


issues = run_json([
    "gh",
    "issue",
    "list",
    "--repo",
    repo,
    "--state",
    "open",
    "--limit",
    "200",
    "--json",
    "number,title",
])

id_to_number = {}
for issue in issues:
    m = re.match(r"^\[([^\]]+)\]", issue["title"])
    if m:
        id_to_number[m.group(1)] = issue["number"]

with open(csv_path, newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))

added = 0
skipped = 0

for row in rows:
    issue_id = row["id"].strip()
    number = id_to_number.get(issue_id)
    if not number:
        print(f"Skip: issue id {issue_id} not found")
        skipped += 1
        continue

    comments = run_json([
        "gh",
        "issue",
        "view",
        str(number),
        "--repo",
        repo,
        "--json",
        "comments",
    ]).get("comments", [])

    if any("phase0-seed-checklist" in c.get("body", "") for c in comments):
        print(f"Skip: #{number} already has seed checklist comment")
        skipped += 1
        continue

    owner_role = row["owner_role"].strip()
    reviewer_role = row["reviewer_role"].strip()
    dependency = row["dependency"].strip() or "none"
    due_date = row["due_date"].strip()

    body = (
        "<!-- phase0-seed-checklist -->\n"
        f"### Phase 0 Execution Checklist (`{issue_id}`)\n"
        f"- Owner role: `{owner_role}`\n"
        f"- Reviewer role: `{reviewer_role}`\n"
        f"- Dependency: `{dependency}`\n"
        f"- Target due: `{due_date}`\n\n"
        "#### Work Checklist\n"
        "- [ ] Replace role placeholders with named owner/reviewer\n"
        "- [ ] Confirm dependency issue status before start\n"
        "- [ ] Attach working document link\n"
        "- [ ] Attach review approval comment\n"
        "- [ ] Attach verification logs/screenshots\n"
        "- [ ] Move Project status to `In Progress` when execution starts\n"
        "- [ ] Move Project status to `Done` only after evidence is attached\n\n"
        "#### Reference Docs\n"
        "- `docs/planning/project-workflow-playbook.md`\n"
        "- `docs/planning/project-setup-taskboard.md`\n"
        "- `docs/planning/phase0-owner-plan.md`\n"
        "- `docs/planning/kickoff-day1-agenda.md`\n"
    )

    subprocess.run(
        [
            "gh",
            "issue",
            "comment",
            str(number),
            "--repo",
            repo,
            "--body",
            body,
        ],
        check=True,
    )
    print(f"Added seed checklist comment to #{number}")
    added += 1

print(f"Done: added={added}, skipped={skipped}")
PY
