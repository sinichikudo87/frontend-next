"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getTender } from "../../../../../lib/crm/follow-ups/view";
import { handleWhatsappShare } from "../../../../../lib/crm/follow-ups/whatsapp";
import {
  formatCurrency,
  formatDateIndonesia,
} from "@/lib/helpers/format";

import {
  ChevronDown,
  Search,
  CalendarDays,
  BadgeDollarSign,
  Share2,
  CheckCircle,
} from "lucide-react";

/* ================= TYPES ================= */

type UnitStatus = "pengajuan" | "approval" | "rejected";

type UnitDetail = {
  detail_id: number;
  category_id: number;
  category_name: string;
  qty: number;
  price_per_unit: number;
  subtotal: number;
  statusPenawaranDetails: UnitStatus;
};

type FollowUpHistory = {
  followup_id: number;
  stage: "1" | "2" | "3" | "4" | "5";
  date: string;
  user_id: number | null;
  notes: string | null;
  result: "pending" | "responded" | "no_answer" | "rejected";
  next_action_plan: string | null;
  created_at: string;
};

type FollowUp = {
  id: string;
  kode: string;
  customer: string;
  tanggal: string;
  total: number;
  status_penawaran: UnitStatus;
  followup_history: FollowUpHistory[];
  details: UnitDetail[];
};

export default function FollowUpPage() {
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [dataFollowUp, setDataFollowUp] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= SETTINGS ================= */
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const followUpSteps = [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
  ];

  /* ================= FETCH DATA ================= */

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getTender(1);

      if (res?.success && Array.isArray(res.data)) {
        const mapped: FollowUp[] = res.data.map((item: any) => ({
          id: item.id,
          kode: item.kode,
          customer: item.customer_name ?? "-",
          tanggal: item.tanggal,
          total: Number(item.total_harga || 0),
          status_penawaran: item.status_penawaran,
          followup_history: item.followup_history ?? [],
          details: (item.details || []).map((d: any) => ({
            detail_id: Number(d.detail_id),
            category_id: d.category_id,
            category_name: d.category_name,
            qty: Number(d.qty),
            price_per_unit: Number(d.price_per_unit),
            subtotal: Number(d.subtotal),
            statusPenawaranDetails: d.statusPenawaranDetails,
          })),
        }));
        setDataFollowUp(mapped);
      }
    } catch (err) {
      Swal.fire("Error", "Gagal memuat data follow up", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= FILTER & PAGINATION ================= */

  const filteredData = dataFollowUp.filter((item) =>
    item.kode.toLowerCase().includes(search.toLowerCase()) ||
    item.customer.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => { setCurrentPage(1); }, [search]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-white animate-pulse">Memuat data follow up...</div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 text-white space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <BadgeDollarSign className="w-4 h-4 text-black" />
              </div>
              <h1 className="text-xl font-bold tracking-wide">Follow Up List</h1>
            </div>
            <p className="text-sm text-white/50">Monitoring customer follow up activities</p>
          </div>

          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Cari kode atau customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {paginatedData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-white/40">
              Tidak ada data follow up ditemukan
            </div>
          ) : (
            paginatedData.map((item, index) => {
              const isOpen = openRow === item.id;

              return (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300">
                  <div className="p-5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                    {/* INFO LEFT */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 border border-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">
                        #{(currentPage - 1) * pageSize + index + 1}
                      </div>
                      <div>
                        <h2 className="font-bold text-yellow-400 text-lg tracking-wide">{item.kode}</h2>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            {formatDateIndonesia(item.tanggal)}
                          </div>
                          <div>Customer: <span className="text-white/80 font-medium">{item.customer}</span></div>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS RIGHT */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="px-5 py-2 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold">
                        {formatCurrency(item.total)}
                      </div>
                      <div className="flex items-center gap-2">
                        {followUpSteps.map((step) => {
                          const isCompleted = item.followup_history.some(
                            (history) => String(history.stage) === String(step.label)
                          );

                          return (
                            <button
                              key={step.id}
                              disabled={isCompleted}
                              onClick={() => handleWhatsappShare(item, step.label)}
                              className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center transition group active:scale-95 ${
                                isCompleted
                                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 opacity-60 cursor-not-allowed"
                                  : "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20"
                              }`}
                              title={
                                isCompleted
                                  ? `Follow Up ${step.label} Selesai`
                                  : `Share Follow Up ${step.label}`
                              }
                            >
                              {isCompleted ? (
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Share2 className="w-3 h-3 group-hover:scale-110 transition" />
                              )}

                              <span className="text-[8px] font-bold mt-0.5">
                                {step.label}
                              </span>
                            </button>
                          );
                        })}

                        <button
                          onClick={() => setOpenRow(isOpen ? null : item.id)}
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${
                            isOpen
                              ? "bg-yellow-500 text-black border-yellow-500"
                              : "bg-white/5 border-white/10 hover:bg-white/10"
                          }`}
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* TABLE DETAILS */}
                  {isOpen && (
                    <div className="p-5 border-t border-white/10 bg-black/20 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-white/40 border-b border-white/10">
                            <th className="pb-3 px-2 font-semibold uppercase tracking-wider">Unit Category</th>
                            <th className="pb-3 px-2 text-center font-semibold uppercase tracking-wider">Qty</th>
                            <th className="pb-3 px-2 text-right font-semibold uppercase tracking-wider">Price</th>
                            <th className="pb-3 px-2 text-right font-semibold uppercase tracking-wider text-yellow-400/80">Subtotal</th>
                            <th className="pb-3 px-2 text-center font-semibold uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {item.details.map((d) => (
                            <tr key={d.detail_id} className="group hover:bg-white/[0.02] transition">
                              <td className="py-4 px-2 font-medium text-white">{d.category_name}</td>
                              <td className="py-4 px-2 text-center text-white/70">{d.qty}</td>
                              <td className="py-4 px-2 text-right text-white/70">{formatCurrency(d.price_per_unit)}</td>
                              <td className="py-4 px-2 text-right">
                                <span className="text-yellow-400 font-bold">{formatCurrency(d.subtotal)}</span>
                              </td>
                              <td className="py-4 px-2">
                                <div className="flex items-center justify-center">
                                  {d.statusPenawaranDetails === "approval" ? (
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                                      Approved
                                    </span>
                                  ) : d.statusPenawaranDetails === "rejected" ? (
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                                      Rejected
                                    </span>
                                  ) : (
                                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 text-white/40 border border-white/10">
                                      Pending
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-xl transition ${currentPage === i + 1 ? "bg-yellow-500 text-black font-bold" : "bg-white/5 hover:bg-white/10"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              className="px-4 py-2 bg-white/5 rounded-xl hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}