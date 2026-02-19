import React from "react";
import { Badge } from "./Badge";

interface CaseHeaderProps {
  id: string;
}

export function CaseHeader({ id }: CaseHeaderProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3.5 px-4.5 py-3.5 border-b border-line bg-white/40">
      <div>
        <div className="text-xs text-muted mb-1.5">
          Home / Cases / Seoul West / Case #{id}
        </div>
        <h2 className="text-2xl font-medium text-ink mb-2">
          Warehouse Block Arson Pattern - Detailed Case View
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="severe">High Severity</Badge>
          <Badge variant="progress">Investigation Ongoing</Badge>
          <Badge variant="default">Region: Seoul West</Badge>
          <Badge variant="default">Confidence: 0.91</Badge>
          <Badge variant="outline">Last update: 11:37</Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 min-w-[360px]">
        {[
          { k: "Linked Events", v: "7" },
          { k: "Source Match", v: "93%" },
          { k: "Alert Level", v: "Tier 3" },
        ].map((s) => (
          <div
            key={s.k}
            className="border border-line rounded-xl bg-panel p-2.5 flex flex-col justify-center"
          >
            <div className="text-[11px] text-muted">{s.k}</div>
            <div className="mt-1 text-xl font-semibold">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
