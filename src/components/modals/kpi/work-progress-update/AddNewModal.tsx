"use client";

import React, { useEffect, useState } from "react";
import { X, User, ShieldAlert, FileText, Calendar, CheckCircle, Award, Upload, FileUp } from "lucide-react";
import Swal from "sweetalert2";
import { saveKpiWorkProgressUpdate } from "../../../../store/kpi/workProgressUpdate/save"; 

type UserJobDeskKPI = {
  id?: number;
  company_id: number;
  user_id: number;
  jobdesk_master_id: number;
  target_value: string;
  actual_value: string | null;
  score: number | null;
  period_month: number;
  period_year: number;
  status: "PENDING" | "IN_PROGRESS" | "REVIEW" | "APPROVED" | "REJECTED";
  notes: string | null;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSaveSuccess?: () => void;
  data?: any | null;
};

export default function AddNewModal({ open, onClose, onSaveSuccess, data }: Props) {
  const [userJobdeskKpiId, setUserJobdeskKpiId] = useState<number | null>(null);
  const [userName, setUserName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [targetValue, setTargetValue] = useState("-");
  const [actualValueSubmitted, setActualValueSubmitted] = useState(""); 
  const [scoreImpact, setScoreImpact] = useState<number>(0);            
  const [periodMonth, setPeriodMonth] = useState("5");
  const [periodYear, setPeriodYear] = useState("2026");
  const [status, setStatus] = useState<UserJobDeskKPI["status"]>("PENDING");
  const [notes, setNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentDate, setCurrentDate] = useState(""); 

  useEffect(() => {
    if (open) {
      if (data) {
        setUserJobdeskKpiId(data.user_jobdesk_kpi_id || data.id || null);
        setUserName(data.user_name ?? "-");
        setJobTitle(data.job_title ?? "-");
        setTargetValue(data.target_value ?? "-");
        
        setActualValueSubmitted(data.actual_value_submitted || data.actual_value || "");
        setScoreImpact(Number(data.score_impact || data.score || 0));
        setNotes(data.notes && data.notes !== "-" ? data.notes : "");
        setCurrentDate(data.date || new Date().toISOString().split('T')[0]);
        
        setPeriodMonth(String(data.period_month ?? "5"));
        setPeriodYear(String(data.period_year ?? "2026"));
        setStatus((data.status as UserJobDeskKPI["status"]) ?? "PENDING");
        setSelectedFile(null);
      } else {
        setUserJobdeskKpiId(null);
        setUserName("");
        setJobTitle("");
        setTargetValue("-");
        setActualValueSubmitted("");
        setScoreImpact(0);
        setPeriodMonth("5");
        setPeriodYear("2026");
        setStatus("PENDING");
        setNotes("");
        setCurrentDate(new Date().toISOString().split('T')[0]);
        setSelectedFile(null);
      }
    }
  }, [open, data]);

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userJobdeskKpiId) {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "ID target KPI tidak valid atau tidak ditemukan.",
        background: "#0f172a",
        color: "#fff",
      });
      return;
    }

    try {
      setSubmitting(true);

      let finalAttachmentUrl = data?.attachment_url || null;
      
      if (selectedFile) {
        // Mock URL file lokal (sesuaikan jika Anda memiliki endpoint storage upload tersendiri)
        finalAttachmentUrl = `https://storage.carlinx.com/attachments/${selectedFile.name}`;
      }

      /* |--------------------------------------------------------------------------
      | 🌟 MODEL PAYLOAD SINGLE OBJECT (DIKIRIM LANGSUNG TANPA ARRAY LOGS) 🌟
      |--------------------------------------------------------------------------
      */
      const payload = {
        user_jobdesk_kpi_id: Number(userJobdeskKpiId),
        date: currentDate,
        actual_value_submitted: String(actualValueSubmitted || "-"),
        score_impact: Number(scoreImpact),
        notes: notes.trim() !== "" ? notes : null,
        attachment_url: finalAttachmentUrl,
      };

      // Tembak ke API dengan skema model payload baru
      const response = await saveKpiWorkProgressUpdate(payload);

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Disimpan",
          text: response.message || "Catatan KPI dan berkas log harian berhasil disimpan!",
          background: "#0f172a",
          color: "#fff",
          timer: 2000,
          showConfirmButton: false
        });

        if (onSaveSuccess) onSaveSuccess(); 
        onClose();
      } else {
        throw new Error(response?.message || "Terjadi kesalahan sistem internal.");
      }

    } catch (err: any) {
      console.error("Gagal melakukan save data via API:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal Menyimpan",
        text: err?.message || "Terjadi kendala koneksi saat menghubungi server API.",
        background: "#0f172a",
        color: "#fff",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111827] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 my-auto">

        {/* HEADER */}
        <div className="relative flex items-start justify-between px-6 py-5 border-b border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-amber-500 via-orange-500 to-transparent" />

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-extrabold tracking-tight text-white">
                {data?.entry_id ? "Edit Progress Log Entry" : "New Progress Entry"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">#{userJobdeskKpiId}</span>
              </h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border tracking-wider ml-1 ${
                status === "APPROVED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                status === "REVIEW" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                "bg-blue-500/10 text-blue-400 border-blue-500/20"
              }`}>
                {status}
              </span>
            </div>
            <p className="text-xs text-white/40 flex items-center gap-1.5 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Periode Target: <span className="text-cyan-400 font-semibold">Bulan {periodMonth} - {periodYear}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 flex items-center justify-center transition active:scale-95 group"
          >
            <X className="w-4 h-4 text-white/50 group-hover:text-white" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* EMPLOYEE NAME */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400/60" /> Employee Name
                </label>
                <input
                  type="text"
                  value={userName}
                  disabled
                  className="w-full h-12 px-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white/40 text-sm outline-none cursor-not-allowed"
                />
              </div>

              {/* JOBDESK MASTER NAME */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-purple-400/60" /> Jobdesk Master Name
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  disabled
                  className="w-full h-12 px-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white/40 text-sm outline-none cursor-not-allowed"
                />
              </div>

              {/* TARGET VALUE */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400/60" /> Target Indicator Blueprint
                </label>
                <input
                  type="text"
                  value={targetValue}
                  disabled
                  className="w-full h-12 px-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white/40 text-sm outline-none cursor-not-allowed"
                />
              </div>

              {/* LOG DATE */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" /> Log Progress Date
                </label>
                <input
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-cyan-500/50"
                />
              </div>

              {/* ACTUAL VALUE SUBMITTED */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-400" /> Actual Value Submitted <span className="text-xs text-cyan-400">(Editable)</span>
                </label>
                <input
                  type="text"
                  required
                  value={actualValueSubmitted}
                  onChange={(e) => setActualValueSubmitted(e.target.value)}
                  placeholder="Masukkan angka capaian..."
                  className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-cyan-500/50"
                />
              </div>

              {/* SCORE IMPACT */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" /> Score Impact Given <span className="text-xs text-cyan-400">(Editable)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={scoreImpact}
                  onChange={(e) => setScoreImpact(Number(e.target.value))}
                  placeholder="Contoh: 15.5"
                  className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-cyan-500/50"
                />
              </div>

              {/* NOTES / REMARKS */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                  Notes / Progress Remarks <span className="text-xs text-amber-400">(Editable)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tambahkan rincian pekerjaan atau alasan perubahan di sini..."
                  rows={3}
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500/50 text-white transition text-sm resize-none"
                />
              </div>

              {/* UPLOAD ATTACHMENT */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-cyan-400" /> Upload Bukti Dukung / Lampiran (Opsional)
                </label>
                <div className="relative group border border-dashed border-white/20 hover:border-cyan-500/40 bg-white/5 rounded-2xl p-4 transition text-center cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1.5">
                    <FileUp className={`w-8 h-8 ${selectedFile ? 'text-emerald-400' : 'text-white/40 group-hover:text-cyan-400 transition'}`} />
                    <p className="text-sm font-medium text-white/80">
                      {selectedFile ? selectedFile.name : (data?.attachment_url ? "Ganti file lampiran yang sudah ada" : "Pilih file atau drop dokumen di sini")}
                    </p>
                    <p className="text-xs text-white/40">
                      {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "PDF, JPG, PNG up to 5MB"}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* FOOTER ACTION */}
          <div className="px-6 py-5 border-t border-white/10 bg-black/20 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="h-12 px-5 rounded-2xl bg-white/5 hover:bg-white/10 transition text-sm text-white/80 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="h-12 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 text-sm font-semibold text-black shadow-lg active:scale-95 disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Simpan Progress"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}