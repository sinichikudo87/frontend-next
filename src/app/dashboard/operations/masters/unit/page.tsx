import InvestorClient from "@/components/ui/dashboard/operations/masters/investors/investor-client";
import { getInvestor } from "../../../../../lib/operations/masters/investor/view";

type Investors = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  is_active: number;
};

export const dynamic = "force-dynamic";

export default async function Page() {
  let initialInvestors: Investors[] = [];

  try {
    const res = await getInvestor(1);

    if (res?.success && Array.isArray(res.data)) {
      initialInvestors = res.data.map((item: any) => ({
          id: Number(item.id),
          name: item.name ?? "-",
          phone: item.phone ?? "-",
          email: item.email ?? "-",
          address: item.address ?? "-",
          is_active: Number(item.is_active ?? 1),
      }));
    }
  } catch (err) {
    console.error("Gagal memuat data di server:", err);
  }

  return <InvestorClient initialData={initialInvestors} />;
}