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

export const handleWhatsappShare = (item: FollowUp) => {
  /* ================= GENERATE TOKEN ================= */
  const secureToken = encryptId(String(item.id));

  /* ================= URL ================= */

  const domainUrl =
    typeof window !== "undefined" ? window.location.origin : "";

  const negoUrl = `${domainUrl}/dashboard/crm/negosiasi?token=${secureToken}`;
  const pdfUrl = getPdfUrl(item.id);

  /* ================= DETAIL TEXT ================= */

  const detailText = item.details
    .map(
      (d) =>
        `🚘 *Unit:* ${d.category_name}
📌 *Qty:* ${d.qty}
💰 *Estimasi Biaya:* *Rp ${d.subtotal.toLocaleString("id-ID")}*`
    )
    .join("\n━━━━━━━━━━━━━━━\n");

  /* ================= MESSAGE ================= */

  const messageText = `Halo Kak *${item.customer}*, salam hangat! 👋

Kami ingin berbagi informasi bagi Kakak yang membutuhkan layanan transportasi premium. Berikut adalah salah satu penawaran unit terbaik yang kami sediakan:

━━━━━━━━━━━━━━━
📋 *DETAIL PENAWARAN*
━━━━━━━━━━━━━━━
${detailText}
━━━━━━━━━━━━━━━

💵 *TOTAL PENAWARAN:* 
*Rp ${item.total.toLocaleString("id-ID")}*

Rincian fasilitas lengkap dan pilihan armada lainnya dapat Kakak lihat melalui tautan di bawah ini:
🔗 ${pdfUrl}

💬 *Negosiasi & Penyesuaian Budget:*
Harga di atas masih bersifat *fleksibel (negotiable)*. Jika Kakak memiliki budget khusus atau ingin mengajukan negosiasi harga, silakan langsung klik tautan di bawah ini untuk berdiskusi atau mengajukan penawaran baru secara sistem:
👉 ${negoUrl}

Kami siap menyesuaikan layanan dengan kebutuhan spesifik Kakak. Jika berminat untuk reservasi atau konsultasi lebih lanjut, silakan hubungi kami kembali 😊

Terima kasih dan semoga sukses selalu! ✨`;

  const finalWhatsAppUrl = `https://wa.me/?text=${encodeURIComponent(messageText)}`;

  window.open(finalWhatsAppUrl, "_blank");
};