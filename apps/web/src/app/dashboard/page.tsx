import React from "react";
import { ShellLayout } from "@/components/layout/ShellLayout";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { MapView } from "@/components/dashboard/MapView";
import { LiveFeed } from "@/components/dashboard/LiveFeed";

export default function DashboardPage() {
  return (
    <ShellLayout>
      <div className="grid grid-cols-1 xl:grid-cols-[270px_1fr_350px] gap-3.5 p-3.5">
        <FilterPanel />
        <MapView />
        <LiveFeed />
      </div>
    </ShellLayout>
  );
}
