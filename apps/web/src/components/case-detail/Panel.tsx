import React from "react";
import { Badge } from "./Badge";

interface PanelProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export function Panel({ title, badge, children, className = "" }: PanelProps) {
  return (
    <section className={`border border-line rounded-2xl bg-panel overflow-hidden ${className}`}>
      <div className="flex justify-between items-center px-3.5 py-3 border-b border-line bg-white/50">
        <h3 className="m-0 text-[12px] tracking-wide uppercase font-medium text-ink">
          {title}
        </h3>
        {badge && (
          <span className="border border-line rounded-full px-2 py-0.5 text-[10px] text-muted bg-white">
            {badge}
          </span>
        )}
      </div>
      <div className="p-3.5">{children}</div>
    </section>
  );
}
