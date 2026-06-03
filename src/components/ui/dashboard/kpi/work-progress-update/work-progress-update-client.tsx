"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import AddData from "@/components/modals/kpi/work-progress-update/AddNewModal";
import React, { useState, useMemo } from "react";
import { getWorkProgressUpdate, getKpiProgressLogs } from "../../../../../lib/kpi/workProgressUpdate/view";

import {
  Search,
  Briefcase,
  ClipboardList,
  Edit,
  ArrowRight,
  Clock,
  Plus,
  User,
  ChevronDown, // 🌟 Menambahkan ikon chevron untuk indikator accordion
} from "lucide-react";

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
  const [jobDesks, setJobDesks] = useState<JobDeskKPI[]>(() => 
    (initialData ?? []).map(item => ({ ...item, daily_logs: item.daily_logs ?? [] }))
  );

  const [loadingLogId, setLoadingLogId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  /* ================= SILENT RE-FETCH MASTER KPI ================= */
  const fetchData = async () => {
    try {
      const res = await getWorkProgressUpdate("null", 9); 
      if (res?.success && res.data) {
        const rawItems = Array.isArray(res.data) ? res.data : [res.data];

        const mapped: JobDeskKPI[] = rawItems.map((item: any, index: number) => {
          const parsedId = Number(item.user_jobdesk_kpi_id || item.user_jobdesk_id || item.id);
          const finalId = isNaN(parsedId) || parsedId === 0 ? index + 1 : parsedId;
          const existingItem = jobDesks.find(j => j.id === finalId);

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
            accumulated_actual_value: item.accumulated_actual_value || item.actual_value || "-",
            final_score: Number(item.final_score || item.score || 0),
            period_month: Number(item.period_month ?? 0),
            period_year: Number(item.period_year ?? 0),
            status: item.status ?? "PENDING",
            daily_logs: existingItem ? existingItem.daily_logs : []
          };
        });

        setJobDesks(mapped);
      }
    } catch (err) {
      console.error("Gagal melakukan refresh data tracker:", err);
    }
  };

  /* ================= FETCH ON-DEMAND MENGGUNAKAN HELPER API BARU ================= */
  const handleToggleLogs = async (masterItem: JobDeskKPI) => {
    const isCurrentlyOpen = openRow === masterItem.id;

    if (isCurrentlyOpen) {
      setOpenRow(null);
      return;
    }

    setOpenRow(masterItem.id);
    setLoadingLogId(masterItem.id);

    try {
      const result = await getKpiProgressLogs(masterItem.id);

      if (result.success && result.data) {
        const mappedLogs: DailyProgressLog[] = result.data.map((log: any) => ({
          entry_id: Number(log.entry_id ?? 0),
          date: log.date ?? "-",
          actual_value_submitted: log.actual_value_submitted ?? "-",
          score_impact: Number(log.score_impact ?? 0),
          notes: log.notes ?? "-",
          attachment_url: log.attachment_url || undefined
        }));

        setJobDesks(prev => 
          prev.map(jobDesk => 
            jobDesk.id === masterItem.id ? { ...jobDesk, daily_logs: mappedLogs } : jobDesk
          )
        );
      }
    } catch (err) {
      console.error("Gagal memuat riwayat log harian dari server:", err);
    } finally {
      setLoadingLogId(null);
    }
  };

  /* ================= REFRESH SINGLE LOG SELESAI CRUD ================= */
  const handleRefreshSingleLog = async (kpiId: number) => {
    try {
      const result = await getKpiProgressLogs(kpiId);
      if (result.success && result.data) {
        const mappedLogs = result.data.map((log: any) => ({
          entry_id: Number(log.entry_id ?? 0),
          date: log.date,
          actual_value_submitted: log.actual_value_submitted,
          score_impact: Number(log.score_impact),
          notes: log.notes,
          attachment_url: log.attachment_url
        }));
        setJobDesks(prev => prev.map(jd => jd.id === kpiId ? { ...jd, daily_logs: mappedLogs } : jd));
      }
    } catch (err) {
      console.error("Gagal me-refresh spesifik log:", err);
    }
  };

  /* ================= FILTER & GROUPING LOGIC ================= */
  const filteredData = jobDesks.filter((item) =>
    item.job_title.toLowerCase().includes(search.toLowerCase()) ||
    item.user_name.toLowerCase().includes(search.toLowerCase()) ||
    item.kpi_name.toLowerCase().includes(search.toLowerCase())
  );

  const groupedData = useMemo(() => {
    return filteredData.reduce((groups, item) => {
      const nameKey = item.user_name || "Tanpa Nama";
      if (!groups[nameKey]) groups[nameKey] = [];
      groups[nameKey].push(item);
      return groups;
    }, {} as Record<string, JobDeskKPI[]>);
  }, [filteredData]);

  const handleCreateNewEntryClick = (masterItem: JobDeskKPI) => {
    setSelectedData({
      user_jobdesk_kpi_id: masterItem.id,
      user_name: masterItem.user_name,
      job_title: masterItem.job_title,
      kpi_name: masterItem.kpi_name,
      target_value: masterItem.target_value,
      actual_value_submitted: "", 
      score_impact: 0,
      notes: "",
      entry_id: null, 
      date: new Date().toISOString().split('T')[0] 
    });
    setIsModalOpen(true);
  };

  const handleEditLogClick = (masterItem: JobDeskKPI, log: DailyProgressLog) => {
    setSelectedData({
      user_jobdesk_kpi_id: masterItem.id,
      user_name: masterItem.user_name,
      job_title: masterItem.job_title,
      kpi_name: masterItem.kpi_name,
      target_value: masterItem.target_value,
      actual_value_submitted: log.actual_value_submitted,
      score_impact: log.score_impact,
      notes: log.notes,
      entry_id: log.entry_id,
      date: log.date
    });
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 text-white space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Work Progress Update</h1>
              <p className="text-sm text-white/50">Monitor performance accumulation grouped by employee names</p>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employee, job title, or KPI..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500/50 text-sm"
            />
          </div>
        </div>

        {/* LIST KPI */}
        {Object.keys(groupedData).length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-white/40">
            No KPI tracker data found
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedData).map(([userName, items]) => (
              <div key={userName} className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
                
                <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-purple-300 uppercase tracking-wide">{userName}</h2>
                    <p className="text-xs text-white/40">Memiliki {items.length} target KPI aktif</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {items.map((item) => {
                    const isOpen = openRow === item.id;
                    return (
                      <div key={item.id} className={`rounded-2xl border ${isOpen ? "border-cyan-500/30 bg-white/[0.04]" : "border-white/5 bg-white/5 hover:border-white/10"}`}>
                        <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          
                          <div className="flex items-start gap-3 truncate">
                            <Briefcase className="w-5 h-5 text-cyan-400 mt-1 shrink-0" />
                            <div>
                              <span className="text-sm font-bold block text-white">{item.kpi_name}</span>
                              <p className="text-xs text-white/50 line-clamp-1">Jabatan: {item.job_title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[11px] text-emerald-400 font-medium">Bobot: {item.weight}%</span>
                                <span className="text-white/20">•</span>
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                                  item.status === "APPROVED" ? "bg-green-500/10 border-green-500/20 text-green-400" :
                                  item.status === "PENDING" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" :
                                  "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                }`}>
                                  {item.status}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:flex items-center gap-4 border-t border-b lg:border-none border-white/5 py-2">
                            <div>
                              <span className="text-[10px] text-white/40 block uppercase tracking-wider">Target</span>
                              <p className="text-xs font-semibold">{item.target_value}</p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-white/20 hidden sm:block" />
                            <div>
                              <span className="text-[10px] text-white/40 block uppercase tracking-wider">Akumulasi</span>
                              <p className="text-xs font-bold text-cyan-400">{item.accumulated_actual_value}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            <div className="mr-2">
                              <span className="text-[9px] text-white/40 block uppercase">Score</span>
                              <p className="text-base font-extrabold text-emerald-400">{item.final_score}</p>
                            </div>
                            <button onClick={() => handleCreateNewEntryClick(item)} className="h-9 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs flex items-center gap-1 hover:opacity-90 transition">
                              <Plus className="w-3.5 h-3.5" /> New Entry
                            </button>
                            
                            {/* 🌟 DISINI PERUBAHANNYA: Mengganti teks angka menjadi ikon yang berputar/berubah saat open */}
                            <button 
                              onClick={() => handleToggleLogs(item)} 
                              disabled={loadingLogId === item.id}
                              className={`h-9 px-3 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition disabled:opacity-45 ${
                                isOpen 
                                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" 
                                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                              }`}
                            >
                              {loadingLogId === item.id ? (
                                "Loading..."
                              ) : (
                                <>
                                  <span>{isOpen ? "Hide Logs" : "View Logs"}</span>
                                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-cyan-400" : "text-white/50"}`} />
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* ACCORDION TABLE LOGS */}
                        {isOpen && (
                          <div className="border-t border-white/5 bg-black/40 p-4 space-y-3">
                            <div className="flex items-center gap-2 text-xs text-white/40 px-1">
                              <Clock className="w-3.5 h-3.5 text-cyan-500" />
                              <span>History Submisi harian untuk KPI ini</span>
                            </div>

                            {loadingLogId === item.id ? (
                              <div className="text-center py-6 text-xs text-cyan-400/70 tracking-wide animate-pulse">
                                Memuat histori data log dari server...
                              </div>
                            ) : (
                              <div className="overflow-x-auto rounded-xl border border-white/5">
                                <table className="w-full text-left text-xs">
                                  <thead>
                                    <tr className="bg-white/5 text-white/50 border-b border-white/5">
                                      <th className="p-3">Tanggal Log</th>
                                      <th className="p-3">Capaian Harian</th>
                                      <th className="p-3 text-center">Dampak Skor</th>
                                      <th className="p-3">Catatan / Keterangan</th>
                                      <th className="p-3 text-center">Aksi</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {!item.daily_logs || item.daily_logs.length === 0 ? (
                                      <tr>
                                        <td colSpan={5} className="p-4 text-center text-white/30">Belum ada progress log harian yang diisi.</td>
                                      </tr>
                                    ) : (
                                      item.daily_logs.map((log) => (
                                        <tr key={log.entry_id} className="border-b border-white/5 hover:bg-white/[0.01]">
                                          <td className="p-3">
                                            {new Date(log.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                          </td>
                                          <td className="p-3 font-medium text-white">{log.actual_value_submitted}</td>
                                          <td className="p-3 text-center text-emerald-400 font-bold">+{log.score_impact}</td>
                                          <td className="p-3 text-white/60 max-w-xs truncate" title={log.notes}>{log.notes}</td>
                                          <td className="p-3">
                                            <button onClick={() => handleEditLogClick(item, log)} className="w-7 h-7 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto hover:bg-amber-500/20 transition">
                                              <Edit className="w-3 h-3" />
                                            </button>
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}
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
        onSaveSuccess={async () => {
          await fetchData();
          if (openRow) {
            await handleRefreshSingleLog(openRow);
          }
        }} 
        data={selectedData}       
      />
    </DashboardLayout>
  );
}