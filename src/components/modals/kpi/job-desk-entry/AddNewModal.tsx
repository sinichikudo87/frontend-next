"use client";

import React, { useEffect, useState } from "react";
import { X, FileText, Award, Briefcase, Calendar } from "lucide-react";
import Swal from "sweetalert2";

type AddNewModalProps = {
  open: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
  data?: any; 
};

export default function AddNewModal({ open, onClose, onSaveSuccess, data }: AddNewModalProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [targetValue, setTargetValue] = useState(""); 
  const [actualValue, setActualValue] = useState(""); 
  const [scoreCalculated, setScoreCalculated] = useState(""); 
  const [periodMonth, setPeriodMonth] = useState("");
  const [periodYear, setPeriodYear] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const months = [
    { value: "1", label: "January" }, { value: "2", label: "February" },
    { value: "3", label: "March" }, { value: "4", label: "April" },
    { value: "5", label: "May" }, { value: "6", label: "June" },
    { value: "7", label: "July" }, { value: "8", label: "August" },
    { value: "9", label: "September" }, { value: "10", label: "October" },
    { value: "11", label: "November" }, { value: "12", label: "December" },
  ];

  // ================= LOGIKA TAHUN: 2 TAHUN KE DEPAN =================
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => String(currentYear + i)); // Menghasilkan: [2026, 2027, 2028]

  useEffect(() => {
    if (data && open) {
      setJobTitle(data.job_title ?? "");
      
      // RESET SEMUA KE KOSONG SAAT OPEN
      setTargetValue(""); 
      setActualValue(""); 
      setScoreCalculated(""); 
      setPeriodMonth("");
      setPeriodYear("");
    }
  }, [data, open]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Performance for " + jobTitle + " updated successfully.",
        background: "#0f172a", color: "#fff", confirmButtonColor: "#06b6d4",
      });

      onSaveSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#0f172a] text-white shadow-2xl overflow-hidden">
        
        {/* MODAL HEADER */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-cyan-950/20 to-blue-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-inner">
              <Briefcase className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight leading-tight">Update Performance</h2>
              <p className="text-sm text-cyan-400/80 font-medium truncate max-w-[300px]">
                {jobTitle || "No Title Selected"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          
          {/* INFO PEKERJAAN */}
          <div className="space-y-3">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
              <div>
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Job Context</p>
                <p className="text-sm font-semibold text-white/90">{jobTitle}</p>
              </div>

              {/* BULAN DAN TAHUN (DI BAWAH JUDUL) */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-purple-400" /> Month Period
                  </label>
                  <select
                    value={periodMonth}
                    onChange={(e) => setPeriodMonth(e.target.value)}
                    className="w-full p-2.5 bg-[#1e293b] border border-white/10 rounded-xl text-xs text-white outline-none focus:border-cyan-500/50 cursor-pointer"
                    required
                  >
                    <option value="" disabled hidden>Select Month</option>
                    {months.map((m) => <option key={m.value} value={m.value} className="bg-[#0f172a]">{m.label}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-purple-400" /> Year Period
                  </label>
                  <select
                    value={periodYear}
                    onChange={(e) => setPeriodYear(e.target.value)}
                    className="w-full p-2.5 bg-[#1e293b] border border-white/10 rounded-xl text-xs text-white outline-none focus:border-cyan-500/50 cursor-pointer"
                    required
                  >
                    <option value="" disabled hidden>Select Year</option>
                    {years.map((y) => <option key={y} value={y} className="bg-[#0f172a]">{y}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* TARGET VALUE (ENABLED) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" /> Target Value
            </label>
            <input
              type="text"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
              placeholder="e.g. 20 Contents Posted"
              required
            />
          </div>

          {/* ACTUAL VALUE & SCORE (KOSONG) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-400" /> Actual Value
              </label>
              <input
                type="text"
                value={actualValue} 
                onChange={(e) => setActualValue(e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
                placeholder="Enter result..."
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-400" /> Score Calculated
              </label>
              <input
                type="number"
                value={scoreCalculated}
                onChange={(e) => setScoreCalculated(e.target.value)}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
                placeholder="0-100"
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button type="button" onClick={onClose} className="px-5 h-11 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 h-11 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-sm font-bold text-black shadow-lg shadow-cyan-500/10 transition-all disabled:opacity-50">
              {isSubmitting ? "Saving..." : "Save Progress"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}