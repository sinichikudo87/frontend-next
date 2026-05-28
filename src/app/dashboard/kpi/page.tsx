import KPIDashboardPage from "@/components/ui/dashboard/kpi/dashboard";
import { getDashboardDataApi } from "../../../lib/crm/dashboard/view";

export const dynamic = "force-dynamic";

export default async function Page() {
  try {
    const response = await getDashboardDataApi();

    const data = response?.data ?? null;

    if (!data) throw new Error("No data");

    return <KPIDashboardPage data={data} />;
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);

    return (
      <div className="p-6 text-red-500">
        Gagal memuat data KPI dashboard
      </div>
    );
  }
}