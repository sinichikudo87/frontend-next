"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import AddData from "@/components/modals/kpi/work-progress-update/AddNewModal";
import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";

import { getWorkProgressUpdate } from "../../../../../../lib/kpi/workProgressUpdate/view";

import {
  Search,
  Briefcase,
  Target,
  ChevronDown,
  ClipboardList,
  Edit,
  Calendar,
  Layers,
  ArrowRight,
  FileDown,
  Clock,
  Plus,
  User,
  Award,
  TrendingUp,
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

interface WorkProgressUpdateClientProps {
  initialData: JobDeskKPI[];
}

export default function WorkProgressUpdateClient({ initialData }: WorkProgressUpdateClientProps) {
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [jobDesks, setJobDesks] = useState<JobDeskKPI[]>(initialData ?? []);
  const [loading, setLoading] = useState(false);

  /* ================= STATE MODAL ================= */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  /* ================= SILENT RE-FETCH ================= */
  const fetchData = async () => {
    try {
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
    }
  };

  /* ================= FILTER LOGIC ================= */
  const filteredData = jobDesks.filter((item) =>
    item.job_title.toLowerCase().includes(search.toLowerCase()) ||
    item.user_name.toLowerCase().includes(search.toLowerCase()) ||
    item.kpi_name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= GROUPING LOGIC (BY JOB TITLE) ================= */
  const groupedData = useMemo(() => {
    return filteredData.reduce((groups, item) => {
      const title = item.job_title;
      if (!groups[title]) {
        groups[title] = [];
      }
      groups[title].push(item);
      return groups;
    }, {} as Record<string, JobDeskKPI[]>);
  }, [filteredData]);

  /* ================= HANDLER NEW ENTRY ================= */
  const handleCreateNewEntryClick = (masterItem: JobDeskKPI) => {
    setSelectedData({
      ...masterItem,
      actual_value: "", 
      score: "0",
      notes: "",
      log_id: null, 
      date: new Date().toISOString().split('T')[0] 
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
              <h1 className="text-2xl font-bold tracking-tight">Work Progress Update</h1>
              <p className="text-sm text-white/50">
                Monitor performance accumulation grouped by structural positions
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

        {/* ================= GROUPED CARD RENDERING ================= */}
        {Object.keys(groupedData).length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-white/40">
            No KPI tracker data found
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedData).map(([jobTitle, items]) => (
              <div 
                key={jobTitle} 
                className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4 shadow-sm"
              >
                {/* JABATAN HEADER GROUP */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold tracking-tight text-white">{jobTitle}</h2>
                      <p className="text-xs text-white/40">
                        Total {items.length} Tracked Objective{items.length > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* MAIN GRID COLLAPSIBLE MATRIX */}
                <div className="grid grid-cols-1 gap-4">
                  {items.map((item) => {
                    const isOpen = openRow === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                          isOpen ? "border-cyan-500/30 bg-white/[0.04]" : "border-white/5 bg-white/5 hover:border-white/10"
                        }`}
                      >
                        {/* CARD CORE BODY */}
                        <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          
                          {/* USER INFO & OBJECTIVE */}
                          <div className="flex items-start gap-3 max-w-xl truncate">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                              <User className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="truncate space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-white">{item.user_name}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wider ${
                                  item.status === "APPROVED" ? "bg-green-500/10 border-green-500/20 text-green-400" :
                                  item.status === "PENDING" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                                  "bg-red-500/10 border-red-500/20 text-red-400"
                                }`}>
                                  {item.status}
                                </span>
                              </div>
                              <p className="text-xs text-white/60 line-clamp-1" title={item.kpi_name}>
                                {item.kpi_name}
                              </p>
                              <div className="text-[11px] text-white/40 flex items-center gap-2">
                                <span className="text-emerald-400 font-medium">Weight: {item.weight}%</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Layers className="w-3 h-3 text-cyan-400/70" /> 
                                  {item.daily_logs.length} Submissions
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* SUB-METRICS METRIC */}
                          <div className="grid grid-cols-2 sm:flex items-center gap-4 sm:gap-6 border-t border-b lg:border-none border-white/5 py-2.5 lg:py-0">
                            <div>
                              <span className="text-[10px] text-white/40 block uppercase tracking-wider">Target Blueprint</span>
                              <p className="text-xs font-semibold text-white/90 mt-0.5">{item.target_value}</p>
                            </div>
                            <div className="hidden sm:block text-white/20">
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="text-[10px] text-white/40 block uppercase tracking-wider">Accumulated Actual</span>
                              <p className="text-xs font-bold text-cyan-400 mt-0.5">{item.accumulated_actual_value}</p>
                            </div>
                          </div>

                          {/* ACTION SECTION */}
                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            <div className="text-left lg:text-right mr-1">
                              <p className="text-[9px] text-white/40 uppercase leading-none">Final Score</p>
                              <p className="text-base font-extrabold text-emerald-400 mt-1 leading-none">{item.final_score}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleCreateNewEntryClick(item)}
                                className="h-9 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-black font-bold text-xs flex items-center gap-1 transition"
                              >
                                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                                <span>New Entry</span>
                              </button>

                              <button
                                onClick={() => setOpenRow(isOpen ? null : item.id)}
                                className={`h-9 px-3 rounded-xl border flex items-center gap-1.5 transition text-xs font-semibold ${
                                  isOpen ? "bg-white/10 border-white/20 text-white" : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                                }`}
                              >
                                <span>{isOpen ? "Hide" : "Logs"}</span>
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                              </button>
                            </div>
                          </div>

                        </div>

                        {/* NESTED CONTENT LOG VIEW */}
                        {isOpen && (
                          <div className="border-t border-white/5 bg-black/40 p-4 space-y-3">
                            <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-xl p-3 text-xs">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-cyan-400" />
                                <span className="font-semibold">Submissions Profile Tracker</span>
                              </div>
                              <span className="text-white/40">Period: Month {item.period_month} / {item.period_year}</span>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-white/5 bg-white/[0.005]">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="border-b border-white/5 bg-white/5 text-white/50 font-medium uppercase tracking-wider">
                                    <th className="p-3 w-32">Submission Date</th>
                                    <th className="p-3">Daily Progress Actual</th>
                                    <th className="p-3 w-28 text-center">Score Impact</th>
                                    <th className="p-3">Notes / Remarks</th>
                                    <th className="p-3 w-24 text-center">Attachment</th>
                                    <th className="p-3 w-16 text-center">Action</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                  {item.daily_logs.map((log) => (
                                    <tr key={log.entry_id} className="hover:bg-white/[0.01] transition-colors group">
                                      <td className="p-3 text-white/70 whitespace-nowrap">
                                        {new Date(log.date).toLocaleDateString("en-US", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric"
                                        })}
                                      </td>
                                      <td className="p-3 text-white font-medium">
                                        {log.actual_value_submitted}
                                      </td>
                                      <td className="p-3 text-center font-bold text-emerald-400">
                                        +{log.score_impact}
                                      </td>
                                      <td className="p-3 text-white/60 max-w-xs truncate" title={log.notes}>
                                        {log.notes || "-"}
                                      </td>
                                      <td className="p-4 text-center">
                                        {log.attachment_url ? (
                                          <a
                                            href={log.attachment_url}
                                            className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 transition"
                                          >
                                            <FileDown className="w-3.5 h-3.5" />
                                          </a>
                                        ) : (
                                          <span className="text-white/20">-</span>
                                        )}
                                      </td>
                                      <td className="p-3 text-center">
                                        <button
                                          onClick={() => handleEditLogClick(item, log)}
                                          className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-400 transition flex items-center justify-center mx-auto"
                                        >
                                          <Edit className="w-3 h-3" />
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
                  })}
                </div>

              </div>
            ))}
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