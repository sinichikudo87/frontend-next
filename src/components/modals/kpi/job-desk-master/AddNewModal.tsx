"use client";

import React, { useState } from "react";
import { X, Briefcase, Target, Percent, FileText, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaveSuccess?: () => void;
};

export default function AddNewModal({ open, onClose, onSaveSuccess }: Props) {
  // Form States
  const [jobTitle, setJobTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [kpiName, setKpiName] = useState("");
  const [weight, setWeight] = useState("");
  const [targetIndicator, setTargetIndicator] = useState("");
  const [isActive, setIsActive] = useState("1");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
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

      // Simulation of API request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "New Job Desk KPI has been successfully added!",
        background: "#0f172a",
        color: "#fff",
      });

      // Reset Form
      setJobTitle("");
      setDepartmentId("");
      setKpiName("");
      setWeight("");
      setTargetIndicator("");
      setIsActive("1");

      if (onSaveSuccess) onSaveSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save data to the database.",
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

              {/* DEPARTMENT ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-400" /> Department
                </label>
                <select
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  className="w-full h-12 px-4 rounded-2xl bg-[#1f2937] border border-white/10 outline-none focus:border-purple-500/50 text-white transition text-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled hidden>Select Department...</option>
                  <option value="1">IT Department</option>
                  <option value="2">Human Resources</option>
                  <option value="3">Finance & Accounting</option>
                  <option value="4">Marketing & Sales</option>
                </select>
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
                  <option value="1">ACTIVE</option>
                  <option value="0">INACTIVE</option>
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