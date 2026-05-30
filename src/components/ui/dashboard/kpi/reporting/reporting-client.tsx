"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useEffect, useState } from "react";

import {
  Search,
  Target,
  Briefcase,
  Building2,
  TrendingUp,
  ChevronDown,
  Activity,
} from "lucide-react";

type Reporting = {
  user_jobdesk_kpi_id: number;

  company_id: number;
  user_id: number;

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

  const [openRow, setOpenRow] =
    useState<number | null>(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const pageSize = 5;

  /*
  |--------------------------------------------------------------------------
  | FILTER
  |--------------------------------------------------------------------------
  */

  const filteredData = initialData.filter(
    (item) =>
      item.job_title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.kpi_name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  /*
  |--------------------------------------------------------------------------
  | PAGINATION
  |--------------------------------------------------------------------------
  */

  const totalPages = Math.ceil(
    filteredData.length / pageSize
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
              <h1 className="text-2xl font-bold">
                KPI Reporting
              </h1>

              <p className="text-sm text-white/50">
                Total Data: {filteredData.length}
              </p>
            </div>
          </div>

          {/* SEARCH */}

          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Cari KPI..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 outline-none"
            />
          </div>
        </div>

        {/* LIST */}

        <div className="space-y-4">
          {paginatedData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-white/40">
              Tidak ada data KPI
            </div>
          ) : (
            paginatedData.map((item) => (
              <div
                key={item.user_jobdesk_kpi_id}
                className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <div className="p-5 flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-cyan-400" />
                    </div>

                    <div>

                      <div className="flex items-center gap-3 flex-wrap">

                        <h2 className="text-lg font-bold">
                          {item.kpi_name}
                        </h2>

                        <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {item.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm text-white/50 mt-2">

                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {item.job_title}
                        </div>

                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {item.department_name}
                        </div>

                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          Score: {item.score}
                        </div>

                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setOpenRow(
                        openRow ===
                          item.user_jobdesk_kpi_id
                          ? null
                          : item.user_jobdesk_kpi_id
                      )
                    }
                    className={`w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center ${
                      openRow ===
                      item.user_jobdesk_kpi_id
                        ? "bg-cyan-500 text-black"
                        : "bg-white/5"
                    }`}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openRow ===
                        item.user_jobdesk_kpi_id
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
                </div>

                {/* DETAIL */}

                {openRow ===
                  item.user_jobdesk_kpi_id && (
                  <div className="border-t border-white/10 p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/10">

                    <InfoBox
                      label="Target"
                      value={item.target_value}
                    />

                    <InfoBox
                      label="Actual"
                      value={item.actual_value}
                    />

                    <InfoBox
                      label="Weight"
                      value={item.weight}
                    />

                    <InfoBox
                      label="Total Daily Logs"
                      value={item.total_daily_logs}
                    />

                    <InfoBox
                      label="Total Score Impact"
                      value={item.total_score_impact}
                    />

                    <InfoBox
                      label="Latest Progress"
                      value={
                        item.latest_actual_progress
                      }
                    />

                    <InfoBox
                      label="Last Progress Date"
                      value={
                        item.last_progress_date
                      }
                    />

                    <div className="md:col-span-2">
                      <InfoBox
                        label="Notes"
                        value={item.notes}
                      />
                    </div>

                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.max(p - 1, 1)
                )
              }
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-white/5 disabled:opacity-30"
            >
              Prev
            </button>

            {Array.from(
              { length: totalPages },
              (_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setCurrentPage(i + 1)
                  }
                  className={`px-4 py-2 rounded-xl ${
                    currentPage === i + 1
                      ? "bg-cyan-500 text-black"
                      : "bg-white/5"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(p + 1, totalPages)
                )
              }
              disabled={
                currentPage === totalPages
              }
              className="px-4 py-2 rounded-xl bg-white/5 disabled:opacity-30"
            >
              Next
            </button>

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

const InfoBox = ({
  label,
  value,
}: {
  label: string;
  value: any;
}) => (
  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
    <p className="text-xs text-white/40">
      {label}
    </p>

    <h3 className="font-semibold mt-1">
      {value || "-"}
    </h3>
  </div>
);