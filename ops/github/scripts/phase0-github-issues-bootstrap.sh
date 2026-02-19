#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEFAULT_CSV_PATH="${SCRIPT_DIR}/../import/phase0-issue-import.csv"

CSV_PATH="${1:-$DEFAULT_CSV_PATH}"
REPO="${2:-}"

if ! command -v gh >/dev/null 2>&1; then
  printf "gh CLI not found. Install GitHub CLI first.\n" >&2
  exit 1
fi

if [ ! -f "$CSV_PATH" ]; then
  printf "CSV file not found: %s\n" "$CSV_PATH" >&2
  exit 1
fi

if [ -z "$REPO" ]; then
  REPO="$(gh repo view --json nameWithOwner -q .nameWithOwner)"
fi

python3 - "$CSV_PATH" "$REPO" <<'PY'
import csv
import subprocess
import sys

csv_path = sys.argv[1]
repo = sys.argv[2]

stream_label = {
    "ProductPolicy": "stream-product-policy",
    "ArchitectureAPI": "stream-architecture-api",
    "Data": "stream-data",
    "Frontend": "stream-frontend",
    "QARelease": "stream-qa-release",
    "DevOpsInfra": "stream-devops-infra",
}

with open(csv_path, newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))

for row in rows:
    issue_id = row["id"].strip()
    title = row["title"].strip()
    dependency = row["dependency"].strip() or "none"
    due_date = row["due_date"].strip()
    owner_role = row["owner_role"].strip()
    reviewer_role = row["reviewer_role"].strip()
    labels = ["phase-0", "priority-p0", stream_label.get(row["stream"].strip(), "stream-misc")]
    body = (
        f"## Goal\n"
        f"Execute Phase 0 P0 item `{issue_id}` based on setup plan.\n\n"
        f"## Owner/Reviewer\n"
        f"- Owner role: {owner_role}\n"
        f"- Reviewer role: {reviewer_role}\n\n"
        f"## Dependency\n"
        f"- {dependency}\n\n"
        f"## Due Date\n"
        f"- {due_date}\n\n"
        f"## Required Evidence\n"
        f"- Document link\n"
        f"- Review approval comment\n"
        f"- Verification logs/screenshots if applicable\n"
    )
    cmd = [
        "gh",
        "issue",
        "create",
        "--repo",
        repo,
        "--title",
        f"[{issue_id}] {title}",
        "--body",
        body,
    ]
    for label in labels:
        cmd.extend(["--label", label])
    print(f"Creating issue: [{issue_id}] {title}")
    subprocess.run(cmd, check=True)

print("Done: all Phase 0 P0 issues created.")
PY
