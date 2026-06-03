"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useState, useMemo, useEffect } from "react";

import {
  Search,
  Target,
  Briefcase,
  Building2,
  TrendingUp,
  ChevronDown,
  Activity,
  User,
} from "lucide-react";

type Reporting = {
  user_jobdesk_kpi_id: number;
  company_id: number;
  user_id: number;
  user_name: string;
  master_kpi_id: number;
  job_title: string;
  kpi_name: string;
  target_indicator: string;
  weight: number;
  department_id: number;
  department_name: string;
  target_value: number;
  actual_value: number;
  score: number;
  period_month: string;
  period_year: string;
  status: string;
  notes: string;
  total_daily_logs: number;
  total_score_impact: number;
  last_progress_date: string;
  latest_actual_progress: string;
};

export default function ReportingClient({
  initialData,
}: {
  initialData: Reporting[];
}) {
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);

  // 🌟 STATE PAGINASI
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Menampilkan 3 karyawan per halaman (Silakan ganti sesuai kebutuhan)

  /*
  |--------------------------------------------------------------------------
  | FILTER DATA
  |--------------------------------------------------------------------------
  */
  const filteredData = useMemo(() => {
    return initialData.filter(
      (item) =>
        item.job_title.toLowerCase().includes(search.toLowerCase()) ||
        item.kpi_name.toLowerCase().includes(search.toLowerCase()) ||
        item.user_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [initialData, search]);

  /*
  |--------------------------------------------------------------------------
  | LOGIKA GROUPING BERDASARKAN NAMA KARYAWAN
  |--------------------------------------------------------------------------
  */
  const groupedByUser = useMemo(() => {
    return filteredData.reduce((acc, item) => {
      const key = item.user_name || "Tanpa Nama"; 
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as Record<string, Reporting[]>);
  }, [filteredData]);

  /*
  |--------------------------------------------------------------------------
  | 🌟 LOGIKA PAGINASI UNTUK GRUP KARYAWAN 🌟
  |--------------------------------------------------------------------------
  */
  const userEntries = useMemo(() => Object.entries(groupedByUser), [groupedByUser]);
  
  const totalPages = Math.ceil(userEntries.length / pageSize);

  const paginatedUserEntries = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return userEntries.slice(startIndex, startIndex + pageSize);
  }, [userEntries, currentPage, pageSize]);

  // Reset ke halaman 1 jika user melakukan pencarian
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 text-white space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">KPI Reporting</h1>
              <p className="text-sm text-white/50">
                Total: {userEntries.length} Karyawan ({filteredData.length} KPI Record)
              </p>
            </div>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Nama, KPI atau Jabatan..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500 transition-all"
            />
          </div>
        </div>

        {/* LIST DENGAN GROUPING USER & PAGINASI */}
        <div className="space-y-8">
          {paginatedUserEntries.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-white/40">
              Tidak ada data KPI
            </div>
          ) : (
            // Loop data karyawan yang sudah dipaginasi
            paginatedUserEntries.map(([userName, userKpis]) => (
              <div key={userName} className="space-y-4">
                
                {/* HEADLINE NAMA KARYAWAN */}
                <div className="flex items-center gap-2 border-b border-white/10 pb-2 mt-4">
                  <User className="w-5 h-5 text-purple-400" />
                  <h2 className="font-extrabold text-lg text-purple-300 tracking-wide uppercase">
                    {userName} <span className="text-sm font-normal text-white/40 lowercase">({userKpis.length} kpi assignment)</span>
                  </h2>
                </div>

                {/* Grid Tugas KPI */}
                <div className="grid grid-cols-1 gap-4">
                  {userKpis.map((item) => (
                    <div
                      key={item.user_jobdesk_kpi_id}
                      className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden transition-all hover:border-white/20"
                    >
                      <div className="p-5 flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                            <Target className="w-6 h-6 text-cyan-400" />
                          </div>

                          <div>
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="text-lg font-bold">{item.kpi_name}</h3>
                              <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                                {item.status}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-white/50 mt-2">
                              <div className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4 text-white/30" />
                                {item.job_title}
                              </div>
                              <div className="flex items-center gap-1">
                                <Building2 className="w-4 h-4 text-white/30" />
                                {item.department_name}
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4 text-cyan-500/50" />
                                <span className="text-cyan-400 font-semibold">Score: {item.score}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            setOpenRow(openRow === item.user_jobdesk_kpi_id ? null : item.user_jobdesk_kpi_id)
                          }
                          className={`w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition-all ${
                            openRow === item.user_jobdesk_kpi_id ? "bg-cyan-500 text-black border-cyan-500" : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              openRow === item.user_jobdesk_kpi_id ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* AREA DETAIL EXPANDABLE */}
                      {openRow === item.user_jobdesk_kpi_id && (
                        <div className="border-t border-white/10 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-black/20">
                          <InfoBox label="Target" value={item.target_value} />
                          <InfoBox label="Actual" value={item.actual_value} />
                          <InfoBox label="Weight" value={`${item.weight}%`} />
                          <InfoBox label="Total Daily Logs" value={item.total_daily_logs} />
                          <InfoBox label="Total Score Impact" value={item.total_score_impact} />
                          <InfoBox label="Latest Progress" value={item.latest_actual_progress} />
                          <InfoBox label="Last Progress Date" value={item.last_progress_date} />
                          <div className="sm:col-span-2 md:col-span-3">
                            <InfoBox label="Notes" value={item.notes} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            ))
          )}
        </div>

        {/* 🌟 NAVIGASI PAGINASI DI BAGIAN BAWAH 🌟 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-6 border-t border-white/5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 text-sm font-medium transition-all"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all border ${
                  currentPage === i + 1
                    ? "bg-cyan-500 text-black border-cyan-500"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 text-sm font-medium transition-all"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

const InfoBox = ({ label, value }: { label: string; value: any }) => (
  <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-4 transition-all hover:bg-white/[0.04]">
    <p className="text-xs text-white/40 font-medium tracking-wide">{label}</p>
    <h3 className="font-semibold mt-1 text-sm md:text-base text-white/90">{value || "-"}</h3>
  </div>
);