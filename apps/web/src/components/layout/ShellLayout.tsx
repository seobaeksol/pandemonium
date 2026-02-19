import React from "react";
import { Topbar } from "./Topbar";

export function ShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[min(1400px,96vw)] mx-auto my-5 rounded-[20px] border border-white/60 bg-[#f8faf6]/88 shadow-[0_32px_70px_rgba(23,33,38,0.14),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md overflow-hidden min-h-[calc(100vh-40px)]">
      <Topbar />
      {children}
    </div>
  );
}
