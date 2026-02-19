import React from "react";

export function FilterPanel() {
  return (
    <section className="border border-line rounded-2xl bg-panel backdrop-blur-sm">
      <div className="flex justify-between items-center p-3.5 border-b border-line">
        <h3 className="m-0 text-[13px] tracking-wide uppercase font-medium">
          Filters
        </h3>
        <span className="border border-line rounded-full px-2.5 py-1 text-[11px] text-muted">
          4 active
        </span>
      </div>
      <div className="p-3 space-y-3.5">
        <div className="space-y-2">
          <div className="text-xs text-muted">Incident Type</div>
          <div className="flex flex-wrap gap-2">
            {["Violence", "Arson", "Theft", "Fraud", "Homicide"].map((t) => (
              <div
                key={t}
                className={`border rounded-lg px-2.5 py-1.5 text-xs ${
                  ["Violence", "Arson", "Homicide"].includes(t)
                    ? "border-accent/45 bg-accent/10"
                    : "border-line bg-panel-strong"
                }`}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted">Period</div>
          <div className="h-2 rounded-xl bg-[#eef3ee] relative">
            <div className="absolute left-[12%] right-[30%] top-0 bottom-0 rounded-xl bg-gradient-to-r from-[#0f766e] to-[#f59e0b]"></div>
          </div>
          <div className="flex justify-between text-[11px] text-muted mt-2">
            <span>2005</span>
            <span>2026</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted">Source Confidence</div>
          <div className="flex flex-wrap gap-2">
            <div className="border border-accent/45 bg-accent/10 rounded-lg px-2.5 py-1.5 text-xs">
              Verified only
            </div>
            <div className="border border-line bg-panel-strong rounded-lg px-2.5 py-1.5 text-xs">
              Include unverified
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted">Area</div>
          <div className="flex flex-wrap gap-2">
            <div className="border border-accent/45 bg-accent/10 rounded-lg px-2.5 py-1.5 text-xs">
              Seoul
            </div>
            {["Busan", "Incheon", "Daegu"].map((c) => (
              <div
                key={c}
                className="border border-line bg-panel-strong rounded-lg px-2.5 py-1.5 text-xs"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
