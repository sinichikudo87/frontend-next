import EmployeeClient from "@/components/ui/dashboard/kpi/employees/employees-client";
import { getEmployee } from "../../../../lib/kpi/employees/view";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ================= TYPES ================= */
export type Employee = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  is_active: number;
};

export default async function Page() {
  let initialEmployees: Employee[] = [];

  try {
    const res = await getEmployee(1); 

    if (res?.success && Array.isArray(res.data)) {
      initialEmployees = res.data.map((item: any) => ({
        id: Number(item.id),
        name: item.name ?? "-",
        phone: item.telepon ?? "-",
        email: item.email ?? "-",
        address: item.address ?? "-",
        is_active: Number(item.is_active ?? 1),
      }));
    }
  } catch (err) {
    console.error("Gagal memuat data employee di server side:", err);
  }

  return <EmployeeClient initialData={initialEmployees} />;
}