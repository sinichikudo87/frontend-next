"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import AddData from "@/components/modals/kpi/job-desk-entry/AddNewModal";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { getJobDeskEntry } from "../../../../../lib/kpi/jobDeskEntry/view";

import {
  Search,
  Briefcase,
  ArrowRight,
  ClipboardList,
  User,
  Users,
  Edit,
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

export default function JobDeskEntryClient() {
  const [search, setSearch] = useState("");
  const [jobDesks, setJobDesks] = useState<JobDeskKPI[]>([]);
  const [loading, setLoading] = useState(true);
  
  /* ================= STATE CHECKLIST RECORD ================= */
  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);

  /* ================= STATE CHECKLIST EMPLOYEE GRID ================= */
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

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

  /* ================= GET UNIQUE EMPLOYEES FOR GRID ================= */
  const uniqueEmployees = Array.from(new Set(jobDesks.map(item => item.user_name)));

  /* ================= HANDLER CHECKBOX EMPLOYEE GRID ================= */
  const handleSelectEmployee = (name: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  /* ================= FILTER ================= */
  const filteredData = jobDesks.filter((item) => {
    const matchesSearch = 
      item.job_title.toLowerCase().includes(search.toLowerCase()) ||
      item.user_name.toLowerCase().includes(search.toLowerCase()) ||
      item.kpi_name.toLowerCase().includes(search.toLowerCase());

    const matchesEmployeeGrid = 
      selectedEmployees.length === 0 || selectedEmployees.includes(item.user_name);

    return matchesSearch && matchesEmployeeGrid;
  });

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedEmployees]);

  /* ================= HANDLER CHECKBOX ================= */
  const handleSelectRecord = (id: number) => {
    setSelectedRecords((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  /* ================= HANDLER ACTION UPDATE ================= */
  const handleOpenUpdateModal = (item: JobDeskKPI) => {
    setSelectedData(item);
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
              <h1 className="text-2xl font-bold tracking-tight">Job Desk Entry</h1>
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

        {/* ================= EMPLOYEE DATA GRID (ABOVE LIST) ================= */}
        {uniqueEmployees.length > 0 && (
          <div className="p-5 bg-white/5 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-white/80">
              <Users className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Employee Data Grid Selection</h3>
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

        {/* CONTAINER MAIN LIST */}
        <div className="space-y-4">
          {paginatedData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-white/40">
              No KPI tracker data found
            </div>
          ) : (
            paginatedData.map((item) => {
              const isChecked = selectedRecords.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border border-white/10 bg-white/5 transition-all ${
                    isChecked ? "bg-cyan-500/[0.02] border-cyan-500/20" : ""
                  }`}
                >
                  {/* ACCUMULATED MAIN SUMMARY CARD */}
                  <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    <div className="flex items-start sm:items-center gap-4">
                      {/* INTERACTIVE CHECKBOX */}
                      <div className="flex items-center h-14 shrink-0 pl-1">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRecord(item.id)}
                          className="w-5 h-5 rounded-lg border-white/20 bg-white/5 text-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-cyan-500 transition-all"
                        />
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
                        <Briefcase className="w-6 h-6 text-cyan-400" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-lg font-bold text-white">{item.job_title}</h2>
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

                    {/* ACTION REGION: SCORE & UPDATE BUTTON */}
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="text-left lg:text-right">
                        <p className="text-[10px] text-white/40 uppercase">Final Score</p>
                        <p className="text-lg font-extrabold text-emerald-400">{item.final_score}</p>
                      </div>

                      {/* BUTTON UPDATE TO SHOW MODAL */}
                      <button
                        onClick={() => handleOpenUpdateModal(item)}
                        className="flex items-center gap-2 h-11 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all group text-sm font-medium text-white/80 hover:text-cyan-400 shadow-sm"
                      >
                        <Edit className="w-4 h-4 text-white/40 group-hover:text-cyan-400 transition-colors" />
                        <span>Update</span>
                      </button>
                    </div>

                  </div>
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