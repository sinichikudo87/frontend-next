"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import EditQuotationModal from "@/components/modals/crm/tenders/EditQuotationModal";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { getTender } from "../../../../../lib/crm/tenders/view";
import { updateStatusTenderHeader, updateStatusTenderDetail } from "../../../../../lib/crm/tenders/update";
import { handleWhatsappShare } from "../../../../../lib/crm/tenders/whatsapp";

import {
  Edit2,
  Check,
  X,
  ChevronDown,
  Search,
  CalendarDays,
  BadgeDollarSign,
  Share2,
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

type Penawaran = {
  id: string;
  kode: string;
  customer: string;
  tanggal: string;
  total: number;
  status_penawaran: UnitStatus;
  details: UnitDetail[];
};

export default function TendersKlient() {
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [dataPenawaran, setDataPenawaran] = useState<Penawaran[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<UnitDetail | null>(null);

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  /* ================= FETCH ================= */

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await getTender(1);

      if (res?.success && Array.isArray(res.data)) {
        const mapped: Penawaran[] = res.data.map((item: any) => ({
          id: item.id,
          kode: item.kode,
          customer: item.customer_name ?? "-",
          tanggal: item.tanggal,
          total: Number(item.total_harga || 0),
          status_penawaran: item.status_penawaran ?? item.statusPenawaran ?? "",

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

        setDataPenawaran(mapped);
      }
    } catch (err) {
      Swal.fire("Error", "Gagal memuat data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= FORMAT ================= */

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount).replace("Rp", "Rp ");

  /* ================= FILTER ================= */

  const filteredData = dataPenawaran.filter((item) =>
    item.kode.toLowerCase().includes(search.toLowerCase())
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

  /* ================= STATUS ================= */

  const handleStatus = async (id: number, status: number) => {
    try {
      Swal.fire({
        title: "Updating...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await updateStatusTenderDetail(id, { is_status: status });

      await fetchData();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: status === 1 ? "Unit Approved" : "Unit Rejected",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err?.message || "Gagal update status",
      });
    }
  };

  const handleStatusPenawaranHeader = async (id: number, status: number) => {
    try {
      Swal.fire({
        title: "Updating...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await updateStatusTenderHeader(id, { is_status: status });

      await fetchData();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: status === 1 ? "Tenders Approved" : "Tenders Rejected",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err?.message || "Gagal update status",
      });
    }
  };

  const formatDateIndonesia = (date: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-white animate-pulse">
          Memuat data penawaran...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 text-white space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">

          <div>
            <div className="flex items-center gap-2">
              <BadgeDollarSign className="w-5 h-5 text-yellow-400" />
              <h1 className="text-xl font-bold">Quotation List</h1>
            </div>

            <p className="text-sm text-white/50">
              Total Data: {filteredData.length}
            </p>
          </div>

          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kode penawaran..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10"
            />
          </div>

        </div>

        {/* LIST */}
        <div className="space-y-4">

          {paginatedData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
              Tidak ada data penawaran
            </div>
          ) : (

            paginatedData.map((item) => {
              const isOpen = openRow === item.id;

              return (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5">

                  {/* HEADER */}
                  <div className="p-5 flex justify-between items-center">

                    {/* LEFT */}
                    <div className="flex items-center gap-5">

                      {/* ICON TOTAL */}
                      <div
                        className="
                          w-14 h-14
                          rounded-2xl
                          bg-gradient-to-br from-yellow-400 to-orange-500
                          flex items-center justify-center
                          shadow-lg shadow-yellow-500/20
                        "
                      >
                        <BadgeDollarSign className="w-7 h-7 text-black" />
                      </div>

                      {/* INFO */}
                      <div>

                        {/* TOP */}
                        <div className="flex items-center gap-3 flex-wrap">

                          <h2 className="text-xl font-bold tracking-wide text-yellow-400">
                            {item.kode}
                          </h2>

                          <div
                            className="
                              px-3 py-1
                              rounded-full
                              bg-yellow-500/10
                              border border-yellow-500/20
                              text-yellow-300
                              text-sm
                              font-semibold
                            "
                          >
                            {formatCurrency(item.total)}
                          </div>

                        </div>

                        {/* BOTTOM */}
                        <div className="flex items-center gap-2 text-sm text-white/50 mt-1 flex-wrap">

                          <CalendarDays className="w-4 h-4" />
                          <span>{formatDateIndonesia(item.tanggal)}</span>

                          <span>•</span>

                          <span>{item.customer}</span>

                        </div>

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2">

                    {/* APPROVAL */}
                    <button
                      onClick={() => handleStatusPenawaranHeader(Number(item.id), 1)}
                      disabled={item.status_penawaran === "approval"}
                      className={`
                        w-10 h-10
                        rounded-xl
                        border
                        transition-all
                        flex items-center justify-center

                        ${
                          item.status_penawaran === "approval"
                            ? "bg-green-500/10 border-green-500/20 text-green-500/40 cursor-not-allowed"
                            : "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20 hover:scale-105 active:scale-95"
                        }
                      `}
                    >
                      <Check className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleStatusPenawaranHeader(Number(item.id), 0)}
                      disabled={item.status_penawaran === "rejected"}
                      className={`
                        w-10 h-10
                        rounded-xl
                        border
                        transition-all
                        flex items-center justify-center

                        ${
                          item.status_penawaran === "rejected"
                            ? "bg-red-500/10 border-red-500/20 text-red-500/40 cursor-not-allowed"
                            : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:scale-105 active:scale-95"
                        }
                      `}
                    >
                      <X className="w-4 h-4" />
                    </button>
                      
                      {/* SHARE BUTTON (MEMANGGIL HELPER BARU) */}
                      <button
                        onClick={() => handleWhatsappShare(item as any)}
                        className="
                          w-10 h-10
                          rounded-xl
                          bg-white/5
                          border border-white/10
                          hover:bg-cyan-500/20
                          hover:border-cyan-400/30
                          transition
                          flex items-center justify-center
                          group
                        "
                      >
                        <Share2 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition" />
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
                          ${isOpen
                            ? "bg-yellow-500 text-black"
                            : "bg-white/5 hover:bg-white/10"
                          }
                        `}
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                    </div>

                  </div>

                  {/* DETAILS */}
                  {isOpen && (
                    <div className="p-5 border-t border-white/10 overflow-x-auto">

                      <table className="w-full text-sm">
                        <thead>
                          <tr
                            className="
                              border-b border-white/10
                              bg-white/[0.03]
                              backdrop-blur-xl
                            "
                          >

                            {/* KATEGORI */}
                            <th
                              className="
                                px-5 py-4
                                text-left
                                text-[11px]
                                uppercase
                                tracking-[0.2em]
                                text-cyan-400/80
                                font-semibold
                              "
                            >
                              Kategori Unit
                            </th>

                            {/* QTY */}
                            <th
                              className="
                                px-4 py-4
                                text-center
                                text-[11px]
                                uppercase
                                tracking-[0.2em]
                                text-white/50
                                font-semibold
                              "
                            >
                              Qty
                            </th>

                            {/* HARGA */}
                            <th
                              className="
                                px-4 py-4
                                text-right
                                text-[11px]
                                uppercase
                                tracking-[0.2em]
                                text-white/50
                                font-semibold
                              "
                            >
                              Harga Satuan
                            </th>

                            {/* SUBTOTAL */}
                            <th
                              className="
                                px-4 py-4
                                text-right
                                text-[11px]
                                uppercase
                                tracking-[0.2em]
                                text-yellow-400/80
                                font-semibold
                              "
                            >
                              Subtotal
                            </th>

                            {/* AKSI */}
                            <th
                              className="
                                px-4 py-4
                                text-center
                                text-[11px]
                                uppercase
                                tracking-[0.2em]
                                text-white/50
                                font-semibold
                              "
                            >
                              Actions
                            </th>

                          </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5">

                          {item.details.map((d) => (

                            <tr
                              key={d.detail_id}
                              className="
                                group
                                hover:bg-white/[0.03]
                                transition-all duration-300
                              "
                            >

                              {/* CATEGORY */}
                              <td className="py-4">

                                <div className="flex items-center gap-3">

                                  <div
                                    className="
                                      w-11 h-11
                                      rounded-2xl
                                      bg-gradient-to-br from-cyan-500/20 to-blue-500/20
                                      border border-cyan-400/10
                                      flex items-center justify-center
                                    "
                                  >
                                    <BadgeDollarSign className="w-5 h-5 text-cyan-400" />
                                  </div>

                                  <div>
                                    <p className="font-semibold text-white">
                                      {d.category_name}
                                    </p>

                                    <p className="text-xs text-white/40">
                                      Detail ID: #{d.detail_id}
                                    </p>
                                  </div>

                                </div>

                              </td>

                              {/* QTY */}
                              <td className="text-center">

                                <div
                                  className="
                                    inline-flex
                                    px-3 py-1.5
                                    rounded-xl
                                    bg-white/5
                                    border border-white/10
                                    text-white/80
                                    font-medium
                                  "
                                >
                                  {d.qty}
                                </div>

                              </td>

                              {/* PRICE */}
                              <td className="text-right">

                                <div className="font-medium text-white/80">
                                  {formatCurrency(d.price_per_unit)}
                                </div>

                              </td>

                              {/* SUBTOTAL */}
                              <td className="text-right">

                                <div
                                  className="
                                    inline-flex
                                    items-center
                                    px-4 py-2
                                    rounded-xl
                                    bg-gradient-to-r from-yellow-500/10 to-orange-500/10
                                    border border-yellow-500/20
                                    text-yellow-300
                                    font-bold
                                    shadow-lg shadow-yellow-500/5
                                  "
                                >
                                  {formatCurrency(d.subtotal)}
                                </div>

                              </td>

                              {/* ACTION */}
                              <td className="py-4">

                                <div className="flex items-center justify-center gap-2">

                                  {/* EDIT */}
                                  <button
                                    onClick={() => {
                                      setSelectedDetail(d);
                                      setEditModal(true);
                                    }}
                                    className="
                                      w-10 h-10
                                      rounded-xl
                                      bg-blue-500/10
                                      border border-blue-500/20
                                      text-blue-400
                                      hover:bg-blue-500/20
                                      hover:scale-105
                                      active:scale-95
                                      transition-all
                                      flex items-center justify-center
                                    "
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>

                                  {/* APPROVE */}
                                  <button
                                    onClick={() => handleStatus(d.detail_id, 1)}
                                    disabled={d.statusPenawaranDetails === "approval"}
                                    className={`
                                        w-10 h-10
                                        rounded-xl
                                        border
                                        transition-all
                                        flex items-center justify-center
                                        ${d.statusPenawaranDetails === "approval"
                                        ? "bg-green-500/10 border-green-500/20 text-green-500/40 cursor-not-allowed"
                                        : "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20 hover:scale-105 active:scale-95"
                                      }
                                    `}
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>

                                  {/* REJECT */}
                                  <button
                                    onClick={() => handleStatus(d.detail_id, 0)}
                                    disabled={d.statusPenawaranDetails === "rejected"}
                                    className={`
                                      w-10 h-10
                                      rounded-xl
                                      border
                                      transition-all
                                      flex items-center justify-center
                                      ${d.statusPenawaranDetails === "rejected"
                                        ? "bg-red-500/10 border-red-500/20 text-red-500/40 cursor-not-allowed"
                                        : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:scale-105 active:scale-95"
                                      }
                                    `}
                                  >
                                    <X className="w-4 h-4" />
                                  </button>

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
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-white/5 rounded-xl"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-xl ${currentPage === i + 1
                  ? "bg-yellow-500 text-black"
                  : "bg-white/5"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              className="px-4 py-2 bg-white/5 rounded-xl"
            >
              Next
            </button>

          </div>
        )}

      </div>

      <EditQuotationModal
        open={editModal}
        onClose={() => setEditModal(false)}
        data={selectedDetail}
      />

    </DashboardLayout>
  );
}