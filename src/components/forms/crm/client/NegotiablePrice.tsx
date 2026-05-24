"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

type LogNegosiasi = {
  sesi: number;
  harga_marketing: number;
  catatan_marketing: string;
  harga_customer: number;
  catatan_customer: string;
  harga_deal: number;
};

export default function DetailRentalNegosiasi() {
  const router = useRouter();
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const rentalDetail = {
    booking_id: "TRX-CAR-20260518",
    unit_mobil: "Toyota Alphard Transformer Facelift (2023)",
    customer: "PT. Global Tech (Contact: Ibu Siska)",
    durasi_paket: "3 Hari (Driver + BBM)",
    rute_tujuan: "Rute: Surabaya - Banyuwangi",
    status_saat_ini: "Nego Sesi Ke-5"
  };

  const historiNego: LogNegosiasi[] = [
    {
      sesi: 1,
      harga_marketing: 9000000,
      catatan_marketing: "Harga normal unit 2023, udah include driver + BBM ya kak.",
      harga_customer: 7500000,
      catatan_customer: "Minta harga partner/korporat dong, budget mentok di 7.5jt nih.",
      harga_deal: 0
    },
    {
      sesi: 2,
      harga_marketing: 8700000,
      catatan_marketing: "Paling net banget dari manajemen dikasih 8.7jt gimana?",
      harga_customer: 7800000,
      catatan_customer: "Up dikit deh ke 7.8jt, kalau dapet langsung kita payment.",
      harga_deal: 0
    },
    {
      sesi: 3,
      harga_marketing: 8500000,
      catatan_marketing: "Bantu naikin ke 8.5jt deh, free overtime up to 2 jam ya.",
      harga_customer: 8000000,
      catatan_customer: "Last offer di 8jt pas ya, biar bisa langsung approval internal.",
      harga_deal: 0
    },
    {
      sesi: 4,
      harga_marketing: 8250000,
      catatan_marketing: "Ok fix deal di tengah ya, Rp 8.250.000 total.",
      harga_customer: 8250000,
      catatan_customer: "Ok! GASS BRO.",
      harga_deal: 8250000
    },
  ];

  const [hargaNegoBaru, setHargaNegoBaru] = useState<number>(0);
  const [catatanBaru, setCatatanBaru] = useState<string>("");

  // Konfigurasi posisi kiri, ukuran, delay, dan durasi bubble
  const bubbles = [
    { size: "w-12 h-12 md:w-16 md:h-16", left: "left-[8%]", delay: "0s", duration: "12s" },
    { size: "w-16 h-16 md:w-24 md:h-24", left: "left-[25%]", delay: "2s", duration: "16s" },
    { size: "w-8 h-8 md:w-12 md:h-12", left: "left-[45%]", delay: "1s", duration: "10s" },
    { size: "w-20 h-20 md:w-28 md:h-28", left: "left-[60%]", delay: "4s", duration: "20s" },
    { size: "w-14 h-14 md:w-20 md:h-20", left: "left-[75%]", delay: "1.5s", duration: "14s" },
    { size: "w-16 h-16 md:w-24 md:h-24", left: "left-[90%]", delay: "6s", duration: "18s" },
  ];

  const handleKirimWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const textWA = `*PENAWARAN NEGO RENTAL MOBIL*%n` +
      `---------------------------------%n` +
      `*Booking ID:* ${rentalDetail.booking_id}%n` +
      `*Unit Mobil:* ${rentalDetail.unit_mobil}%n` +
      `*Pengajuan Harga Nego Baru:* Rp ${hargaNegoBaru.toLocaleString("id-ID")}%n` +
      `*Catatan:* ${catatanBaru || "-"}`;

    const urlFormat = textWA.replace(/%n/g, "%0A");
    window.open(`https://wa.me/628123456789?text=${urlFormat}`, "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(to_right,_#160040,_#9A0680)] relative overflow-hidden pb-12 px-3 md:px-0">

      {/* TRICK BARU: FIXED POSITION + CONTRAST UP */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.7);
            opacity: 0;
          }
          15% {
            opacity: 0.6;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-110vh) scale(1.3);
            opacity: 0;
          }
        }
        .bubble-element {
          position: fixed; /* Berubah jadi fixed biar nempel di viewport layar */
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05); /* Sedikit lebih tebal */
          border: 1.5px solid rgba(255, 255, 255, 0.12); /* Lebih kelihatan */
          top: 100vh; /* Mulai dari bawah layar browser */
          animation-name: floatUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-fuchsia-500/20 blur-[100px] md:blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-violet-500/20 blur-[100px] md:blur-[140px]" />

      {/* RENDER GELEMBUNG (FIXED BACKGROUND) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            className={`bubble-element ${bubble.size} ${bubble.left}`}
            style={{
              animationDelay: bubble.delay,
              animationDuration: bubble.duration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto pt-6 md:pt-8 space-y-6">

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-5 md:p-8 shadow-2xl shadow-black/30">
          <div className="relative space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-start md:items-center gap-3 md:gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center shadow-lg shrink-0">
                  <Car className="w-5 md:w-6 h-5 md:h-6 text-fuchsia-300" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-fuchsia-300 font-bold bg-fuchsia-500/10 px-2 py-0.5 rounded-md border border-fuchsia-500/20">
                    {rentalDetail.booking_id}
                  </span>
                  <h1 className="text-base md:text-2xl font-black text-white tracking-tight leading-tight">
                    {rentalDetail.unit_mobil}
                  </h1>
                </div>
              </div>
              <div className="self-start md:self-auto">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-[11px] font-bold bg-emerald-500/10 border border-emerald-400/30 text-emerald-400">
                  <History className="w-3 h-3" /> {rentalDetail.status_saat_ini}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-sm text-white/80">
              <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                <User className="w-4 h-4 text-white/40 shrink-0" />
                <div>
                  <p className="text-[9px] md:text-[10px] text-white/40 uppercase font-bold tracking-wider">Penyewa / Korporat</p>
                  <p className="font-semibold text-white break-all">{rentalDetail.customer}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                <Clock className="w-4 h-4 text-white/40 shrink-0" />
                <div>
                  <p className="text-[9px] md:text-[10px] text-white/40 uppercase font-bold tracking-wider">Durasi & Paket Sewa</p>
                  <p className="font-semibold text-white">{rentalDetail.durasi_paket}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                <MessageSquare className="w-4 h-4 text-white/40 shrink-0" />
                <div>
                  <p className="text-[9px] md:text-[10px] text-white/40 uppercase font-bold tracking-wider">Rute & Tujuan</p>
                  <p className="font-semibold text-white truncate">{rentalDetail.rute_tujuan}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LOG KRONOLOGI / HISTORI */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1 text-white/80">
            <Layers className="w-4 h-4 text-fuchsia-400" />
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider">Riwayat Tawar-Menawar Harga</h2>
          </div>

          {/* TAMPILAN MOBILE */}
          <div className="block md:hidden space-y-3">
            {historiNego.map((item) => (
              <div key={item.sesi} className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3 shadow-md">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs font-black text-fuchsia-300 uppercase tracking-wider">Nego #{item.sesi}</span>
                  {item.harga_deal > 0 && (
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">🔒 DEAL</span>
                  )}
                </div>
                <div className="space-y-2 text-xs">
                  <div className="bg-white/[0.02] p-2 rounded-xl border border-white/5">
                    <p className="text-white/40 font-semibold">Marketing:</p>
                    <p className="text-white font-bold text-sm">Rp {item.harga_marketing.toLocaleString("id-ID")}</p>
                    <p className="text-[11px] text-white/60 italic mt-0.5">"{item.catatan_marketing}"</p>
                  </div>
                  <div className="bg-fuchsia-500/5 p-2 rounded-xl border border-fuchsia-500/10">
                    <p className="text-fuchsia-400/60 font-semibold">User/Customer:</p>
                    <p className="text-fuchsia-300 font-bold text-sm">Rp {item.harga_customer.toLocaleString("id-ID")}</p>
                    <p className="text-[11px] text-fuchsia-200/60 italic mt-0.5">"{item.catatan_customer}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* TAMPILAN DESKTOP */}
          <div className="hidden md:block overflow-x-auto rounded-3xl border border-white/20 bg-black/40 backdrop-blur-2xl shadow-2xl system-scrollbar">
            <div className="w-full">
              <table className="w-full text-left border-collapse border-hidden min-w-[800px]">
                <thead>
                  <tr className="border-b-2 border-white/20 bg-black/60 text-[11px] uppercase tracking-wider text-white/90 font-black">
                    <th className="p-4 text-center w-24 border-r border-white/10">Sesi</th>
                    <th className="p-4 w-72 border-r border-white/10">Penawaran Marketing</th>
                    <th className="p-4 w-72 border-r border-white/10">Nego Penumpang/User</th>
                    <th className="p-4">Status Akhir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-white/[0.01]">
                  {historiNego.map((item) => (
                    <tr key={item.sesi} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-center border-r border-white/10 text-xs font-black text-fuchsia-300 bg-black/5 align-top">
                        Nego #{item.sesi}
                      </td>
                      <td className="p-4 border-r border-white/10 space-y-1.5 align-top">
                        <div className="text-sm font-medium text-white/90">
                          Rp {item.harga_marketing.toLocaleString("id-ID")}
                        </div>
                        <div className="text-[11px] text-white/40 italic leading-relaxed border-t border-white/5 pt-1.5">
                          "{item.catatan_marketing}"
                        </div>
                      </td>
                      <td className="p-4 border-r border-white/10 space-y-1.5 align-top">
                        <div className="text-sm font-bold text-fuchsia-300">
                          Rp {item.harga_customer.toLocaleString("id-ID")}
                        </div>
                        <div className="text-[11px] text-fuchsia-300/40 italic leading-relaxed border-t border-white/5 pt-1.5">
                          "{item.catatan_customer}"
                        </div>
                      </td>
                      <td className="p-4 text-sm align-top">
                        {item.harga_deal > 0 ? (
                          <span className="text-emerald-400 font-black bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 block w-fit">
                            🔒 DEAL: Rp {item.harga_deal.toLocaleString("id-ID")}
                          </span>
                        ) : (
                          <span className="text-amber-400/50 text-xs italic block mt-1">On Progress</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION FORM */}
        <div className="rounded-2xl md:rounded-3xl border border-white/10 bg-white/10 backdrop-blur-3xl p-4 md:p-6 shadow-2xl shadow-black/30">
          <form onSubmit={handleKirimWhatsApp} className="space-y-4">
            <div className="border-b border-white/10 pb-2 mb-3">
              <h3 className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Masukkan Respon / Nego Baru
              </h3>
              <p className="text-[11px] text-white/50">Ketik nominal harga tandingan baru dan sertakan ketentuan kondisi operasional sewa.</p>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
              <div className="space-y-1.5 lg:col-span-1">
                <label className="text-[10px] md:text-[11px] uppercase tracking-wider text-white/60 font-bold flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Harga Nego Baru (Total)
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
                  <FileText className="w-3.5 h-3.5 text-fuchsia-400" /> Catatan / Alasan Utama
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
                    <button
                      type="submit"
                      className="h-11 px-5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Nego
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowSuccessAnimation(true);
                        setTimeout(() => {
                          router.push('/dashboard/crm/uploads-document');
                        }, 3000);
                      }}
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

      {/* ANIMASI LAYOVER SUCCESS */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300">
          <style>{`
              @keyframes popIn {
                0% { transform: scale(0.85); opacity: 0; }
                70% { transform: scale(1.05); }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes circleBounce {
                0% { transform: scale(0.3); opacity: 0; }
                50% { transform: scale(1.15); }
                80% { transform: scale(0.95); }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes fillBar {
                0% { width: 0%; }
                100% { width: 100%; }
              }
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
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1">
              Deal Disetujui!
            </h3>
            <p className="text-xs text-white/60 font-medium leading-relaxed max-w-[240px] mx-auto">
              Menyiapkan form upload dokumen berkas sewa...
            </p>
            <div className="w-full h-1 bg-white/10 rounded-full mt-6 overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-fuchsia-400 rounded-full animate-fill-bar" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}