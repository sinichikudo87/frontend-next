"use client";

import React, { useState } from "react";
import { X, Briefcase, Target, Percent, FileText, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import { saveJobDeskMaster } from "../../../../store/kpi/jobDeskMaster/save"; 

type DepartmentData = {
  id: number;
  name: string;
  description?: string;
  is_active?: number;
  type?: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSaveSuccess?: () => void;
  departments: DepartmentData[];
};

export default function AddNewModal({ open, onClose, onSaveSuccess, departments = [] }: Props) {
  const [jobTitle, setJobTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [kpiName, setKpiName] = useState("");
  const [weight, setWeight] = useState("");
  const [targetIndicator, setTargetIndicator] = useState("");
  const [isActive, setIsActive] = useState("1");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !departmentId || !kpiName || !weight || !targetIndicator) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "All required fields must be filled out!",
        background: "#0f172a",
        color: "#fff",
      });
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        id: 0,
        company_id: 1,
        job_title: jobTitle,
        department_id: Number(departmentId),
        kpi_name: kpiName,
        target_indicator: targetIndicator,
        weight: Number(weight),
        is_active: Number(isActive),
      };

      const response = await saveJobDeskMaster(payload);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message || "New Job Desk KPI has been successfully added!",
          background: "#0f172a",
          color: "#fff",
        });

        setJobTitle("");
        setDepartmentId("");
        setKpiName("");
        setWeight("");
        setTargetIndicator("");
        setIsActive("1");

        if (onSaveSuccess) onSaveSuccess();
        onClose();
      }
    } catch (err: any) {
      console.error("Error saving job desk:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Failed to save data to the database.",
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
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white">Create New Job Desk KPI</h2>
            <p className="text-sm text-white/50 mt-1">
              Add a new record to the master job desk KPI configuration
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* JOB TITLE */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-400" /> Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500/50 text-white transition text-sm"
                />
              </div>

              {/* DEPARTMENT ID (DINAMIS) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-400" /> Department
                </label>
                <div className="relative">
                  <select
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    className="w-full h-12 px-4 rounded-2xl bg-[#1f2937] border border-white/10 outline-none focus:border-purple-500/50 text-white transition text-sm cursor-pointer appearance-none"
                  >
                    <option value="" disabled hidden>Select Department...</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id} className="bg-[#111827]">
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {departments.length === 0 && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red-400">
                      No departments loaded
                    </span>
                  )}
                </div>
              </div>

              {/* KPI NAME */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" /> KPI Name / Parameter
                </label>
                <input
                  type="text"
                  value={kpiName}
                  onChange={(e) => setKpiName(e.target.value)}
                  placeholder="e.g. Code quality and feature delivery speed"
                  className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-emerald-500/50 text-white transition text-sm"
                />
              </div>

              {/* WEIGHT */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-amber-400" /> Weight (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="0 - 100"
                  className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-amber-500/50 text-white transition text-sm"
                />
              </div>

              {/* STATUS */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" /> Status
                </label>
                <select
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-[#1f2937] border border-white/10 outline-none focus:border-blue-500/50 text-white transition text-sm cursor-pointer"
                >
                  <option value="1" className="bg-[#111827]">ACTIVE</option>
                  <option value="0" className="bg-[#111827]">INACTIVE</option>
                </select>
              </div>

              {/* TARGET INDICATOR */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-400" /> Target & Success Indicator
                </label>
                <textarea
                  value={targetIndicator}
                  onChange={(e) => setTargetIndicator(e.target.value)}
                  placeholder="Describe the detailed targets and success milestones here..."
                  rows={4}
                  className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-orange-500/50 text-white transition text-sm resize-none"
                />
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-5 border-t border-white/10 bg-black/20 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose} 
              disabled={submitting}
              className="h-12 px-5 rounded-2xl bg-white/5 hover:bg-white/10 transition text-sm text-white/80 font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="h-12 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 active:scale-95 disabled:opacity-50 flex items-center justify-center"
            >
              {submitting ? "Saving..." : "Save Data"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}