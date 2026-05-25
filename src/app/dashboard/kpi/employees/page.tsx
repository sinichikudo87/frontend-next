import EmployeeClient from "@/components/ui/dashboard/kpi/employees/employees-client";
import { getCustomer } from "../../../../lib/crm/customers/view";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ================= TYPES ================= */
export type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  is_active: number;
};

export default async function Page() {
  let initialCustomers: Customer[] = [];

  try {
    const res = await getCustomer(1);

    if (res?.success && Array.isArray(res.data)) {
      initialCustomers = res.data.map((item: any) => ({
        id: Number(item.id),
        name: item.name ?? "-",
        phone: item.phone ?? "-",
        email: item.email ?? "-",
        address: item.address ?? "-",
        is_active: Number(item.is_active ?? 1),
      }));
    }
  } catch (err) {
    console.error("Gagal memuat data customer di server side:", err);
  }

  return <EmployeeClient initialData={initialCustomers} />;
}