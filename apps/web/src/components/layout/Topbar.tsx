import React from "react";

export function Topbar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3.5 items-center px-6 py-4.5 border-b border-line bg-gradient-to-b from-white/80 to-[#f8faf6]/75">
      <div className="flex items-center gap-3">
        <div className="w-[34px] h-[34px] rounded-lg shadow-lg bg-[conic-gradient(from_220deg,var(--accent),#2f8f8f,#f59e0b,var(--accent))] shadow-[#0d6b6b]/35"></div>
        <div>
          <h1 className="m-0 text-xl tracking-wide font-medium text-ink">
            Sentinel Pulse
          </h1>
          <p className="m-0 mt-0.5 text-xs text-muted">
            Public Safety Intelligence Platform
          </p>
        </div>
      </div>
      <input
        className="w-full md:w-[300px] px-3 py-2.5 border border-line rounded-xl text-[13px] bg-panel text-ink focus:outline-none focus:ring-2 focus:ring-accent/20"
        defaultValue="Seoul / Last 24h / High Severity"
      />
      <div className="inline-flex items-center gap-2 px-3 py-2.5 border border-line rounded-xl text-[13px] bg-panel text-ink">
        <span className="w-2 h-2 rounded-full bg-ok shadow-[0_0_0_5px_rgba(22,101,52,0.12)]"></span>
        Live ingest 12s ago
      </div>
    </div>
  );
}
