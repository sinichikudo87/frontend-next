"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useEffect, useState } from "react";

import {
  Search,
  Briefcase,
  Target,
  FileText,
  Percent,
  ChevronDown,
  ClipboardList,
  CalendarDays,
  CheckCircle2,
  Clock3,
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

  master_kpi_id: number;

  department_id: number;
  department_name: string;

  job_title: string;

  kpi_name: string;

  target_indicator: string;

  weight: number;

  target_value: string;

  actual_value: string;

  score: number;

  total_score_impact: number;

  period_month: number;
  period_year: number;

  status: string;

  notes: string;

  total_daily_logs: number;

  last_progress_date: string | null;

  latest_actual_progress: string | null;

  daily_logs: DailyProgressLog[];
};

interface ReportingClientProps {
  initialData: JobDeskKPI[];
}

export default function ReportingClient({
  initialData,
}: ReportingClientProps) {

  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);

  const [jobDesks, setJobDesks] = useState<JobDeskKPI[]>(
    initialData ?? []
  );

  /* ================= FILTER ================= */

  const filteredData = jobDesks.filter((item) =>
    item.job_title
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    item.department_name
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    item.kpi_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    setJobDesks(initialData ?? []);
  }, [initialData]);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 text-white space-y-6">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                KPI Reporting
              </h1>

              <p className="text-sm text-white/50">
                Total Reporting: {filteredData.length}
              </p>
            </div>
          </div>

          {/* SEARCH */}

          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reporting..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
        </div>

        {/* ================= LIST ================= */}

        <div className="space-y-4">

          {filteredData.length === 0 ? (

            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-white/40">
              Tidak ada data reporting
            </div>

          ) : (

            filteredData.map((item) => {

              const isOpen = openRow === item.id;

              return (
                <div
                  key={item.id}
                  className="
                    rounded-3xl
                    border border-white/10
                    bg-white/5
                    overflow-hidden
                  "
                >

                  {/* ================= MAIN HEADER ================= */}

                  <div className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    {/* LEFT */}

                    <div className="flex items-start gap-4">

                      <div className="
                        w-14 h-14 shrink-0
                        rounded-2xl
                        bg-gradient-to-br
                        from-cyan-500/20
                        to-blue-500/20
                        border border-cyan-400/20
                        flex items-center justify-center
                      ">
                        <Briefcase className="w-6 h-6 text-cyan-400" />
                      </div>

                      <div className="space-y-2">

                        <div className="flex items-center gap-3 flex-wrap">

                          <h2 className="text-lg font-bold text-white">
                            {item.job_title}
                          </h2>

                          <span
                            className={`
                              px-3 py-1 rounded-full
                              text-xs font-semibold border

                              ${
                                item.status === "APPROVED"
                                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                                  : item.status === "REJECTED"
                                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                                  : item.status === "REVIEW"
                                  ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                                  : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                              }
                            `}
                          >
                            {item.status}
                          </span>

                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-white/50">

                          <Target className="w-4 h-4 text-purple-400" />

                          <span>
                            Dept: {item.department_name}
                          </span>

                          <span>•</span>

                          <Percent className="w-4 h-4 text-emerald-400" />

                          <span>
                            Weight: {item.weight}%
                          </span>

                          <span>•</span>

                          <CalendarDays className="w-4 h-4 text-orange-400" />

                          <span>
                            {item.period_month}/{item.period_year}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* RIGHT */}

                    <div className="flex items-center gap-3">

                      <div className="text-right">

                        <p className="text-xs text-white/40">
                          Final Score
                        </p>

                        <h3 className="text-2xl font-black text-cyan-400">
                          {item.score}
                        </h3>

                      </div>

                      <button
                        onClick={() =>
                          setOpenRow(
                            isOpen ? null : item.id
                          )
                        }
                        className={`
                          w-11 h-11 rounded-xl
                          border border-white/10
                          flex items-center justify-center
                          transition

                          ${
                            isOpen
                              ? "bg-cyan-500 text-black border-cyan-500"
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

                  {/* ================= EXPANDABLE ================= */}

                  {isOpen && (

                    <div className="border-t border-white/10 p-5 bg-black/10">

                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                              <Target className="w-5 h-5 text-cyan-400" />
                            </div>

                            <div>
                              <p className="text-xs text-white/40">
                                KPI
                              </p>

                              <h3 className="font-semibold text-white">
                                {item.kpi_name}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5 text-purple-400" />
                            </div>

                            <div>
                              <p className="text-xs text-white/40">
                                Target
                              </p>

                              <h3 className="font-semibold text-white">
                                {item.target_value}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                              <Percent className="w-5 h-5 text-emerald-400" />
                            </div>

                            <div>
                              <p className="text-xs text-white/40">
                                Actual Progress
                              </p>

                              <h3 className="font-semibold text-white">
                                {item.actual_value || "-"}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                              <Clock3 className="w-5 h-5 text-orange-400" />
                            </div>

                            <div>
                              <p className="text-xs text-white/40">
                                Total Logs
                              </p>

                              <h3 className="font-semibold text-white">
                                {item.total_daily_logs}
                              </h3>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* TARGET INDICATOR */}

                      <div className="
                        mt-5
                        rounded-2xl
                        bg-white/[0.03]
                        border border-white/10
                        p-5
                      ">

                        <div className="flex items-start gap-3">

                          <div className="w-11 h-11 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-orange-400" />
                          </div>

                          <div>
                            <p className="text-xs text-white/40">
                              Target & Indicator
                            </p>

                            <h3 className="font-semibold text-white mt-1">
                              {item.target_indicator}
                            </h3>

                            <p className="text-sm text-white/50 mt-3">
                              {item.notes || "-"}
                            </p>
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

      </div>
    </DashboardLayout>
  );
}