"use client";

import React, { useState } from "react";
import {
  Car,
  User,
  FileUp,
  Plus,
  Trash2,
  CheckCircle,
  FileText,
  MapPin,
  FileIcon,
  BadgeCheck,
  ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

type BerkasItem = {
  id: number;
  file: File | null;
  previewName: string;
  previewUrl: string;
  deskripsi: string;
};

export default function UploadsDocument() {
  const router = useRouter();
  const rentalDetail = {
    booking_id: "TRX-CAR-20260518",
    unit_mobil: "Toyota Alphard Transformer Facelift (2023)",
    customer: "PT. Global Tech (Ibu Siska)",
    durasi_paket: "3 Hari (Driver + BBM)",
    rute_tujuan: "Rute: Surabaya - Banyuwangi",
    harga_deal: 8250000,
  };

  const [berkasList, setBerkasList] = useState<BerkasItem[]>([
    { id: Date.now(), file: null, previewName: "", previewUrl: "", deskripsi: "" }
  ]);

  // Konfigurasi posisi kiri, ukuran, delay, dan durasi bubble fixed
  const bubbles = [
    { size: "w-12 h-12 md:w-16 md:h-16", left: "left-[8%]", delay: "0s", duration: "12s" },
    { size: "w-16 h-16 md:w-24 md:h-24", left: "left-[25%]", delay: "2s", duration: "16s" },
    { size: "w-8 h-8 md:w-12 md:h-12", left: "left-[45%]", delay: "1s", duration: "10s" },
    { size: "w-20 h-20 md:w-28 md:h-28", left: "left-[60%]", delay: "4s", duration: "20s" },
    { size: "w-14 h-14 md:w-20 md:h-20", left: "left-[75%]", delay: "1.5s", duration: "14s" },
    { size: "w-16 h-16 md:w-24 md:h-24", left: "left-[90%]", delay: "6s", duration: "18s" },
  ];

  const addRow = () => {
    setBerkasList([...berkasList, { id: Date.now(), file: null, previewName: "", previewUrl: "", deskripsi: "" }]);
  };

  const removeRow = (id: number) => {
    const itemTarget = berkasList.find(item => item.id === id);
    if (itemTarget?.previewUrl) URL.revokeObjectURL(itemTarget.previewUrl);
    setBerkasList(berkasList.filter(item => item.id !== id));
  };

  const handleFileChange = (id: number, fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      const objectUrl = URL.createObjectURL(selectedFile);
      setBerkasList(berkasList.map(item => 
        item.id === id ? { ...item, file: selectedFile, previewName: selectedFile.name, previewUrl: objectUrl } : item
      ));
    }
  };

  const handleCancelFile = (id: number) => {
    setBerkasList(berkasList.map(item => {
      if (item.id === id) {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        return { ...item, file: null, previewName: "", previewUrl: "" };
      }
      return item;
    }));
  };

  const handleDeskripsiChange = (id: number, value: string) => {
    setBerkasList(berkasList.map(item => item.id === id ? { ...item, deskripsi: value } : item));
  };

  const handleSubmitSelesai = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Daftar Berkas Terupload:", berkasList);
    alert("Data Berhasil Disimpan!");
    router.push('/dashboard/crm/approvals-keuangan');
  };

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(to_right,_#160040,_#9A0680)] relative overflow-hidden pb-12 px-3 md:px-0">

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

      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-fuchsia-500/20 blur-[100px] md:blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-violet-500/20 blur-[100px] md:blur-[140px]" />

      {/* CONTAINER BUBBLE BARU */}
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

      <div className="relative z-10 max-w-4xl mx-auto pt-6 md:pt-10 space-y-6">
        
        {/* NAV BACK */}
        <div className="flex items-center px-1">
          <button 
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-all text-[11px] font-bold uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
        </div>

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-black/20 backdrop-blur-3xl p-5 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Sisi Kiri: Detail Mobil */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center shrink-0 shadow-lg">
                <Car className="w-5 md:w-7 h-5 md:h-7 text-fuchsia-300" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] md:text-[10px] font-black text-fuchsia-400 uppercase tracking-widest bg-fuchsia-500/10 px-2 py-0.5 rounded-md border border-fuchsia-500/20">
                  {rentalDetail.booking_id}
                </span>
                <h1 className="text-base md:text-2xl font-black text-white leading-tight">{rentalDetail.unit_mobil}</h1>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-4 gap-y-1 pt-1 text-white/50 text-[11px] font-medium">
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {rentalDetail.customer}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {rentalDetail.rute_tujuan}</span>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Harga Kesepakatan */}
            <div className="bg-emerald-500/10 border border-emerald-400/30 p-4 rounded-2xl flex flex-col items-start md:items-end justify-center min-w-[200px] w-full md:w-auto backdrop-blur-2xl">
              <p className="text-[10px] uppercase font-black text-emerald-300 tracking-widest mb-1 flex items-center gap-1">
                <BadgeCheck className="w-3 h-3" /> Harga Kesepakatan
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-emerald-300">
                Rp {rentalDetail.harga_deal.toLocaleString("id-ID")}
              </h2>
            </div>
          </div>
        </div>

        {/* BODY FORM UPLOAD */}
        <div className="rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-4 md:p-8 shadow-2xl">
          
          <form onSubmit={handleSubmitSelesai} className="space-y-6 md:space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <h3 className="text-white font-black text-base md:text-lg flex items-center gap-2 uppercase tracking-tight">
                  <FileUp className="w-5 h-5 text-fuchsia-400" /> Dokumen Pendukung
                </h3>
                <p className="text-white/40 text-[11px] md:text-xs font-medium">Unggah legalitas perusahaan anda atau identitas pendukung sewa.</p>
              </div>
              <button
                type="button"
                onClick={addRow}
                className="w-10 h-10 rounded-xl bg-white text-[#160040] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shrink-0 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* BARIS UPLOAD LIST */}
            <div className="space-y-4">
              {berkasList.map((item, index) => {
                const isImage = item.file?.type.startsWith("image/");
                return (
                  <div 
                    key={item.id} 
                    className="flex flex-col md:flex-row items-stretch gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-all group relative"
                  >
                    {/* Header Row di Atas (Khusus Mobile) */}
                    <div className="md:hidden flex justify-between items-center text-[10px] font-black text-white/30 uppercase tracking-wider border-b border-white/5 pb-2">
                      <span>Dokumen #{index + 1}</span>
                    </div>

                    {/* Kolom 1: Input File */}
                    <div className="flex-1 space-y-2">
                      {!item.previewName ? (
                        <div className="relative h-12">
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => handleFileChange(item.id, e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="w-full h-full rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center gap-2 text-xs font-bold text-white/40 group-hover:border-fuchsia-400/50 transition-all">
                            <Plus className="w-3.5 h-3.5" /> Pilih File Berkas
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl h-12">
                          <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
                            {isImage ? <img src={item.previewUrl} alt="preview" className="w-full h-full object-cover" /> : <FileIcon className="w-4 h-4 text-white/40" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-[11px] font-black text-white leading-tight">{item.previewName}</p>
                            <div className="flex gap-3 mt-0.5">
                              <a href={item.previewUrl} target="_blank" rel="noreferrer" className="text-[10px] text-emerald-400 font-black hover:underline">Lihat</a>
                              <button type="button" onClick={() => handleCancelFile(item.id)} className="text-[10px] text-red-400 font-black hover:underline cursor-pointer">Hapus</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Kolom 2: Deskripsi Keterangan */}
                    <div className="flex-[1.5] space-y-2">
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                          type="text"
                          value={item.deskripsi}
                          onChange={(e) => handleDeskripsiChange(item.id, e.target.value)}
                          placeholder="Contoh: KTP Direktur / NIB Perusahaan..."
                          required
                          className="w-full h-12 bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 text-xs md:text-sm text-white placeholder:text-white/20 outline-none focus:border-fuchsia-400 transition-all"
                        />
                      </div>
                    </div>

                    {/* Kolom 3: Delete Row Button */}
                    {berkasList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRow(item.id)}
                        className="h-12 px-4 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-all text-xs font-black md:px-3 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="md:hidden ml-2">Hapus Baris</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* FOOTER SUBMIT */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">              
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl w-full sm:w-auto justify-center sm:justify-start">
                <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 animate-pulse" />
                <p className="text-xs text-white/70 font-medium">
                  Total Siap Simpan: <span className="text-fuchsia-400 font-black">{berkasList.length} Berkas</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto h-11 px-6 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5" /> Simpan Dokumen
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}