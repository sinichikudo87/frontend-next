"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import FormApprovalKeuangan from "@/components/forms/crm/internal-users/ApprovalsKeuangan";
import FormApprovalPurchasing from "@/components/forms/crm/internal-users/ApprovalsPurchasing";
import FormApprovalMarketing from "@/components/forms/crm/internal-users/ApprovalsMarketing";

function ApprovalContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "keuangan";

  return (
    <div className="w-full">

      {type === "keuangan" && (
        <section className="w-full animate-[fadeIn_0.3s_ease-out]">
          <FormApprovalKeuangan />
        </section>
      )}

      {type === "purchasing" && (
        <section className="w-full animate-[fadeIn_0.3s_ease-out]">
          <FormApprovalPurchasing />
        </section>
      )}

      {type === "marketing" && (
        <section className="w-full animate-[fadeIn_0.3s_ease-out]">
          <FormApprovalMarketing />
        </section>
      )}

    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#110030] text-white p-8">
          Loading Panel...
        </div>
      }
    >
      <ApprovalContent />
    </Suspense>
  );
}