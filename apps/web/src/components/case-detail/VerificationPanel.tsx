import React from "react";
import { Panel } from "./Panel";

export function VerificationPanel() {
  return (
    <Panel title="Verification and Actions" badge="Audit ready">
      <div className="space-y-2 mb-3">
        {[
          {
            name: "Emergency Dispatch",
            meta: "Events: 7 | Last check 11:33 | Trust: high",
          },
          {
            name: "Municipal CCTV",
            meta: "Matched segments: 14 | Last check 11:29 | Trust: high",
          },
          {
            name: "Local News + Agency Wire",
            meta: "Articles: 9 | Last check 11:34 | Trust: medium-high",
          },
          {
            name: "Judicial Status Feed",
            meta: "Case handoff: pending | Last check 11:36 | Trust: high",
          },
        ].map((src, i) => (
          <div key={i} className="border border-line rounded-xl bg-white p-2.5">
            <strong className="block text-xs text-ink">{src.name}</strong>
            <span className="block text-[11px] text-muted mt-1">{src.meta}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        <button className="border border-accent/40 rounded-xl p-2.5 bg-accent/10 text-[#0a5a69] text-xs text-center hover:bg-accent/20 transition-colors">
          Open full dossier
        </button>
        <button className="border border-line rounded-xl p-2.5 bg-white text-ink text-xs text-center hover:bg-gray-50 transition-colors">
          Subscribe to case updates
        </button>
        <button className="border border-line rounded-xl p-2.5 bg-white text-ink text-xs text-center hover:bg-gray-50 transition-colors">
          Export redacted timeline PDF
        </button>
        <button className="border border-line rounded-xl p-2.5 bg-white text-ink text-xs text-center hover:bg-gray-50 transition-colors">
          Compare with prior quarter cluster
        </button>
      </div>
    </Panel>
  );
}
