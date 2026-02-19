# Sentinel Pulse PRD v1 (Phase 0)

## 1. Product objective

Sentinel Pulse provides a public-safety intelligence workspace where users can explore incident patterns across time, region, and live signals with evidence-linked context.

This product must prioritize risk awareness and operational context, not sensational incident consumption.

## 2. Problem statement

- Incident information is fragmented across agencies, media, and updates.
- Users can see isolated events but cannot quickly understand timeline, confidence, and trend context.
- Teams need a consistent workflow for verification, correction, and privacy-safe presentation.

## 3. Target users

- Viewer: Tracks local safety signals and trend shifts.
- Analyst: Compares regions/time windows and validates pattern changes.
- Ops/Admin: Manages policy, correction flow, and data-source quality.

## 4. MVP scope (include)

1. Dashboard with filters and heatmap
   - Time range, region, incident type, confidence filters
   - Live feed + map interaction + quick stats
2. Case Detail view
   - Header status, narrative, timeline, evidence list, source verification
   - Redacted location view and reliability indicators
3. Compare view
   - Region/time comparison for core metrics (count, rate, severity index, closure trend)
4. Alerts
   - Subscription by region/type/severity/confidence
   - Delivery via app/email/webhook (at least one channel in MVP)
5. Governance baseline
   - Privacy redaction policy
   - Correction workflow and audit logging

## 5. Non-goals (exclude from MVP)

- Community comments and social interaction features
- Raw media hosting/archiving platform
- Predictive sentencing or legal-outcome recommendation model
- Full multi-region disaster recovery architecture

## 6. Success metrics

## Product metrics

- D7 return rate for saved alert users >= 30%
- Case Detail engagement rate from feed click >= 45%
- Compare view usage among analyst cohort >= 25%

## Technical metrics

- `GET /incidents` p95 < 500ms
- `GET /incidents/{id}` p95 < 700ms
- Live event latency < 5 seconds

## Operational metrics

- Correction SLA first response <= 24h
- High-severity redaction policy violation count = 0
- Source ingest freshness target met >= 95%

## 7. Core user flows

1. Dashboard -> feed card click -> Case Detail
2. Case Detail -> subscribe updates
3. Dashboard -> compare mode -> export insight summary
4. Ops/Admin -> correction request -> status update to `corrected`

## 8. Functional requirements

- Every incident card/detail must expose:
  - Incident type
  - Severity
  - Confidence
  - Last updated timestamp
  - Verification/source footprint
- Restricted incidents must apply redaction policy before rendering.
- Status model required: `verified`, `monitoring`, `corrected`, `restricted`.

## 9. Non-functional requirements

- Full audit trace for status transitions and policy-sensitive updates
- Role-based access control with restricted-item handling
- Staging gate before production rollout
- Rollback path must be validated before launch

## 10. Risks and mitigation

- False positives -> multi-source match + correction workflow + confidence transparency
- Privacy leakage -> strict redaction levels + policy gate before publish
- Pipeline delay -> freshness monitor + stale data indicator fallback

## 11. Dependencies

- Data source inventory and trust-tier definition
- API contract and domain schema
- Frontend route and component contracts
- QA and release gate definition

## 12. Acceptance criteria for Issue PP-01

- MVP include/exclude scope documented
- Product/technical/operational success metrics documented
- Ready for PO + Tech Lead review and sign-off
