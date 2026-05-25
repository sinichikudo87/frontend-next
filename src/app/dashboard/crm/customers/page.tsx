import FormCustomers from "@/components/ui/dashboard/crm/customers/customers-client";
import { getCustomer } from "../../../../lib/crm/customers/view";

// 1. Definisikan atau import tipe Customer yang sama dengan Client Component
type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  is_active: number;
};

export const dynamic = "force-dynamic";

export default async function Page() {
  // 2. Berikan tipe data secara eksplisit pada array kosongnya
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
    console.error("Gagal memuat data di server:", err);
  }

  // Sekarang TypeScript dijamin aman dan tidak akan error saat data dilempar ke sini
  return <FormCustomers initialData={initialCustomers} />;
}