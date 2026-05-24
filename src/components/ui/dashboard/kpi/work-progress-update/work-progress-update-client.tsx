"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import AddData from "@/components/modals/kpi/work-progress-update/AddNewModal";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { getWorkProgressUpdate } from "../../../../../lib/kpi/workProgressUpdate/view";

import {
  Search,
  Briefcase,
  Target,
  FileText,
  Percent,
  ChevronDown,
  ClipboardList,
  Edit,
  Calendar,
  Layers,
  ArrowRight,
  FileDown,
  Clock,
  Plus,
} from "lucide-react";

/* ================= TYPES ================= */

type DailyProgressLog = {
  entry_id: number;
  date: string;
  actual_value_submitted: string;
  score_impact: number;
  notes: string;
  attachment_url?: string;
};

type JobDeskKPI = {
  id: number;
  company_id: number;
  user_id: number;
  user_name: string;
  jobdesk_master_id: number;
  job_title: string;
  kpi_name: string;
  weight: number;
  target_value: string;
  accumulated_actual_value: string;
  final_score: number;
  period_month: number;
  period_year: number;
  status: string;
  daily_logs: DailyProgressLog[];
};

export default function WorkProgressUpdateClient() {
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [jobDesks, setJobDesks] = useState<JobDeskKPI[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= STATE MODAL ================= */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  /* ================= FETCH & MAPPING ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getWorkProgressUpdate(1); 

      if (res?.success && res.data) {
        const rawItems = Array.isArray(res.data) ? res.data : [res.data];

        const mapped: JobDeskKPI[] = rawItems.map((item: any, index: number) => {
          const parsedId = Number(item.user_jobdesk_id);
          const finalId = isNaN(parsedId) || parsedId === 0 ? index + 1 : parsedId;

          const dailyLogsFromApi: DailyProgressLog[] = Array.isArray(item.daily_logs) 
            ? item.daily_logs.map((log: any) => ({
                entry_id: Number(log.entry_id ?? 0),
                date: log.date ?? "2026-05-20",
                actual_value_submitted: log.actual_value_submitted ?? item.actual_value ?? "-",
                score_impact: Number(log.score_impact ?? item.score ?? 0),
                notes: log.notes ?? item.notes ?? "-",
                attachment_url: log.attachment_url || undefined
              }))
            : [
                {
                  entry_id: finalId * 100 + 1,
                  date: "2026-05-19",
                  actual_value_submitted: item.actual_value ?? "-",
                  score_impact: Number(item.score ?? 0),
                  notes: item.notes && item.notes !== "-" ? item.notes : "Regular progress log entry.",
                  attachment_url: "#"
                }
              ];

          return {
            id: finalId,
            company_id: Number(item.company_id ?? 0),
            user_id: Number(item.user_id ?? 0),
            user_name: item.user_name ?? "-",
            jobdesk_master_id: Number(item.jobdesk_master_id ?? 0),
            job_title: item.job_title ?? "-",
            kpi_name: item.kpi_name ?? "-",
            weight: Number(item.weight ?? 0),
            target_value: item.target_value ?? "-",
            accumulated_actual_value: item.actual_value ?? "-",
            final_score: Number(item.score ?? 0),
            period_month: Number(item.period_month ?? 0),
            period_year: Number(item.period_year ?? 0),
            status: item.status ?? "PENDING",
            daily_logs: dailyLogsFromApi
          };
        });

        setJobDesks(mapped);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load daily progress log records.",
        background: "#0f172a",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= FILTER ================= */
  const filteredData = jobDesks.filter((item) =>
    item.job_title.toLowerCase().includes(search.toLowerCase()) ||
    item.user_name.toLowerCase().includes(search.toLowerCase()) ||
    item.kpi_name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* ================= HANDLER NEW ENTRY FROM HEADER ================= */
  const handleCreateNewEntryClick = (masterItem: JobDeskKPI) => {
    setSelectedData({
      ...masterItem,
      actual_value: "", // blank slate for a clean entry
      score: "0",
      notes: "",
      log_id: null, // represents a brand new item creation identifier
      date: new Date().toISOString().split('T')[0] // today's timestamp fallback
    });
    setIsModalOpen(true);
  };

  /* ================= HANDLER EDIT ROW LOG ================= */
  const handleEditLogClick = (masterItem: JobDeskKPI, log: DailyProgressLog) => {
    setSelectedData({
      ...masterItem,
      actual_value: log.actual_value_submitted,
      score: log.score_impact,
      notes: log.notes,
      log_id: log.entry_id,
      date: log.date
    });
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-white animate-pulse text-center">
          Loading Accumulating Job Desk KPI Record...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 text-white space-y-6">
        
        {/* DASHBOARD TOP HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Work Progress Update Dashboard</h1>
              <p className="text-sm text-white/50">
                Monitor performance accumulation & daily progress records
              </p>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job title, user, or KPI..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/30 text-sm"
            />
          </div>
        </div>

        {/* CONTAINER MAIN LIST */}
        <div className="space-y-4">
          {paginatedData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-white/40">
              No KPI tracker data found
            </div>
          ) : (
            paginatedData.map((item) => {
              const isOpen = openRow === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border transition-all ${
                    isOpen ? "border-cyan-500/30 bg-white/[0.04]" : "border-white/10 bg-white/5"
                  } overflow-hidden`}
                >
                  {/* ACCUMULATED MAIN SUMMARY CARD (HEADER) */}
                  <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
                        <Briefcase className="w-6 h-6 text-cyan-400" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-lg font-bold text-white">{item.job_title}</h2>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border tracking-wider ${
                            item.status === "APPROVED" ? "bg-green-500/10 border-green-500/20 text-green-400" :
                            item.status === "PENDING" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                            "bg-red-500/10 border-red-500/20 text-red-400"
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/50">
                          <span className="text-purple-400 font-medium">User: {item.user_name}</span>
                          <span>•</span>
                          <span className="text-emerald-400">Weight: {item.weight}%</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-white/40">
                            <Layers className="w-3.5 h-3.5 text-cyan-400/70" /> 
                            {item.daily_logs.length} Total Submissions
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* TARGET VS REALIZATION ACCUMULATION */}
                    <div className="grid grid-cols-2 sm:flex items-center gap-4 sm:gap-6 border-t border-b sm:border-none border-white/5 py-3 sm:py-0">
                      <div className="text-left sm:text-right">
                        <p className="text-[11px] text-white/40 uppercase tracking-wider">Target Blueprint</p>
                        <p className="text-sm font-semibold text-white/90">{item.target_value}</p>
                      </div>
                      <div className="hidden sm:block text-white/20">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] text-white/40 uppercase tracking-wider">Total Accumulated</p>
                        <p className="text-sm font-bold text-cyan-400">{item.accumulated_actual_value}</p>
                      </div>
                    </div>

                    {/* ACTIONS PANELS (WITH NEW ENTRY ACTION) */}
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <div className="text-left lg:text-right mr-2">
                        <p className="text-[10px] text-white/40 uppercase">Final Score</p>
                        <p className="text-lg font-extrabold text-emerald-400">{item.final_score}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* NEW ENTRY ACTION BUTTON IN HEADER */}
                        <button
                          onClick={() => handleCreateNewEntryClick(item)}
                          className="h-11 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black font-bold text-xs flex items-center gap-1.5 transition shadow-md shadow-cyan-500/10"
                          title="Submit a brand new daily progress log entry"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                          <span>New Entry</span>
                        </button>

                        <button
                          onClick={() => setOpenRow(isOpen ? null : item.id)}
                          className={`h-11 px-4 rounded-xl border flex items-center gap-2 transition text-xs font-semibold ${
                            isOpen ? "bg-white/10 border-white/20 text-white" : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>{isOpen ? "Hide" : "Logs"}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* NESTED CONTENT VIEW (EXPANDED REGION) */}
                  {isOpen && (
                    <div className="border-t border-white/10 bg-black/30 p-4 md:p-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
                      
                      {/* NESTED LIST SUB-HEADER */}
                      <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                            <Clock className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">Daily Progress Log Entries</h4>
                            <p className="text-xs text-white/40">
                              Detailed submission track for metric: <span className="text-cyan-400">{item.kpi_name}</span>
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                          <Calendar className="w-3.5 h-3.5 text-purple-400" />
                          <span>Period: Month {item.period_month} / {item.period_year}</span>
                        </div>
                      </div>

                      {/* DAILY PROGRESS LOG DATA SUB-TABLE */}
                      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.01]">
                        <table className="w-full text-left text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-white/10 bg-white/5 text-white/60 text-xs font-semibold uppercase tracking-wider">
                              <th className="p-4 w-36">Submission Date</th>
                              <th className="p-4">Daily Progress Actual</th>
                              <th className="p-4 w-32 text-center">Score Impact</th>
                              <th className="p-4">Notes / Remarks</th>
                              <th className="p-4 w-28 text-center">Attachment</th>
                              <th className="p-4 w-20 text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {item.daily_logs.map((log) => (
                              <tr key={log.entry_id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="p-4 text-white/70 font-medium whitespace-nowrap">
                                  {new Date(log.date).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                  })}
                                </td>
                                <td className="p-4 text-white font-semibold">
                                  {log.actual_value_submitted}
                                </td>
                                <td className="p-4 text-center font-bold text-emerald-400">
                                  +{log.score_impact}
                                </td>
                                <td className="p-4 text-white/60 text-xs max-w-xs truncate" title={log.notes}>
                                  {log.notes || "-"}
                                </td>
                                <td className="p-4 text-center">
                                  {log.attachment_url ? (
                                    <a
                                      href={log.attachment_url}
                                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 transition"
                                      title="Download supporting document"
                                    >
                                      <FileDown className="w-4 h-4" />
                                    </a>
                                  ) : (
                                    <span className="text-xs text-white/20">-</span>
                                  )}
                                </td>
                                <td className="p-4 text-center">
                                  <button
                                    onClick={() => handleEditLogClick(item, log)}
                                    title="Edit target log row note"
                                    className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-400 transition flex items-center justify-center mx-auto opacity-80 group-hover:opacity-100"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition text-sm"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-xl transition text-sm ${
                  currentPage === i + 1 ? "bg-cyan-500 text-black font-bold" : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition text-sm"
            >
              Next
            </button>
          </div>
        )}

      </div>

      <AddData 
        open={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedData(null);
        }} 
        onSaveSuccess={fetchData} 
        data={selectedData}       
      />

    </DashboardLayout>
  );
}