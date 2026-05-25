import FollowUpClient from "@/components/ui/dashboard/crm/follow-up/follow-up-client";
import { getTender } from "../../../../lib/crm/follow-ups/view";

export const dynamic = "force-dynamic";

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

type FollowUpHistory = {
  followup_id: number;
  stage: "1" | "2" | "3" | "4" | "5";
  date: string;
  user_id: number | null;
  notes: string | null;
  result: "pending" | "responded" | "no_answer" | "rejected";
  next_action_plan: string | null;
  created_at: string;
};

type FollowUp = {
  id: string;
  kode: string;
  customer: string;
  tanggal: string;
  total: number;
  status_penawaran: UnitStatus;
  followup_history: FollowUpHistory[];
  details: UnitDetail[];
};

export default async function Page() {
  let initialFollowUpData: FollowUp[] = [];

  try {    
    const res = await getTender(1);

    if (res?.success && Array.isArray(res.data)) {
      initialFollowUpData = res.data.map((item: any) => ({
        id: item.id,
        kode: item.kode,
        customer: item.customer_name ?? "-",
        tanggal: item.tanggal,
        total: Number(item.total_harga || 0),
        status_penawaran: item.status_penawaran,
        followup_history: item.followup_history ?? [],
        details: (item.details || []).map((d: any) => ({
          detail_id: Number(d.detail_id),
          category_id: d.category_id,
          category_name: d.category_name,
          qty: Number(d.qty),
          price_per_unit: Number(d.price_per_unit),
          subtotal: Number(d.subtotal),
          statusPenawaranDetails: d.statusPenawaranDetails,
        })),
      }));
    }
  } catch (err) {
    console.error("Gagal melakukan SSR data Follow Up:", err);
  }

  return <FollowUpClient initialData={initialFollowUpData} />;
}