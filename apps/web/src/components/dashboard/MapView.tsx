import React from "react";

export function MapView() {
  return (
    <section className="relative overflow-hidden min-h-[460px] lg:min-h-[690px] border border-line rounded-2xl bg-panel backdrop-blur-sm">
      <div className="grid grid-cols-4 gap-2.5 p-3 border-b border-line">
        {[
          { k: "Events (24h)", v: "187" },
          { k: "High Severity", v: "31" },
          { k: "Hotspot Shift", v: "+12%" },
          { k: "Resolution Rate", v: "68%" },
        ].map((s) => (
          <div
            key={s.k}
            className="border border-line rounded-xl bg-panel-strong p-2.5"
          >
            <div className="text-[11px] text-muted">{s.k}</div>
            <div className="mt-1.5 text-xl font-semibold">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="absolute inset-[86px_12px_12px_12px] border border-line rounded-xl bg-[linear-gradient(0deg,rgba(255,255,255,0.7),rgba(255,255,255,0.7)),repeating-linear-gradient(90deg,rgba(13,107,107,0.08)_0px,rgba(13,107,107,0.08)_1px,transparent_1px,transparent_42px),repeating-linear-gradient(0deg,rgba(13,107,107,0.08)_0px,rgba(13,107,107,0.08)_1px,transparent_1px,transparent_42px),linear-gradient(145deg,#f7faf8_0%,#eef4f1_100%)]">
        <div className="absolute left-[18%] top-[18%] w-[170px] h-[170px] rounded-full blur-[2px] opacity-90 bg-[radial-gradient(circle,rgba(15,118,110,0.52)_0%,rgba(15,118,110,0.08)_70%,transparent_100%)]"></div>
        <div className="absolute left-[52%] top-[20%] w-[210px] h-[210px] rounded-full blur-[2px] opacity-90 bg-[radial-gradient(circle,rgba(217,119,6,0.52)_0%,rgba(217,119,6,0.07)_70%,transparent_100%)]"></div>
        <div className="absolute left-[34%] top-[48%] w-[240px] h-[240px] rounded-full blur-[2px] opacity-90 bg-[radial-gradient(circle,rgba(159,18,57,0.54)_0%,rgba(159,18,57,0.08)_70%,transparent_100%)]"></div>
        
        <div className="absolute left-[26px] bottom-[24px] border border-line bg-white/86 rounded-xl p-2.5 text-[11px] text-muted">
          Heat level by severity score
          <div className="mt-1.5 w-[180px] h-2 rounded-lg bg-gradient-to-r from-[#0f766e] via-[#d97706] to-[#9f1239]"></div>
        </div>
      </div>
    </section>
  );
}
