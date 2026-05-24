import Swal from "sweetalert2";
import { encryptId } from "../../../lib/helpers/encrypt";

/* ================= TYPES ================= */

type UnitDetail = {
  kategori: string;
  qty: number | string;
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

/* ================= PDF URL ================= */

const getPdfUrl = (id: string | number) => {
  const encryptedId = encryptId(String(id));

  return `${process.env.NEXT_PUBLIC_API_URL}/public/v1/followUps/dash_admin_crm_preview_penawaran/${encryptedId}`;
};

/* ================= TARGET CONFIG ================= */

const targetConfig = {
  manager_purchasing: {
    label: "Manager Purchasing",
    type: "purchasing",
    purpose: "persetujuan pengadaan unit & vendor",
  },
  manager_finance: {
    label: "Manager Finance",
    type: "keuangan",
    purpose: "verifikasi dan persetujuan aspek keuangan",
  },
  manager_marketing: {
    label: "Manager Marketing",
    type: "marketing",
    purpose: "persetujuan marketing & penawaran ke customer",
  },
};

/* ================= WHATSAPP SHARE ================= */

export const handleWhatsappShare = async (
  item: Approval,
  target: keyof typeof targetConfig
) => {
  try {
    Swal.fire({
      title: "Mengirim Permintaan Approval...",
      text: "Mengirim pengajuan approval ke atasan terkait untuk persetujuan.",
      background: "#0f172a",
      color: "#fff",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const config = targetConfig[target];
    const encryptedId = encryptId(String(item.id));

    const domain =
      typeof window !== "undefined" ? window.location.origin : "";

    /* ================= FIXED APPROVAL LINK ================= */
    const approvalUrl =
`${window.location.origin}/dashboard/crm/approvals-users?type=${config.type}&id=${encryptedId}`;

    const pdfUrl = getPdfUrl(item.kode);

    const detailText = item.details
      .map(
        (d) => `🚘 Unit: ${d.kategori}
📦 Qty: ${d.qty}
💰 Harga: Rp ${Number(d.harga).toLocaleString("id-ID")}
🧾 Subtotal: Rp ${Number(d.subtotal).toLocaleString("id-ID")}`
      )
      .join("\n━━━━━━━━━━━━━━\n");

    const messageText = `Halo *${config.label}* 👋

Mohon persetujuan atas pengajuan approval berikut.

Tujuan: *${config.purpose}*

━━━━━━━━━━━━━━━━━━
ID: ${item.id}
Customer: ${item.customer}
Tanggal: ${item.tanggal}

${detailText}

━━━━━━━━━━━━━━━━━━
TOTAL: Rp ${item.total.toLocaleString("id-ID")}
━━━━━━━━━━━━━━━━━━

Dokumentasi: ${item.documentation}

PDF:
${pdfUrl}

Approval Link:
${approvalUrl}

Terima kasih 🙏`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(messageText)}`;

    Swal.close();
    window.open(waUrl, "_blank");
  } catch (err: any) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: err.message || "Gagal mengirim WhatsApp",
      background: "#0f172a",
      color: "#fff",
    });
  }
};