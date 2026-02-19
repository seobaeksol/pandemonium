import React from "react";
import { ShellLayout } from "@/components/layout/ShellLayout";
import { CaseHeader } from "@/components/case-detail/CaseHeader";
import { LocationSnapshotPanel } from "@/components/case-detail/LocationSnapshotPanel";
import { NarrativePanel } from "@/components/case-detail/NarrativePanel";
import { VerificationPanel } from "@/components/case-detail/VerificationPanel";

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  return (
    <ShellLayout>
      <CaseHeader id={params.id} />
      <div className="grid grid-cols-1 min-[1200px]:grid-cols-[300px_1fr_330px] gap-3.5 p-3.5">
        <LocationSnapshotPanel />
        <NarrativePanel />
        <VerificationPanel />
      </div>
    </ShellLayout>
  );
}
