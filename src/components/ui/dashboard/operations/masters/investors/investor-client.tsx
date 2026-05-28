"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  Search,
  User,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Users,
  MoreVertical,
  Plus, // <-- 1. Import icon Plus di sini
} from "lucide-react";

/* ================= TYPES ================= */

type Investor = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  is_active: number;
};

interface FormInvestorProps {
  initialData: Investor[];
}

export default function InvestorPage({ initialData }: FormInvestorProps) {
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [Investor] = useState<Investor[]>(initialData);

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  /* ================= FILTER ================= */
  const filteredData = Investor.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= PAGINATION LOGIC ================= */
  const totalPages = Math.ceil(filteredData.length / pageSize);

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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Investor Management</h1>
                <p className="text-sm text-white/50">
                  Total Investor: {filteredData.length}
                </p>
              </div>
            </div>
          </div>

          {/* SEARCH & ADD BUTTON CONTAINER */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            {/* SEARCH */}
            <div className="relative w-full sm:w-[260px] md:w-[320px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari investor..."
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 outline-none animate-fade-in"
              />
            </div>

            {/* TOMBOL TAMBAH DATA */}
            <button
              onClick={() => {
                // Tambahkan fungsi/modal tambah data di sini
                Swal.fire({
                  title: 'Tambah Investor',
                  text: 'Fitur tambah data akan segera hadir!',
                  icon: 'info',
                  confirmButtonColor: '#06b6d4'
                });
              }}
              className="w-full sm:w-auto h-12 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-medium text-black flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 transition active:scale-95"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Tambah Data</span>
            </button>
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {paginatedData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
              Tidak ada data investor
            </div>
          ) : (
            paginatedData.map((item) => {
              const isOpen = openRow === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  {/* ROW HEADER */}
                  <div className="p-5 flex items-center justify-between">
                    {/* LEFT INFO */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-cyan-400" />
                      </div>

                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h2 className="text-lg font-bold text-white">{item.name}</h2>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              item.is_active === 1
                                ? "bg-green-500/10 border-green-500/20 text-green-400"
                                : "bg-red-500/10 border-red-500/20 text-red-400"
                            }`}
                          >
                            {item.is_active === 1 ? "ACTIVE" : "INACTIVE"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-white/50 mt-1">
                          <Phone className="w-4 h-4" />
                          <span>{item.phone}</span>
                          <span>•</span>
                          <Mail className="w-4 h-4" />
                          <span>{item.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          // Tambahkan aksi tombol menu di sini jika perlu
                        }}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center"
                      >
                        <MoreVertical className="w-5 h-5 text-white/70" />
                      </button>

                      <button
                        onClick={() => setOpenRow(isOpen ? null : item.id)}
                        className={`w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition ${
                          isOpen ? "bg-cyan-500 text-black" : "bg-white/5 hover:bg-white/10"
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

                  {/* DETAILS ACCORDION */}
                  {isOpen && (
                    <div className="border-t border-white/10 p-5 bg-black/10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                              <Phone className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                              <p className="text-xs text-white/40">Phone Number</p>
                              <h3 className="font-semibold text-white">{item.phone}</h3>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                              <Mail className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-xs text-white/40">Email Address</p>
                              <h3 className="font-semibold text-white break-all">{item.email}</h3>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 md:col-span-2">
                          <div className="flex items-start gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-orange-400" />
                            </div>
                            <div>
                              <p className="text-xs text-white/40">Address</p>
                              <h3 className="font-semibold text-white">{item.address}</h3>
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

        {/* PAGINATION BUTTONS */}
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
                className={`px-4 py-2 rounded-xl transition ${
                  currentPage === i + 1 ? "bg-cyan-500 text-black font-semibold" : "bg-white/5 hover:bg-white/10"
                }`}
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
    </DashboardLayout>
  );
}