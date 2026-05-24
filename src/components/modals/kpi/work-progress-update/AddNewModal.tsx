"use client";

import React, { useEffect, useState } from "react";
import { X, User, ShieldAlert, FileText, Calendar, CheckCircle, Award, Upload, FileUp } from "lucide-react";
import Swal from "sweetalert2";

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
  const isEditMode = !!data;

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [jobTitle, setJobTitle] = useState(""); // Menggantikan ID dengan Name/Title
  const [targetValue, setTargetValue] = useState("-");
  const [actualValue, setActualValue] = useState("");
  const [score, setScore] = useState("");
  const [periodMonth, setPeriodMonth] = useState("5");
  const [periodYear, setPeriodYear] = useState("2026");
  const [status, setStatus] = useState<UserJobDeskKPI["status"]>("PENDING");
  const [notes, setNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      if (data) {
        setUserId(String(data.user_id ?? ""));
        setUserName(data.user_name ?? "-");
        setJobTitle(data.job_title ?? "-"); // Ambil string nama jobdesk dari data hulu
        setTargetValue(data.target_value ?? "-");
        setActualValue(data.actual_value === "-" ? "" : (data.actual_value ?? ""));
        setScore(data.score ? String(data.score) : "");
        setPeriodMonth(String(data.period_month ?? "5"));
        setPeriodYear(String(data.period_year ?? "2026"));
        setStatus((data.status as UserJobDeskKPI["status"]) ?? "PENDING");
        setNotes(data.notes === "-" ? "" : (data.notes ?? ""));
        setSelectedFile(null); // Reset upload file saat modal dibuka kembali
      } else {
        setUserId("");
        setUserName("");
        setJobTitle("");
        setTargetValue("-");
        setActualValue("");
        setScore("");
        setPeriodMonth("5");
        setPeriodYear("2026");
        setStatus("PENDING");
        setNotes("");
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

    try {
      setSubmitting(true);

      // FormData disiapkan jika proses upload dilempar ke backend API asli
      const formData = new FormData();
      formData.append("notes", notes || "");
      if (selectedFile) {
        formData.append("attachment", selectedFile);
      }

      // Simulasi loading hit endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Swal.fire({
        icon: "success",
        title: "Berhasil Diperbarui",
        text: "Catatan evaluasi kpi dan berkas lampiran berhasil disimpan!",
        background: "#0f172a",
        color: "#fff",
      });

      if (onSaveSuccess) onSaveSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memperbarui data transaksi kpi.",
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
                Review / Edit Entri KPI <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">#{data?.id}</span>
              </h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border tracking-wider ml-1 ${
                status === "APPROVED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                status === "REJECTED" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                status === "REVIEW" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                "bg-blue-500/10 text-blue-400 border-blue-500/20"
              }`}>
                {status}
              </span>
            </div>
            <p className="text-xs text-white/40 flex items-center gap-1.5 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Periode: <span className="text-emerald-400 font-semibold">Bulan {periodMonth} - {periodYear}</span>
            </p>
          </div>

          <button
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

              {/* EMPLOYEE NAME (DISABLED) */}
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

              {/* JOBDESK MASTER NAME (REPLACED FROM ID & DISABLED) */}
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

              {/* TARGET VALUE (DISABLED) */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400/60" /> Target Value
                </label>
                <input
                  type="text"
                  value={targetValue}
                  disabled
                  className="w-full h-12 px-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white/40 text-sm outline-none cursor-not-allowed"
                />
              </div>

              {/* ACTUAL VALUE (DISABLED) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-400/60" /> Actual Value
                </label>
                <input
                  type="text"
                  value={actualValue || "-"}
                  disabled
                  className="w-full h-12 px-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white/40 text-sm outline-none cursor-not-allowed"
                />
              </div>

              {/* SCORE CALCULATED (DISABLED) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400/60" /> Score Calculated
                </label>
                <input
                  type="text"
                  value={score || "0"}
                  disabled
                  className="w-full h-12 px-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white/40 text-sm outline-none cursor-not-allowed"
                />
              </div>

              {/* PERIODE BULAN (DISABLED) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400/60" /> Periode Bulan
                </label>
                <input
                  type="text"
                  value={`Bulan ${periodMonth}`}
                  disabled
                  className="w-full h-12 px-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white/40 text-sm outline-none cursor-not-allowed"
                />
              </div>

              {/* PERIODE TAHUN (DISABLED) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400/60" /> Periode Tahun
                </label>
                <input
                  type="text"
                  value={periodYear}
                  disabled
                  className="w-full h-12 px-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white/40 text-sm outline-none cursor-not-allowed"
                />
              </div>

              {/* STATUS FLOW (DISABLED) */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/50 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400/60" /> Status Flow
                </label>
                <input
                  type="text"
                  value={status}
                  disabled
                  className="w-full h-12 px-4 rounded-2xl bg-white/[0.02] border border-white/5 text-white/40 text-sm outline-none font-bold cursor-not-allowed"
                />
              </div>

              {/* NOTES / REMARKS (EDITABLE ✅) */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                  Notes / Evaluator Remarks <span className="text-xs text-amber-400">(Editable)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tambahkan catatan hasil evaluasi performa kerja di sini..."
                  rows={3}
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-amber-500/50 text-white transition text-sm resize-none focus:ring-1 focus:ring-amber-500/20"
                />
              </div>

              {/* UPLOAD ATTACHMENT (NEW ADDITION ✅) */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/90 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-cyan-400" /> Upload Bukti Dukung / Lampiran
                </label>
                <div className="relative group border border-dashed border-white/20 hover:border-cyan-500/40 bg-white/5 rounded-2xl p-4 transition-all duration-150 text-center cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1.5">
                    <FileUp className={`w-8 h-8 ${selectedFile ? 'text-emerald-400' : 'text-white/40 group-hover:text-cyan-400 transition'}`} />
                    <p className="text-sm font-medium text-white/80">
                      {selectedFile ? selectedFile.name : "Pilih file atau drop dokumen di sini"}
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
              className="h-12 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition-all duration-200 text-sm font-semibold text-white shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center"
            >
              {submitting ? "Saving changes..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}