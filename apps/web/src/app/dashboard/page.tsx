import React from "react";
import { Topbar } from "@/components/layout/Topbar";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { MapView } from "@/components/dashboard/MapView";
import { LiveFeed } from "@/components/dashboard/LiveFeed";

export default function DashboardPage() {
  return (
    <div className="w-[min(1400px,96vw)] mx-auto my-5 rounded-[20px] border border-white/60 bg-[#f8faf6]/88 shadow-[0_32px_70px_rgba(23,33,38,0.14),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md overflow-hidden">
      <Topbar />
      <div className="grid grid-cols-1 xl:grid-cols-[270px_1fr_350px] gap-3.5 p-3.5">
        <FilterPanel />
        <MapView />
        <LiveFeed />
      </div>
    </div>
  );
}
