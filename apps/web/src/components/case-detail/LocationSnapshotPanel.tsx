import React from "react";
import { Panel } from "./Panel";

export function LocationSnapshotPanel() {
  return (
    <Panel title="Location Snapshot" badge="Grid protected">
      <div className="relative h-[230px] border border-line rounded-xl bg-[#f8fbf8] overflow-hidden mb-3">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(11,114,133,0.09)_0px,rgba(11,114,133,0.09)_1px,transparent_1px,transparent_34px),repeating-linear-gradient(0deg,rgba(11,114,133,0.09)_0px,rgba(11,114,133,0.09)_1px,transparent_1px,transparent_34px)]"></div>
        <div className="absolute left-[39%] top-[31%] w-[130px] h-[130px] rounded-full blur-[2px] bg-[radial-gradient(circle,rgba(11,114,133,0.5)_0%,rgba(11,114,133,0.08)_68%,transparent_100%)]"></div>
        <div className="absolute left-[57%] top-[54%] w-[170px] h-[170px] rounded-full blur-[2px] bg-[radial-gradient(circle,rgba(159,18,57,0.56)_0%,rgba(159,18,57,0.08)_72%,transparent_100%)]"></div>
      </div>

      <div className="space-y-2">
        {[
          { k: "First signal", v: "22 Jan 2026 - 18:42" },
          { k: "Most recent linked event", v: "24 Jan 2026 - 09:26" },
          { k: "Time concentration", v: "18:00 - 01:00 local time" },
          { k: "Geographic spread", v: "2.4 km radius (masked grid)" },
        ].map((f) => (
          <div key={f.k} className="border border-line rounded-lg p-2.5 bg-white">
            <div className="text-[11px] text-muted">{f.k}</div>
            <div className="mt-1 text-sm text-ink">{f.v}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
