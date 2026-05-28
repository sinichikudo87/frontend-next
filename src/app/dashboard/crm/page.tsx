import CRMDashboardPage from "@/components/ui/dashboard/crm/dashboard";
import { getDashboardDataApi } from "../../../lib/crm/dashboard/view";

export const dynamic = "force-dynamic";

export default async function Page() {
  try {
    const response = await getDashboardDataApi();
    
    if (response && response.success) {
      return <CRMDashboardPage data={response.data} />;
    }
    
    throw new Error("Response data dari API tidak sukses");
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    return (
      <div className="p-6 text-red-500 bg-red-500/10 border border-red-500/20 rounded-2xl">
        Gagal memuat data dari server. Silakan coba beberapa saat lagi.
      </div>
    );
  }
}