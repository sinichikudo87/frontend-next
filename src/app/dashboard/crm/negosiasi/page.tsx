"use client";

import { useSearchParams } from "next/navigation";

import NegotiablePriceToCustomers from "@/components/forms/crm/client/NegotiablePriceToCustomers";
import NegotiablePriceToMarketing from "@/components/forms/crm/client/NegotiablePriceToMarketing";

export default function Page() {

  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  if (type === "marketing") {
    return <NegotiablePriceToCustomers />;
  }

  return <NegotiablePriceToMarketing />;
}