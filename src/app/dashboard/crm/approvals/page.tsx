import FormApprovals from "@/components/ui/dashboard/crm/approvals/approvals-client";
import { getApproval } from "../../../../lib/crm/approvals/view";

export const dynamic = "force-dynamic";

/* ================= TYPES ================= */

type UnitDetail = {
  kategori: string;
  qty: number;
  harga: number;
  subtotal: number;
};

export type Approval = {
  id: number;
  kode: string;
  customer: string;
  tanggal: string;
  total: number;
  documentation: string;
  details: UnitDetail[];
};

export default async function Page() {
  let initialApprovals: Approval[] = [];

  try {
    const res = await getApproval(1);

    if (res?.success && Array.isArray(res.data)) {
      initialApprovals = res.data.map((item: any) => ({
        id: item.id,
        kode: item.kode,
        customer: item.customer_name ?? "-",
        tanggal: item.tanggal,
        total: Number(item.total_harga || 0),
        documentation: "Quotation, NPWP, Company Profile",
        details: (item.details || []).map((d: any) => ({
          kategori: d.category_name,
          qty: Number(d.qty || 0),
          harga: Number(d.price_per_unit || 0),
          subtotal: Number(d.subtotal || 0),
        })),
      }));
    }
  } catch (err) {
    console.error("Gagal memuat data approval di server:", err);
  }

  return <FormApprovals initialData={initialApprovals} />;
}