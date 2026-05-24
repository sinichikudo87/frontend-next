"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import {
  User, 
  Calendar, 
  Tag, 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight,
  Receipt,
  Boxes,
  Percent
} from "lucide-react";
import { saveApproval } from "../../../../store/crm/approvals/save";
import { API_CONFIG } from "@/lib/config";

/* ================= TYPES ================= */
type ApprovalStatus = "pending" | "approved" | "rejected";

type BerkasItem = {
  id: number;
  namaDokumen: string;
  statusApproval: ApprovalStatus;
  catatanReject: string;
};

type ApprovalDetail = {
  penawaran_id: number;
  kode: string;
  tanggal: string;
  type_order: string;
  status: string;
  customer_name: string | null;
  customer_phone: string | null;
  user_name: string;

  details: {
    detail_id: number;
    category_name: string;
    qty: number;
    price: number;
    subtotal: number;
  }[];
};

export default function ApprovalsMarketing() {
  const searchParams = useSearchParams();
  const [approvalDetail, setApprovalDetail] = useState<ApprovalDetail | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [berkasList, setBerkasList] = useState<BerkasItem[]>([
    {
      id: 1,
      namaDokumen: "Divisi Marketing - Form Approval",
      statusApproval: "pending",
      catatanReject: "",
    },
  ]);

  /* ================= FETCH ================= */
  useEffect(() => {
    const encryptedId = searchParams.get("id");
    if (!encryptedId) return;

    const fetchData = async () => {
      try {
        const endpoint = `/public/v1/approvals/${encryptedId}`;
        const res = await fetch(
          `${API_CONFIG.BASE_URL}${endpoint}`
        );

        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Gagal load data");

        setApprovalDetail(json.data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Invalid Token",
          text: "Data approval tidak valid atau sudah expired",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#f43f5e"
        });
      }
    };

    fetchData();
  }, [searchParams]);

  /* ================= LOADING STATE ================= */
  if (!approvalDetail) {
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-white bg-slate-950 relative overflow-hidden px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-fuchsia-500/10 rounded-full blur-[100px]" />
        <div className="relative flex items-center justify-center h-14 w-14">
          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></div>
          <div className="relative inline-flex rounded-full h-10 w-10 bg-gradient-to-tr from-fuchsia-600 to-indigo-500 shadow-lg"></div>
        </div>
        <p className="text-slate-400 font-medium text-xs tracking-widest text-center animate-pulse uppercase">
          Memuat Data Marketing...
        </p>
      </div>
    );
  }

  /* ================= HANDLER ================= */
  const handleSetApproval = (id: number, status: ApprovalStatus) => {
    setBerkasList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              statusApproval: status,
              catatanReject: status === "approved" ? "" : item.catatanReject,
            }
          : item
      )
    );
  };

  const handleCatatanRejectChange = (id: number, value: string) => {
    setBerkasList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, catatanReject: value } : item))
    );
  };

  /* ================= SUBMIT ================= */
  const handleSubmitSelesai = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const invalid = berkasList.some(
        (i) =>
          i.statusApproval === "rejected" &&
          !i.catatanReject.trim()
      );
  
      if (invalid) {
        Swal.fire({
          icon: "warning",
          title: "Catatan Wajib Diisi",
          text: "Silakan isi alasan penolakan terlebih dahulu.",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#f59e0b",
        });
  
        return;
      }
  
      const hasPending = berkasList.some(
        (i) => i.statusApproval === "pending"
      );
  
      if (hasPending) {
        Swal.fire({
          icon: "warning",
          title: "Approval Belum Dipilih",
          text: "Silakan pilih approve atau reject terlebih dahulu.",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#f59e0b",
        });
  
        return;
      }
  
      try {
        setIsSubmitting(true);
  
        /* ================= FINAL STATUS ================= */
        const finalStatus = berkasList.some(
          (i) => i.statusApproval === "rejected"
        )
          ? "rejected"
          : "approved";
  
        const rejectNotes = berkasList
          .filter((i) => i.statusApproval === "rejected")
          .map((i) => i.catatanReject)
          .join(" | ");
  
        /* ================= PAYLOAD ================= */
        const payload = {
          tender_id: approvalDetail.penawaran_id,
          approval_role: "manager_marketing" as const,
          approver_id: 1,
          status: finalStatus as
            | "approved"
            | "rejected"
            | "pending",
          notes:
            finalStatus === "rejected"
              ? rejectNotes
              : "Approved by Manager Marketing",
          sequence: 1,
        };
  
        /* ================= SAVE ================= */
        const result = await saveApproval(payload);
  
        /* ================= WHATSAPP ================= */
        const detailText = approvalDetail.details
          .map(
            (d) =>
              `🚘 *${d.category_name}*
  Qty : ${d.qty}
  Subtotal : *Rp ${Number(
                d.subtotal
              ).toLocaleString("id-ID")}*`
          )
          .join("\n━━━━━━━━━━━━━━━\n");
  
        const message = encodeURIComponent(
          `📋 *APPROVAL MARKETING*
  
  Kode:
  *${approvalDetail.kode}*
  
  Customer:
  *${approvalDetail.customer_name ?? "General Customer"}*
  
  ━━━━━━━━━━━━━━━
  ${detailText}
  ━━━━━━━━━━━━━━━
  
  💰 *TOTAL*
  Rp ${totalHarga.toLocaleString("id-ID")}
  
  📌 STATUS:
  *${finalStatus.toUpperCase()}*
  
  ${finalStatus === "rejected"
            ? `❌ Catatan:
  ${rejectNotes}`
            : "✅ Penawaran disetujui."
          }`
        );
  
        const phone =
          approvalDetail.customer_phone?.replace(/^0/, "62");
  
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text:
            result.message ||
            "Approval berhasil disimpan",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#10b981",
          showCancelButton: true,
          confirmButtonText: "Share WhatsApp",
          cancelButtonText: "Tutup",
        }).then((res) => {
          if (res.isConfirmed && phone) {
            window.open(
              `https://wa.me/${phone}?text=${message}`,
              "_blank"
            );
          } else {
            // tutup halaman
            window.close();

            // fallback jika window.close tidak bisa
            setTimeout(() => {
              window.location.href = "/";
            }, 300);
          }
        });
      } catch (err: any) {
        console.error(err);
  
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text:
            err.message ||
            "Terjadi kesalahan saat menyimpan approval",
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
      } finally {
        setIsSubmitting(false);
      }
    };

  const totalHarga = approvalDetail.details.reduce(
    (sum, item) => sum + Number(item.subtotal),
    0
  );

  /* ================= UI RENDERING ================= */
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 p-3 sm:p-6 md:p-8 relative overflow-x-hidden selection:bg-fuchsia-500/30">
      
      <div className="absolute w-[60%] h-[40%] bg-[linear-gradient(to_right,_#160040,_#9A0680)] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 relative z-10">
        
        {/* TOP BADGE */}
        <div className="flex justify-center sm:justify-start">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-500/10 to-indigo-500/10 border border-fuchsia-500/20 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-fuchsia-300 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
            Approval Marketing
          </span>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-xl space-y-5">
          
          {/* Client Name & ID Code */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4 sm:pb-5">
            <div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mb-0.5">Nama Customer</p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                {approvalDetail.customer_name ?? "General Customer"}
              </h1>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 sm:py-2 rounded-xl self-start sm:self-center">
              <span className="text-[9px] text-slate-400 block font-medium uppercase tracking-wider">Kode Penawaran</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-fuchsia-400 tracking-wide">{approvalDetail.kode}</span>
            </div>
          </div>

          {/* METADATA GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/[0.01] border border-white/[0.04] p-3 rounded-xl sm:rounded-2xl">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                <Calendar className="w-3 h-3 text-fuchsia-400" />
                <span>Tanggal</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-200">{approvalDetail.tanggal}</p>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                <Tag className="w-3 h-3 text-indigo-400" />
                <span>Type Order</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 capitalize">{approvalDetail.type_order}</p>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                <User className="w-3 h-3 text-sky-400" />
                <span>Marketing</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 truncate">{approvalDetail.user_name}</p>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                <span>Status</span>
              </div>
              <div>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <svg className="animate-spin h-2.5 w-2.5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  pending
                </span>
              </div>
            </div>
          </div>

          {/* ITEMS LIST / TABLE */}
          <div className="space-y-2.5">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide flex items-center gap-2">
              <Receipt className="w-3.5 h-3.5 text-slate-400" /> Detail Item Penawaran
            </h3>
            
            {/* TAMPILAN MOBILE: Card List */}
            <div className="block md:hidden space-y-2">
              {approvalDetail.details.map((d) => (
                <div key={d.detail_id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-xs font-bold text-slate-200">{d.category_name}</p>
                    <span className="text-[10px] bg-white/[0.05] text-slate-300 px-2 py-0.5 rounded-md font-mono">
                      Qty: {d.qty}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] pt-1 border-t border-white/[0.04]">
                    <span className="text-slate-500">Harga Satuan:</span>
                    <span className="text-slate-300 font-mono">Rp {Number(d.price).toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Subtotal:</span>
                    <span className="text-amber-400 font-bold font-mono">Rp {Number(d.subtotal).toLocaleString("id-ID")}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* TAMPILAN DESKTOP: Tabel Tradisional */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-white/[0.06] bg-black/20">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02] text-slate-400 text-xs font-semibold tracking-wider uppercase">
                    <th className="text-left p-4">Nama Unit / Kategori</th>
                    <th className="text-center p-4 w-20">Qty</th>
                    <th className="text-right p-4">Harga Satuan</th>
                    <th className="text-right p-4">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {approvalDetail.details.map((d) => (
                    <tr key={d.detail_id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 font-medium text-slate-200">{d.category_name}</td>
                      <td className="text-center p-4 text-slate-300 font-mono">{d.qty}</td>
                      <td className="text-right p-4 text-slate-400 font-mono">Rp {Number(d.price).toLocaleString("id-ID")}</td>
                      <td className="text-right p-4 text-amber-400 font-bold font-mono">Rp {Number(d.subtotal).toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SUMMARY TOTAL */}
          <div className="flex justify-between sm:justify-end items-center bg-gradient-to-r from-white/[0.01] to-white/[0.03] p-3 sm:p-4 rounded-xl border border-white/[0.04]">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider sm:hidden">
              <Percent className="w-4 h-4" />
              <span>Total Nilai</span>
            </div>
            <div className="text-right space-y-0.5">
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase hidden sm:block">Total Nilai Penawaran</span>
              <p className="text-xl sm:text-2xl md:text-3xl font-black text-amber-400 font-mono tracking-tight">
                Rp {totalHarga.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

        </div>

        {/* DECISION FORM */}
        <form onSubmit={handleSubmitSelesai} className="space-y-3 sm:space-y-4">
          {berkasList.map((item) => {
            const isApproved = item.statusApproval === "approved";
            const isRejected = item.statusApproval === "rejected";

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 backdrop-blur-md shadow-md ${
                  isApproved 
                    ? "border-emerald-500/20 bg-emerald-950/10" 
                    : isRejected 
                    ? "border-red-500/20 bg-red-950/10" 
                    : "border-white/[0.06] bg-black/40"
                } space-y-3.5`}
              >
                {/* Header Info */}
                <div className="flex items-start gap-2.5 text-slate-200">
                  <Boxes className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isApproved ? 'text-emerald-400' : isRejected ? 'text-red-400' : 'text-fuchsia-400'}`} />
                  <div className="w-full">
                    <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Verifikasi Komersial</span>
                    <p className="font-bold text-xs sm:text-sm tracking-wide text-white">{item.namaDokumen}</p>
                  </div>
                </div>

                {/* Tombol Keputusan */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleSetApproval(item.id, "approved")}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs tracking-wide transition-all duration-150 border ${
                      isApproved
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10 border-emerald-400"
                        : "bg-white/[0.02] text-slate-300 border-white/[0.05] active:bg-emerald-500/20"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSetApproval(item.id, "rejected")}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs tracking-wide transition-all duration-150 border ${
                      isRejected
                        ? "bg-red-500 text-white shadow-md shadow-red-500/10 border-red-400"
                        : "bg-white/[0.02] text-slate-300 border-white/[0.05] active:bg-red-500/20"
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject
                  </button>
                </div>

                {/* Textarea Alasan Reject */}
                {isRejected && (
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[10px] font-semibold tracking-wider uppercase text-red-300 block">
                      Alasan Penolakan <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={item.catatanReject}
                      onChange={(e) => handleCatatanRejectChange(item.id, e.target.value)}
                      placeholder="Masukkan alasan penolakan skema/diskon marketing..."
                      rows={3}
                      className="w-full p-3 rounded-xl bg-red-950/10 border border-red-500/30 outline-none text-xs text-red-100 placeholder:text-red-300/30 focus:border-red-500/60 transition-all resize-none"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* MAIN FORM ACTION BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-fuchsia-600 via-indigo-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 disabled:opacity-50 transition-all font-extrabold text-xs uppercase tracking-widest text-white shadow-lg flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            {isSubmitting ? (
              <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span>Submit Approval Marketing</span>
                <ArrowRight className="w-3.5 h-3.5 hidden sm:block" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}