#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_CSV_PATH="${SCRIPT_DIR}/../import/phase0-issue-import.csv"

CSV_PATH="${1:-$DEFAULT_CSV_PATH}"
REPO="${2:-seobaeksol/pandemonium}"
ASSIGNEE="${3:-}"

if ! command -v gh >/dev/null 2>&1; then
  printf "gh CLI not found. Install GitHub CLI first.\n" >&2
  exit 1
fi

if [ ! -f "$CSV_PATH" ]; then
  printf "CSV file not found: %s\n" "$CSV_PATH" >&2
  exit 1
fi

if [ -z "$ASSIGNEE" ]; then
  ASSIGNEE="$(gh api user --jq .login)"
fi

python3 - "$CSV_PATH" "$REPO" "$ASSIGNEE" <<'PY'
import csv
import json
import re
import subprocess
import sys

csv_path = sys.argv[1]
repo = sys.argv[2]
assignee = sys.argv[3]


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

milestones = run_json([
    "gh",
    "api",
    f"repos/{repo}/milestones?state=all&per_page=100",
])
milestone_titles = {m["title"] for m in milestones}


def ensure_milestone(due_date: str) -> str:
    title = f"Due {due_date}"
    if title in milestone_titles:
        return title
    due_on = f"{due_date}T23:59:59Z"
    subprocess.run(
        [
            "gh",
            "api",
            f"repos/{repo}/milestones",
            "-X",
            "POST",
            "-f",
            f"title={title}",
            "-f",
            f"due_on={due_on}",
        ],
        check=True,
    )
    milestone_titles.add(title)
    print(f"Created milestone: {title}")
    return title


with open(csv_path, newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))

for row in rows:
    issue_id = row["id"].strip()
    due = row["due_date"].strip()
    number = id_to_number.get(issue_id)
    if not number:
        print(f"Skip: issue with id {issue_id} not found")
        continue
    milestone_title = ensure_milestone(due)
    subprocess.run(
        [
            "gh",
            "issue",
            "edit",
            str(number),
            "--repo",
            repo,
            "--add-assignee",
            assignee,
            "--milestone",
            milestone_title,
        ],
        check=True,
    )
    print(f"Updated #{number}: assignee={assignee}, milestone={milestone_title}")

print("Done: assignment and milestone mapping complete.")
PY
