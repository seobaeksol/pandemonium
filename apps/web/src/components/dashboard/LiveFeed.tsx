import React from "react";

export function LiveFeed() {
  return (
    <section className="border border-line rounded-2xl bg-panel backdrop-blur-sm">
      <div className="flex justify-between items-center p-3.5 border-b border-line">
        <h3 className="m-0 text-[13px] tracking-wide uppercase font-medium">
          Live Feed
        </h3>
        <span className="border border-line rounded-full px-2.5 py-1 text-[11px] text-muted">
          Updated now
        </span>
      </div>
      {[
        {
          tag: "High",
          tagClass: "text-danger border-danger/30 bg-danger/10",
          desc: "Violence cluster detected in central district (3 linked incidents)",
          meta: "11:22 | Verified source | Confidence 0.94",
          action: "Map",
        },
        {
          tag: "High",
          tagClass: "text-danger border-danger/30 bg-danger/10",
          desc: "Potential arson signal - warehouse block (investigation ongoing)",
          meta: "11:14 | Multi-source match | Confidence 0.89",
          action: "Track",
        },
        {
          tag: "Medium",
          tagClass: "text-[#55656f] border-line bg-white",
          desc: "Historic comparison alert: +18% violence trend vs same week last year",
          meta: "11:05 | Analytics model | Confidence 0.97",
          action: "Compare",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-[auto_1fr_auto] gap-2.5 p-3.5 border-b border-line last:border-b-0"
        >
          <span
            className={`text-[10px] tracking-wide uppercase rounded-full border px-2 py-1 ${item.tagClass}`}
          >
            {item.tag}
          </span>
          <div>
            <p className="m-0 text-[13px] leading-snug">{item.desc}</p>
            <div className="mt-1 text-[11px] text-muted">{item.meta}</div>
          </div>
          <span className="text-[10px] tracking-wide uppercase rounded-full border border-line px-2 py-1 bg-white text-[#55656f]">
            {item.action}
          </span>
        </div>
      ))}

      <div className="flex justify-between items-center p-3.5 border-b border-line mt-1.5">
        <h3 className="m-0 text-[13px] tracking-wide uppercase font-medium">
          Case Timeline
        </h3>
        <span className="border border-line rounded-full px-2.5 py-1 text-[11px] text-muted">
          Case #SP-2094
        </span>
      </div>
      <div className="p-3.5 pt-4 pb-4">
        {[
          {
            title: "Incident reported",
            desc: "22 Jan 2026 - 18:42, western logistics area",
          },
          {
            title: "Evidence correlation complete",
            desc: "23 Jan 2026 - 01:10, CCTV and witness data linked",
          },
          {
            title: "Case status updated",
            desc: "24 Jan 2026 - 09:26, prosecution review pending",
          },
        ].map((t, i) => (
          <div key={i} className="grid grid-cols-[18px_1fr] gap-2.5 py-2">
            <div className="w-3 h-3 mt-1 rounded-full bg-accent shadow-[0_0_0_4px_rgba(13,107,107,0.12)]"></div>
            <div>
              <strong className="block text-xs font-bold">{t.title}</strong>
              <span className="block text-[11px] text-muted mt-0.5">
                {t.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
