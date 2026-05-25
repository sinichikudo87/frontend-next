"use client";

import React, { useEffect, useState } from "react";
import {
  History,
  TrendingUp,
  Car,
  User,
  Send,
  MessageSquare,
  DollarSign,
  FileText,
  Clock,
  Layers,
  CheckCircle2,
} from "lucide-react";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import { API_CONFIG } from "@/lib/config";

type RentalDetailItem = {
  detail_id: number;
  category_name: string;
  qty: number;
  price: number;
  subtotal: number;
};

type LogNegosiasi = {
  id: number;
  tenders_id: number;
  sesi: number;
  harga_marketing: number;
  catatan_marketing: string;
  harga_customer: number;
  catatan_customer: string;
  harga_deal: number;
  status_negosiasi: string;
};

type RentalData = {
  penawaran_id: number;
  kode: string;
  tanggal: string;
  type_order: string;
  status: string;
  customer_name: string;
  customer_phone: string;
  user_name: string;
  details: RentalDetailItem[];
  logs: LogNegosiasi[];
};

export default function DetailRentalNegosiasi() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rentalData, setRentalData] = useState<RentalData | null>(null);

  const [hargaNegoBaru, setHargaNegoBaru] = useState<number>(0);
  const [catatanBaru, setCatatanBaru] = useState<string>("");

  const bubbles = [
    { size: "w-12 h-12 md:w-16 md:h-16", left: "left-[8%]", delay: "0s", duration: "12s" },
    { size: "w-16 h-16 md:w-24 md:h-24", left: "left-[25%]", delay: "2s", duration: "16s" },
    { size: "w-8 h-8 md:w-12 md:h-12", left: "left-[45%]", delay: "1s", duration: "10s" },
    { size: "w-20 h-20 md:w-28 md:h-28", left: "left-[60%]", delay: "4s", duration: "20s" },
    { size: "w-14 h-14 md:w-20 md:h-20", left: "left-[75%]", delay: "1.5s", duration: "14s" },
    { size: "w-16 h-16 md:w-24 md:h-24", left: "left-[90%]", delay: "6s", duration: "18s" },
  ];

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const encryptedId = searchParams.get("id");
        if (!encryptedId) return;

        const res = await fetch(
          `${API_CONFIG.BASE_URL}/public/v1/tenders/negotiation-form/${encryptedId}`
        );
        const result = await res.json();

        if (result?.success && result?.data) {
          setRentalData({
            ...result.data,
            logs: result.data.logs || []
          });
        }
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [searchParams]);

  const handleKirimWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rentalData) return;

    try {

      /* ================= GENERATE TOKEN ================= */
      const encryptedId = searchParams.get("id");

      /* ================= URL ================= */
      const domainUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : "";

      const negoUrl =
        `${domainUrl}/dashboard/crm/negosiasi` +
        `?id=${encryptedId}` +
        `&type=customer`;

      /* ================= STORE NEGOTIATION ================= */
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/public/v1/tenders/store`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            tender_id: encryptedId,
            request_by: "customer",
            marketing_price: null,
            marketing_note: null,
            customer_price: hargaNegoBaru,
            customer_note: catatanBaru,
            deal_price: null,
            negotiation_status: "ongoing",
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        alert(result.message || "Gagal menyimpan negosiasi");
        return;
      }

      /* ================= FORMAT WHATSAPP ================= */
      const textWA =
        `*PENAWARAN NEGO RENTAL MOBIL*%n` +
        `---------------------------------%n` +
        `*Kode:* ${rentalData.kode}%n` +
        `*Customer:* ${rentalData.customer_name}%n` +
        `*Pengajuan Harga Nego Baru:* Rp ${hargaNegoBaru.toLocaleString("id-ID")}%n` +
        `*Catatan:* ${catatanBaru || "-"}%n%n` +
        `Silakan buka link berikut untuk melakukan negosiasi:%n` +
        `${negoUrl}`;

        const urlFormat = textWA.replace(/%n/g, "%0A");

        window.open(
          `https://wa.me/?text=${urlFormat}`,
          "_blank"
        );

    } catch (error) {

      console.error(error);

      alert("Terjadi kesalahan saat mengirim negosiasi");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_right,_#160040,_#9A0680)]">
        <div className="text-white text-sm animate-pulse">Loading detail negosiasi...</div>
      </div>
    );
  }

  if (!rentalData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_right,_#160040,_#9A0680)]">
        <div className="text-white text-sm">Data tidak ditemukan atau tautan tidak valid.</div>
      </div>
    );
  }
  
  const totalUnitCost = rentalData.details.reduce((sum, item) => sum + item.subtotal, 0);

  const handleDealNego = async () => {
    if (!rentalData) return;

    let hargaTerakhirCustomer = 0;
    if (rentalData.logs && rentalData.logs.length > 0) {
      const lastLog = rentalData.logs[rentalData.logs.length - 1];
      hargaTerakhirCustomer = lastLog.harga_marketing;
    } else {
      hargaTerakhirCustomer = totalUnitCost;
    }

    const konfirmasi = await Swal.fire({
      title: "Konfirmasi Deal Harga",
      html: `Apakah Anda yakin ingin menyetujui penawaran ini dengan harga <br><b class="text-emerald-500 text-lg">Rp ${hargaTerakhirCustomer.toLocaleString("id-ID")}</b>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Ya, Setuju!",
      cancelButtonText: "Batal",
      background: "#2e1065",
      color: "#ffffff"
    });

    if (!konfirmasi.isConfirmed) return;

    try {
      const encryptedId = searchParams.get("id");
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/public/v1/tenders/update-deal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tender_id: encryptedId,
            deal_price: hargaTerakhirCustomer,
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        Swal.fire({
          title: "Gagal!",
          text: result.message || "Gagal memproses persetujuan deal.",
          icon: "error",
          background: "#2e1065",
          color: "#ffffff"
        });
        return;
      }

      setShowSuccessAnimation(true);
      setTimeout(() => {
        router.push(`/dashboard/crm/uploads-document?id=${encryptedId}`);
      }, 3000);

    } catch (error) {
      console.error("Error saat memproses deal:", error);
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat memproses persetujuan harga.",
        icon: "error",
        background: "#2e1065",
        color: "#ffffff"
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(to_right,_#160040,_#9A0680)] relative overflow-hidden pb-12 px-3 md:px-0">

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.7); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translateY(-110vh) scale(1.3); opacity: 0; }
        }
        .bubble-element {
          position: fixed;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          top: 100vh;
          animation-name: floatUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-fuchsia-500/20 blur-[100px] md:blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-violet-500/20 blur-[100px] md:blur-[140px]" />

      {/* Floating Bubbles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble, index) => (
          <div key={index} className={`bubble-element ${bubble.size} ${bubble.left}`} style={{ animationDelay: bubble.delay, animationDuration: bubble.duration }} />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto pt-6 md:pt-8 space-y-6">

        {/* 1. HEADER DATA UTAMA */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5 md:p-8 shadow-2xl shadow-black/30">
          <div className="relative space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-start md:items-center gap-3 md:gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center shadow-lg shrink-0">
                  <Car className="w-5 md:w-6 h-5 md:h-6 text-fuchsia-300" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-fuchsia-300 font-bold bg-fuchsia-500/10 px-2 py-0.5 rounded-md border border-fuchsia-500/20">
                    {rentalData.kode}
                  </span>
                  <h1 className="text-base md:text-2xl font-black text-white tracking-tight leading-tight">
                    Tipe Order: {rentalData.type_order}
                  </h1>
                </div>
              </div>
              <div className="self-start md:self-auto">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-[11px] font-bold bg-emerald-500/10 border border-emerald-400/30 text-emerald-400">
                  <History className="w-3 h-3" />
                  {rentalData.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-sm text-white/80">
              <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                <User className="w-4 h-4 text-white/40 shrink-0" />
                <div>
                  <p className="text-[9px] md:text-[10px] text-white/40 uppercase font-bold tracking-wider">Penyewa / Korporat</p>
                  <p className="font-semibold text-white break-all">{rentalData.customer_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                <Clock className="w-4 h-4 text-white/40 shrink-0" />
                <div>
                  <p className="text-[9px] md:text-[10px] text-white/40 uppercase font-bold tracking-wider">Tanggal Order</p>
                  <p className="font-semibold text-white">{rentalData.tanggal}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                <MessageSquare className="w-4 h-4 text-white/40 shrink-0" />
                <div>
                  <p className="text-[9px] md:text-[10px] text-white/40 uppercase font-bold tracking-wider">Marketing PIC</p>
                  <p className="font-semibold text-white truncate">{rentalData.user_name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. TABEL RINCIAN UNIT (DETAILS) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1 text-white/80">
            <Layers className="w-4 h-4 text-fuchsia-400" />
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">Rincian Item Unit</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl md:rounded-3xl border border-white/10 bg-black/30 backdrop-blur-2xl shadow-xl">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-black/40 text-[10px] md:text-[11px] uppercase tracking-wider text-white/70 font-bold">
                  <th className="p-4">Kategori Unit</th>
                  <th className="p-4 text-center">Jumlah (Qty)</th>
                  <th className="p-4">Harga Satuan</th>
                  <th className="p-4">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/90">
                {rentalData.details.map((item) => (
                  <tr key={item.detail_id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium text-fuchsia-300">{item.category_name}</td>
                    <td className="p-4 text-center">{item.qty}</td>
                    <td className="p-4">Rp {item.price.toLocaleString("id-ID")}</td>
                    <td className="p-4 font-bold text-white">Rp {item.subtotal.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
                <tr className="bg-black/20 font-bold text-emerald-400">
                  <td colSpan={3} className="p-4 text-right text-white/60 text-xs font-normal uppercase">Total Awal Penawaran:</td>
                  <td className="p-4 text-sm md:text-base font-black">Rp {totalUnitCost.toLocaleString("id-ID")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. TABEL LOG NEGOSIASI HARGA (LOGS - DATA BARU) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1 text-white/80">
            <History className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">Riwayat Tawar-Menawar Harga (Log Negosiasi)</h2>
          </div>

          {/* TABLE DESKTOP / MOBILE CONTAINER */}
          <div className="overflow-x-auto rounded-2xl md:rounded-3xl border border-white/20 bg-black/50 backdrop-blur-2xl shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[800px] text-xs">
              <thead>
                <tr className="border-b-2 border-white/20 bg-black/70 text-[11px] uppercase tracking-wider text-white/90 font-black">
                  <th className="p-4 text-center w-24 border-r border-white/10">Sesi</th>
                  <th className="p-4 w-72 border-r border-white/10">Penawaran Marketing</th>
                  <th className="p-4 w-72 border-r border-white/10">Nego Penumpang / Customer</th>
                  <th className="p-4">Status & Nilai Deal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-white/[0.01]">
                {rentalData.logs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-white/40 italic">
                      Belum ada riwayat aktivitas negosiasi pada tender penawaran ini.
                    </td>
                  </tr>
                ) : (
                  rentalData.logs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors align-top">
                      <td className="p-4 text-center border-r border-white/10 font-black text-fuchsia-300 bg-black/10">
                        Sesi #{log.sesi}
                      </td>

                      <td className="p-4 border-r border-white/10 space-y-1">
                        <div className="text-sm font-medium text-white/90">
                          Rp {log.harga_marketing.toLocaleString("id-ID")}
                        </div>
                        <div className="text-[11px] text-white/40 italic bg-black/20 p-1.5 rounded border border-white/5">
                          "{log.catatan_marketing || "-"}"
                        </div>
                      </td>

                      <td className="p-4 border-r border-white/10 space-y-1">
                        <div className="text-sm font-bold text-fuchsia-300">
                          Rp {log.harga_customer.toLocaleString("id-ID")}
                        </div>
                        <div className="text-[11px] text-fuchsia-300/50 italic bg-fuchsia-500/5 p-1.5 rounded border border-fuchsia-500/5">
                          "{log.catatan_customer || "-"}"
                        </div>
                      </td>

                      <td className="p-4 space-y-2">
                        {log.harga_deal > 0 ? (
                          <span className="inline-block text-emerald-400 font-black bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                            🔒 DEAL: Rp {log.harga_deal.toLocaleString("id-ID")}
                          </span>
                        ) : (
                          <span className="inline-block text-amber-400 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            {log.status_negosiasi || "On Progress"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. FORM TIMBAL BALIK NEGO BARU */}
        <div className="rounded-2xl md:rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl p-4 md:p-6 shadow-2xl shadow-black/30">
          <form onSubmit={handleKirimWhatsApp} className="space-y-4">
            <div className="border-b border-white/10 pb-2 mb-3">
              <h3 className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Masukkan Respon / Nego Baru
              </h3>
              <p className="text-[11px] text-white/50">
                Ketik nominal harga tandingan baru agregat dan sertakan ketentuan kondisi operasional sewa.
              </p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
              <div className="space-y-1.5 lg:col-span-1">
                <label className="text-[10px] md:text-[11px] uppercase tracking-wider text-white/60 font-bold flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Harga Nego Baru (Total)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-emerald-400 font-bold">IDR</span>
                  <input
                    type="number"
                    value={hargaNegoBaru || ""}
                    onChange={(e) => setHargaNegoBaru(Number(e.target.value))}
                    placeholder="Contoh: 8100000"
                    required
                    className="w-full h-11 md:h-12 rounded-xl border border-emerald-500/30 bg-black/40 pl-11 pr-4 text-xs md:text-sm text-emerald-100 font-bold outline-none focus:border-emerald-400 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5 lg:col-span-2 flex flex-col justify-end">
                <label className="text-[10px] md:text-[11px] uppercase tracking-wider text-white/60 font-bold flex items-center gap-1.5 mb-1.5 lg:mb-0">
                  <FileText className="w-3.5 h-3.5 text-fuchsia-400" />
                  Catatan / Alasan Utama
                </label>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <input
                    type="text"
                    value={catatanBaru}
                    onChange={(e) => setCatatanBaru(e.target.value)}
                    placeholder="Contoh: Ajukan harga 8.1jt lepas tol..."
                    required
                    className="w-full h-11 md:h-12 rounded-xl border border-white/20 bg-black/40 px-4 text-xs md:text-sm text-white placeholder:text-white/30 outline-none focus:border-fuchsia-400 transition-all"
                  />

                  <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto shrink-0">
                    <button type="submit" className="h-11 px-5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer">
                      <Send className="w-3.5 h-3.5" />
                      Nego
                    </button>
                    <button
                      type="button"
                      onClick={handleDealNego}
                      className="h-11 px-5 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white hover:text-[#160040] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer group"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-600 shrink-0 transition-colors" />
                      <span>Deal</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* SUCCESS ANIMATION OVERLAY */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300">
          <style>{`
            @keyframes popIn { 0% { transform: scale(0.85); opacity: 0; } 70% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
            @keyframes circleBounce { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.15); } 80% { transform: scale(0.95); } 100% { transform: scale(1); opacity: 1; } }
            @keyframes fillBar { 0% { width: 0%; } 100% { width: 100%; } }
            .animate-pop-in { animation: popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
            .animate-circle-bounce { animation: circleBounce 0.5s 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
            .animate-fill-bar { animation: fillBar 1.8s ease-in-out forwards; }
          `}</style>
          <div className="relative bg-white/10 border border-white/20 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center overflow-hidden animate-pop-in">
            <div className="absolute -top-12 w-32 h-32 bg-emerald-500/30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-12 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-20 h-20 bg-emerald-500 rounded-full border-4 border-white/20 flex items-center justify-center shadow-lg shadow-emerald-500/40 mb-5 animate-circle-bounce">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">Deal Disetujui!</h3>
            <p className="text-xs text-white/60 font-medium leading-relaxed max-w-[240px] mx-auto">Menyiapkan form upload dokumen berkas sewa...</p>
            <div className="w-full h-1 bg-white/10 rounded-full mt-6 overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-fuchsia-400 rounded-full animate-fill-bar" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}