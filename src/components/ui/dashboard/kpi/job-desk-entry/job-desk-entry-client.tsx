"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import AddData from "@/components/modals/kpi/job-desk-entry/AddNewModal";
import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";

import { getJobDeskEntry } from "../../../../../lib/kpi/jobDeskEntry/view";

import {
  Search,
  Briefcase,
  ClipboardList,
  User,
  Users,
  Edit,
  Award
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

interface JobDeskEntryClientProps {
  initialData: JobDeskKPI[];
}

export default function JobDeskEntryClient({ initialData }: JobDeskEntryClientProps) {
  const [search, setSearch] = useState("");
  const [jobDesks, setJobDesks] = useState<JobDeskKPI[]>(initialData ?? []);
  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<JobDeskKPI | null>(null);

  /* ================= DYNAMIC EMPLOYEE GRID DETECTOR ================= */
  const uniqueEmployees = useMemo(() => {
    return Array.from(new Set(jobDesks.map(item => item.user_name)));
  }, [jobDesks]);

  /* ================= SILENT RE-FETCH ================= */
  const refreshData = async () => {
    try {
      const res = await getJobDeskEntry(1); 
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
      console.error("Gagal menyegarkan data master job desk entry:", err);
    }
  };

  const handleSelectEmployee = (name: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleSelectRecord = (id: number) => {
    setSelectedRecords((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenUpdateModal = (item: JobDeskKPI) => {
    setSelectedData(item);
    setIsModalOpen(true);
  };

  /* ================= FILTER LOGIC ================= */
  const filteredData = jobDesks.filter((item) => {
    const matchesSearch = 
      item.job_title.toLowerCase().includes(search.toLowerCase()) ||
      item.user_name.toLowerCase().includes(search.toLowerCase()) ||
      item.kpi_name.toLowerCase().includes(search.toLowerCase());

    const matchesEmployeeGrid = 
      selectedEmployees.length === 0 || selectedEmployees.includes(item.user_name);

    return matchesSearch && matchesEmployeeGrid;
  });

  /* ================= GROUPING LOGIC (BY JOB TITLE) ================= */
  const groupedData = filteredData.reduce((groups, item) => {
    const title = item.job_title;
    if (!groups[title]) {
      groups[title] = [];
    }
    groups[title].push(item);
    return groups;
  }, {} as Record<string, JobDeskKPI[]>);

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
              <h1 className="text-2xl font-bold tracking-tight">Job Desk Entry</h1>
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
              placeholder="Search position, user, or KPI..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/30 text-sm"
            />
          </div>
        </div>

        {/* EMPLOYEE DATA GRID */}
        {uniqueEmployees.length > 0 && (
          <div className="p-5 bg-white/5 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-white/80">
              <Users className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Employee Filter Grid</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {uniqueEmployees.map((empName, index) => {
                const isEmpChecked = selectedEmployees.includes(empName);
                return (
                  <div
                    key={index}
                    onClick={() => handleSelectEmployee(empName)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 select-none ${
                      isEmpChecked 
                        ? "bg-purple-500/10 border-purple-500/40 shadow-md shadow-purple-500/5" 
                        : "bg-white/[0.02] border-white/5 hover:border-white/10"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isEmpChecked}
                      onChange={() => {}} 
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-0 cursor-pointer accent-purple-500 transition-all shrink-0"
                    />
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-white truncate">{empName}</p>
                      <p className="text-[10px] text-white/40">Employee</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
                {/* GROUP HEADER: NAMA JABATAN */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold tracking-tight text-white">{jobTitle}</h2>
                      <p className="text-xs text-white/40">
                        Total {items.length} KPI Indicator{items.length > 1 ? 's' : ''} under this position
                      </p>
                    </div>
                  </div>
                </div>

                {/* SUB-GRID: DAFTAR KPI DARI JABATAN */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => {
                    const isChecked = selectedRecords.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`rounded-2xl border border-white/5 bg-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                          isChecked ? "bg-cyan-500/[0.01] border-cyan-500/30 ring-1 ring-cyan-500/10" : ""
                        }`}
                      >
                        {/* CARD SUB-HEADER: EMPLOYEE NAME & CHECKBOX */}
                        <div className="p-4 pb-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 truncate">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleSelectRecord(item.id)}
                              className="w-4 h-4 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-0 cursor-pointer accent-cyan-500 shrink-0"
                            />
                            <div className="flex items-center gap-1.5 truncate">
                              <User className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span className="text-xs font-bold text-white/90 truncate">{item.user_name}</span>
                            </div>
                          </div>
                        </div>

                        {/* KPI CONTENT */}
                        <div className="px-4 py-2">
                          <div className="p-3 rounded-xl bg-black/20 border border-white/[0.02] min-h-[64px] flex flex-col justify-center">
                            <p className="text-[9px] text-white/30 uppercase tracking-wider font-semibold mb-0.5">KPI Objective</p>
                            <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">{item.kpi_name}</p>
                          </div>
                        </div>

                        {/* METRICS (TARGET VS ACCUMULATED) */}
                        <div className="px-4 py-2.5 grid grid-cols-2 gap-3 bg-black/10 border-t border-b border-white/[0.03]">
                          <div>
                            <span className="text-[9px] text-white/40 block uppercase tracking-wider">Target</span>
                            <p className="text-xs font-semibold text-white/90 truncate mt-0.5">{item.target_value}</p>
                          </div>
                          <div className="border-l border-white/5 pl-3">
                            <span className="text-[9px] text-white/40 block uppercase tracking-wider">Actual Acc.</span>
                            <p className="text-xs font-bold text-cyan-400 truncate mt-0.5">{item.accumulated_actual_value}</p>
                          </div>
                        </div>

                        {/* FOOTER ACTION */}
                        <div className="p-4 pt-2 flex items-center justify-between bg-white/[0.005]">
                          <div className="flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-xs font-extrabold text-emerald-400">{item.final_score}</span>
                          </div>

                          <button
                            onClick={() => handleOpenUpdateModal(item)}
                            className="flex items-center gap-1 h-8 px-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all text-[11px] font-medium text-white/80 hover:text-cyan-400"
                          >
                            <Edit className="w-3 h-3 text-white/40" />
                            <span>Update</span>
                          </button>
                        </div>

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
        onSaveSuccess={refreshData} 
        data={selectedData}       
      />
    </DashboardLayout>
  );
}