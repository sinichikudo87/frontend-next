import TendersKlient from "@/components/ui/dashboard/crm/tenders/tenders-client";
import { getTender } from "../../../../lib/crm/tenders/view";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ================= TYPES ================= */
type UnitStatus = "pengajuan" | "approval" | "rejected";

type UnitDetail = {
  detail_id: number;
  category_id: number;
  category_name: string;
  qty: number;
  price_per_unit: number;
  subtotal: number;
  statusPenawaranDetails: UnitStatus;
};

export type Penawaran = {
  id: string;
  kode: string;
  customer: string;
  tanggal: string;
  total: number;
  status_penawaran: UnitStatus;
  details: UnitDetail[];
};

export default async function Page() {
  let initialTenders: Penawaran[] = [];

  try {    
    const res = await getTender(1);

    if (res?.success && Array.isArray(res.data)) {
      initialTenders = res.data.map((item: any) => ({
        id: String(item.id),
        kode: item.kode ?? "-",
        customer: item.customer_name ?? "-",
        tanggal: item.tanggal ?? new Date().toISOString(),
        total: Number(item.total_harga || 0),
        status_penawaran: item.status_penawaran ?? item.statusPenawaran ?? "pengajuan",
        details: (item.details || []).map((d: any) => ({
          detail_id: Number(d.detail_id),
          category_id: d.category_id,
          category_name: d.category_name ?? "-",
          qty: Number(d.qty || 0),
          price_per_unit: Number(d.price_per_unit || 0),
          subtotal: Number(d.subtotal || 0),
          statusPenawaranDetails: d.statusPenawaranDetails ?? "pengajuan",
        })),
      }));
    }
  } catch (err) {
    console.error("Gagal memuat data tender pada Server-Side Rendering:", err);
  }

  return <TendersKlient initialData={initialTenders} />;
}