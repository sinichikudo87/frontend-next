"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";

import { getJobDeskEntry } from "../../../../../lib/kpi/jobDeskEntry/view";
import { saveJobDeskEntry } from "../../../../../store/kpi/jobDeskEntry/save";

import { Briefcase, ClipboardList, CheckSquare, Square } from "lucide-react";

/* ================= TYPES ================= */
type UserData = {
  id: number;
  company_id: number;
  division_id: number;
  name: string;
  email: string;
  telepon: string;
  is_active: number;
};

export type JobDeskKPI = {
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
  daily_logs: any[];
  department: string;
  target_indicator: string;
  is_active: number;
  created_at: string;
};

interface JobDeskEntryClientProps {
  initialData: JobDeskKPI[];
}

export default function JobDeskEntryClient({ initialData }: JobDeskEntryClientProps) {
  const [search, setSearch] = useState("");
  const [jobDesks, setJobDesks] = useState<JobDeskKPI[]>(initialData);
  const [users, setUsers] = useState<UserData[]>([]);

  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  /* ================= LOAD DATA ================= */
  const refreshData = async () => {
    try {
      const res: any = await getJobDeskEntry(1);
      if (!res?.success || !res.data) return;

      const rawJobDesks = res.data.job_desks ?? [];
      const rawUsers = res.data.users ?? [];

      const mappedKpi: JobDeskKPI[] = rawJobDesks.map((item: any) => ({
        id: Number(item.id ?? 0),
        company_id: Number(item.company_id ?? 1),
        job_title: item.job_title ?? "-",
        department: item.department ?? "-",
        kpi_name: item.kpi_name ?? "-",
        target_indicator: item.target_indicator ?? "-",
        weight: Number(item.weight ?? 0),
        is_active: Number(item.is_active ?? 0),
        created_at: item.created_at ?? "-"
      }));

      const mappedUsers: UserData[] = rawUsers.map((user: any) => ({
        id: Number(user.id),
        company_id: Number(user.company_id),
        division_id: Number(user.division_id),
        name: user.name ?? "-",
        email: user.email ?? "-",
        telepon: user.telepon ?? "-",
        is_active: Number(user.is_active)
      }));

      setJobDesks(mappedKpi);
      setUsers(mappedUsers);
    } catch (err) {
      console.error("refresh error:", err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  /* ================= HANDLERS ================= */
  const handleSelectRecord = (id: number) => {
    setSelectedRecords((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectUser = (id: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ================= CHECK ALL EMPLOYEE LOGIC ================= */
  const isAllEmployeesChecked = useMemo(() => {
    return users.length > 0 && selectedUserIds.length === users.length;
  }, [users, selectedUserIds]);

  const handleToggleAllEmployees = () => {
    if (isAllEmployeesChecked) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.map((u) => u.id));
    }
  };

  /* ================= BATCH SAVE ================= */
  const handleBatchSave = async () => {
    if (selectedRecords.length === 0) return;

    if (selectedUserIds.length === 0) {
      Swal.fire("Peringatan", "Pilih/centang minimal satu karyawan terlebih dahulu!", "warning");
      return;
    }

    setIsSaving(true);
    try {
      // 1. Ambil semua master KPI yang dicentang oleh user
      const selectedItems = jobDesks.filter((d) => selectedRecords.includes(d.id));

      // 2. MATRIKS KOMBINASI: Kombinasikan setiap Karyawan dengan setiap KPI yang dipilih
      const logs = selectedUserIds.flatMap((userId) => {
        const targetUser = users.find((u) => u.id === userId);

        return selectedItems.map((item) => ({
          company_id: item.company_id,
          user_id: userId, // 🌟 Sekarang menggunakan ID masing-masing karyawan hasil loop
          jobdesk_master_id: item.id,
          target_value: item.target_indicator,
          period_month: new Date().getMonth() + 1,
          period_year: new Date().getFullYear(),
          date: new Date().toISOString().split("T")[0],
          actual_value_submitted: item.weight.toString(),
          score_impact: item.weight,
          notes: `Batch save untuk karyawan: ${targetUser ? targetUser.name : "Unknown"}`,
          attachment_url: ""
        }));
      });

      console.log("Total logs dikirim ke Laravel:", logs.length, logs);
      const res = await saveJobDeskEntry({ logs });

      if (res.success) {
        await refreshData();
        setSelectedRecords([]);
        setSelectedUserIds([]);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Data progress log untuk ${selectedUserIds.length} karyawan berhasil disimpan!`,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", res.message || "Gagal menyimpan log", "error");
      }
    } catch (error: any) {
      Swal.fire("Error", error.message || "Terjadi kesalahan API", "error");
    } finally {
      setIsSaving(false);
    }
  };

  /* ================= FILTER & GROUPING ================= */
  const filteredJobDesks = useMemo(() => {
    return jobDesks.filter((item) => {
      return (
        item.job_title.toLowerCase().includes(search.toLowerCase()) ||
        item.kpi_name.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [jobDesks, search]);

  const groupedData = useMemo(() => {
    return filteredJobDesks.reduce((acc, item) => {
      if (!acc[item.job_title]) acc[item.job_title] = [];
      acc[item.job_title].push(item);
      return acc;
    }, {} as Record<string, JobDeskKPI[]>);
  }, [filteredJobDesks]);

  return (
    <DashboardLayout>
      <div className="p-4 space-y-6 text-white">

        {/* HEADER */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between relative z-10">
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/40">
                <ClipboardList className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">Work Progress Update</h1>
                <p className="text-purple-200/60 text-xs sm:text-sm font-medium mt-1">Total Job Desk Terfilter: {filteredJobDesks.length}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <div className="relative group w-full sm:w-72">
                <input
                  className="pl-4 pr-4 py-3 w-full rounded-xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm transition-all placeholder:text-gray-500"
                  placeholder="Search job desk..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {selectedRecords.length > 0 && (
                <button
                  onClick={handleBatchSave}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl transition-all font-bold text-sm shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  {isSaving ? "Saving..." : `Save (${selectedRecords.length})`}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* USER SECTION */}
        <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/5 pb-2">
            <div>
              <p className="text-sm font-semibold text-gray-400">Pilih Karyawan Target:</p>
              <p className="text-xs text-gray-500 mt-0.5">Selected: {selectedUserIds.length} / {users.length}</p>
            </div>

            {/* TOMBOL CHECK ALL EMPLOYEE */}
            {users.length > 0 && (
              <button
                type="button"
                onClick={handleToggleAllEmployees}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all text-xs font-semibold text-purple-400 self-start sm:self-auto"
              >
                {isAllEmployeesChecked ? (
                  <>
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Deselect All</span>
                  </>
                ) : (
                  <>
                    <Square className="w-3.5 h-3.5" />
                    <span>Select All Employees</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 pt-1">
            {users.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleSelectUser(user.id)}
                className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border transition-all ${selectedUserIds.includes(user.id)
                    ? "bg-purple-600/30 border-purple-500 text-purple-200"
                    : "bg-white/5 border-white/5 hover:bg-white/10 text-gray-300"
                  }`}
              >
                {selectedUserIds.includes(user.id) ? <CheckSquare className="w-4 h-4 text-purple-400" /> : <Square className="w-4 h-4 text-gray-500" />}
                <div className="truncate text-sm">{user.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* JOB DESK SECTION */}
        {Object.keys(groupedData).length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm bg-white/5 rounded-xl border border-white/10">Data tidak ditemukan.</div>
        ) : (
          Object.entries(groupedData).map(([title, items]) => (
            <div key={title} className="space-y-3">
              <div className="flex items-center gap-2 mt-6 border-b border-white/5 pb-2">
                <Briefcase className="w-5 h-5 text-cyan-400" />
                <h2 className="font-bold text-lg text-white">{title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border ${selectedRecords.includes(item.id) ? "bg-cyan-500/10 border-cyan-500/30" : "bg-white/5 border-white/10"}`}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 accent-cyan-500 w-4 h-4" checked={selectedRecords.includes(item.id)} onChange={() => handleSelectRecord(item.id)} />
                      <div>
                        <p className="font-medium text-cyan-300 text-sm">{item.department}</p>
                        <p className="text-sm mt-1 text-gray-300 font-semibold">{item.kpi_name}</p>
                        <p className="text-xs text-gray-400 mt-2">Target: {item.target_indicator} | Weight: {item.weight}%</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}