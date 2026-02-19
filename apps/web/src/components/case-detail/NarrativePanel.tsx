"use client";

import React, { useState } from "react";
import { Panel } from "./Panel";

export function NarrativePanel() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="border border-line rounded-2xl bg-panel overflow-hidden h-full">
      <div className="flex justify-between items-center px-3.5 py-3 border-b border-line bg-white/50">
        <h3 className="m-0 text-[12px] tracking-wide uppercase font-medium text-ink">
          Case Narrative
        </h3>
        <div className="flex gap-2">
          {["Overview", "Chronology", "Network", "Legal"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                activeTab === tab
                  ? "border-accent/35 bg-accent/10 text-[#0b5b6a]"
                  : "border-line bg-white text-[#51626b] hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3.5 space-y-3">
        <div className="border border-line rounded-xl bg-white p-3">
          <p className="text-sm leading-relaxed m-0 text-ink">
            This case clusters seven high-severity incidents with similar ignition signatures and temporal proximity
            within the same logistics district. Multi-source verification indicates repeating patterns in access points,
            transport traces, and witness overlap. Current confidence remains high while prosecution handoff is still pending.
          </p>
        </div>

        <div className="border border-line rounded-xl bg-white p-3">
          {[
            {
              title: "Initial emergency report",
              desc: "22 Jan - Fire signal and violence report received from emergency dispatch",
            },
            {
              title: "CCTV + witness merge complete",
              desc: "23 Jan - 6 camera segments and 4 witness logs linked into one event graph",
            },
            {
              title: "Pattern recurrency detected",
              desc: "24 Jan - Similar approach sequence detected in two additional nearby incidents",
            },
            {
              title: "Prepared for prosecution review",
              desc: "24 Jan - Case packet assembled, waiting for formal legal intake",
            },
          ].map((item, i) => (
            <div key={i} className="grid grid-cols-[18px_1fr] gap-2.5 py-2">
              <div className="w-3 h-3 mt-1 rounded-full bg-accent shadow-[0_0_0_4px_rgba(11,114,133,0.12)]"></div>
              <div>
                <strong className="block text-[13px] text-ink">{item.title}</strong>
                <span className="block text-[11px] text-muted mt-0.5">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-line rounded-xl bg-white overflow-hidden">
          {[
            {
              desc: "Thermal camera anomaly chain (5 clips)",
              meta: "Source: City surveillance / Normalized timestamps",
              score: "0.95",
            },
            {
              desc: "Witness statement cluster with route overlap",
              meta: "Source: Field reports / Cross-validated with mobility log",
              score: "0.88",
            },
            {
              desc: "Emergency call language pattern similarity",
              meta: "Source: Dispatch transcripts / NLP model confidence high",
              score: "0.91",
            },
          ].map((ev, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_auto] gap-2.5 p-3 border-b border-line last:border-b-0"
            >
              <div>
                <p className="m-0 text-[13px] text-ink">{ev.desc}</p>
                <div className="mt-1 text-[11px] text-muted">{ev.meta}</div>
              </div>
              <span className="border border-line rounded-full px-2 py-1 text-[11px] bg-[#f8faf8] text-ink h-fit">
                Reliability {ev.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
