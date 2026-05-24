"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import AddData from "@/components/modals/kpi/job-desk-master/AddNewModal";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { getJobDeskMaster } from "../../../../../lib/kpi/jobDeskMaster/view";

import {
  Search,
  Briefcase,
  Target,
  FileText,
  Percent,
  ChevronDown,
  ClipboardList,
  MoreVertical,
  Plus,
} from "lucide-react";

/* ================= TYPES ================= */

type JobDeskKPI = {
  id: number;
  job_title: string;
  department: string;
  kpi_name: string;
  target_indicator: string;
  weight: number;
  is_active: number;
};

export default function JobDeskMasterClient() {
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [jobDesks, setJobDesks] = useState<JobDeskKPI[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= STATE MODAL (FIXED) ================= */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getJobDeskMaster(1); 

      if (res?.success && res.data) {
        const rawItems = Array.isArray(res.data) ? res.data : [res.data];

        const mapped: JobDeskKPI[] = rawItems.map((item: any) => ({
          id: Number(item.id),
          job_title: item.job_title ?? "-",
          department: item.department ?? "-",
          kpi_name: item.kpi_name ?? "-",
          target_indicator: item.target_indicator ?? "-",
          weight: Number(item.weight ?? 0),
          is_active: Number(item.is_active ?? 1),
        }));

        setJobDesks(mapped);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data Master Job Desk KPI",
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
    item.department.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-white animate-pulse">
          Memuat data master job desk KPI...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 text-white space-y-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          {/* KIRI: JUDUL & TOTAL */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Job Desk Master</h1>
              <p className="text-sm text-white/50">
                Total Job Desk: {filteredData.length}
              </p>
            </div>
          </div>

          {/* KANAN: SEARCH & BUTTON TAMBAH */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* SEARCH */}
            <div className="relative w-full sm:w-[260px] md:w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            {/* TOMBOL TAMBAH DATA (FIXED: BUKA MODAL) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="
                flex items-center justify-center gap-2 
                h-12 px-5 rounded-2xl 
                bg-gradient-to-r from-cyan-500 to-blue-600 
                hover:from-cyan-600 hover:to-blue-700 
                transition-all duration-200 
                shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20
                text-sm font-semibold text-white
                active:scale-95
                whitespace-nowrap
              "
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New</span>
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {paginatedData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
              Tidak ada data master job desk
            </div>
          ) : (
            paginatedData.map((item) => {
              const isOpen = openRow === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  {/* HEADER LIST */}
                  <div className="p-5 flex items-center justify-between">
                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          w-14 h-14
                          rounded-2xl
                          bg-gradient-to-br from-cyan-500/20 to-blue-500/20
                          border border-cyan-400/20
                          flex items-center justify-center
                        "
                      >
                        <Briefcase className="w-6 h-6 text-cyan-400" />
                      </div>

                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-lg font-bold text-white">
                            {item.job_title}
                          </h2>
                          <span
                            className={`
                              px-3 py-1 rounded-full text-xs font-semibold border
                              ${
                                item.is_active === 1
                                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                                  : "bg-red-500/10 border-red-500/20 text-red-400"
                              }
                            `}
                          >
                            {item.is_active === 1 ? "ACTIVE" : "INACTIVE"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-white/50 mt-1">
                          <Target className="w-4 h-4 text-purple-400" />
                          <span>Dept: {item.department}</span>
                          <span>•</span>
                          <Percent className="w-4 h-4 text-emerald-400" />
                          <span>Bobot: {item.weight}%</span>
                        </div>
                      </div>
                    </div>

                    {/* ACTION */}
                    <div className="flex items-center gap-2">
                      {/* MENU */}
                      <button
                        onClick={() => {}}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center"
                      >
                        <MoreVertical className="w-5 h-5 text-white/70" />
                      </button>

                      {/* EXPAND */}
                      <button
                        onClick={() => setOpenRow(isOpen ? null : item.id)}
                        className={`
                          w-10 h-10
                          rounded-xl
                          border border-white/10
                          flex items-center justify-center
                          transition
                          ${
                            isOpen
                              ? "bg-cyan-500 text-black"
                              : "bg-white/5 hover:bg-white/10"
                          }
                        `}
                      >
                        <ChevronDown
                          className={`
                            w-5 h-5
                            transition-transform duration-300
                            ${isOpen ? "rotate-180" : ""}
                          `}
                        />
                      </button>
                    </div>
                  </div>

                  {/* DETAILS (EXPANDABLE) */}
                  {isOpen && (
                    <div className="border-t border-white/10 p-5 bg-black/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* KPI NAME */}
                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                              <Target className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                              <p className="text-xs text-white/40">Parameter KPI</p>
                              <h3 className="font-semibold text-white">
                                {item.kpi_name}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* WEIGHT */}
                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                              <Percent className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-xs text-white/40">Bobot Nilai</p>
                              <h3 className="font-semibold text-white">
                                {item.weight}%
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* TARGET INDICATOR */}
                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 md:col-span-2">
                          <div className="flex items-start gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-orange-400" />
                            </div>
                            <div>
                              <p className="text-xs text-white/40">Target & Indikator Keberhasilan</p>
                              <h3 className="font-semibold text-white mt-1">
                                {item.target_indicator}
                              </h3>
                            </div>
                          </div>
                        </div>

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
          <div className="flex justify-center gap-2 pt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`
                  px-4 py-2 rounded-xl transition
                  ${
                    currentPage === i + 1
                      ? "bg-cyan-500 text-black font-semibold"
                      : "bg-white/5 hover:bg-white/10"
                  }
                `}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition"
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* RENDER MODAL */}
      <AddData 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </DashboardLayout>
  );
}