import Swal from "sweetalert2";
import { createFollowUpLog, FollowUpLogPayload } from "./save";
import { encryptId } from "../../../lib/helpers/encrypt";

type UnitDetail = {
  category_name: string;
  qty: number;
  subtotal: number;
};

type FollowUp = {
  id: string | number;
  customer: string;
  total: number;
  details: UnitDetail[];
};

/* ================= PDF URL ================= */

const getPdfUrl = (id: string | number) => {
  const encryptedId = encryptId(String(id));

  return `${process.env.NEXT_PUBLIC_API_URL}/public/v1/followUps/dash_admin_crm_preview_penawaran/${encryptedId}`;
};

/* ================= WHATSAPP SHARE ================= */

export const handleWhatsappShare = async (
  item: FollowUp,
  stepLabel: string,
  onSuccess?: () => void
) => {
  try {
    Swal.fire({
      title: "Mencatat Follow Up...",
      text: `Menyimpan data ${stepLabel} ke database`,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const payload: FollowUpLogPayload = {
      tender_id: String(item.id),
      followup_stage: stepLabel.replace(/\D/g, "") as any,
      followup_date: new Date().toISOString().split("T")[0],
      result: "pending",
      notes: `Follow up otomatis via WhatsApp (${stepLabel})`,
      next_action_plan:
        "Menunggu respon customer terkait penawaran",
    };

    await createFollowUpLog(payload);

    Swal.close();

    /* ================= GENERATE TOKEN ================= */
    const secureToken = encryptId(String(item.id));

    /* ================= URL ================= */

    const domainUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : "";

    const negoUrl =
      `${domainUrl}/dashboard/crm/negosiasi?token=${secureToken}`;

    const pdfUrl = getPdfUrl(item.id);

    /* ================= DETAIL TEXT ================= */

    const detailText = item.details
      .map(
        (d) =>
          `*Unit:* ${d.category_name}
*Qty:* ${d.qty}
*Estimasi:* *Rp ${d.subtotal.toLocaleString("id-ID")}*`
      )
      .join("\n-------------------------\n");

    /* ================= MESSAGE ================= */

    const messageText = `Halo Kak *${item.customer}*, salam hangat! 👋

Menghubungi kembali terkait penawaran layanan transportasi premium yang kami kirimkan sebelumnya.

-------------------------
📋 *DETAIL PENAWARAN*
-------------------------
${detailText}
-------------------------

💵 *TOTAL PENAWARAN:* *Rp ${item.total.toLocaleString("id-ID")}*

🔗 *Unduh PDF Penawaran:*
${pdfUrl}

💡 *Informasi Negosiasi:*
Apabila memerlukan negosiasi harga atau penyesuaian budget, Kakak bisa langsung mengajukan penawaran baru melalui tautan di bawah ini:

👉 ${negoUrl}

Terima kasih ✨`;

    const finalWhatsAppUrl =
      `https://wa.me/?text=${encodeURIComponent(messageText)}`;

    window.open(finalWhatsAppUrl, "_blank");

    if (onSuccess) {
      onSuccess();
    }

  } catch (err: any) {
    Swal.fire(
      "Gagal",
      err.message || "Gagal mencatat log ke sistem",
      "error"
    );
  }
};