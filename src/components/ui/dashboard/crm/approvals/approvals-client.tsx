"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import DocumentationModal from "@/components/modals/crm/approval/DocumentationModal";

import React, {
  Fragment,
  useEffect,
  useState,
} from "react";

import Swal from "sweetalert2";

import { getApproval } from "@/lib/crm/approvals/view";

import { handleWhatsappShare } from "@/lib/crm/approvals/whatsapp";

import {
  ClipboardCheck,
  Wallet,
  BadgeCheck,
  ChevronDown,
  Search,
  CalendarDays,
  ShieldCheck,
  FileText,
} from "lucide-react";

/* ================= TYPES ================= */

type UnitDetail = {
  kategori: string;
  qty: number | string;
  harga: number;
  subtotal: number;
};

export type Approval = {
  id: number;
  kode: string;
  customer: string;
  tanggal: string;
  total: number;
  documentation: string;
  details: UnitDetail[];
};

type Props = {
  initialData: Approval[];
};

export default function FormApprovals({
  initialData,
}: Props) {
  const [search, setSearch] = useState("");

  const [openRow, setOpenRow] =
    useState<number | null>(null);

  const [dataApproval, setDataApproval] =
    useState<Approval[]>(initialData);

  const [loading, setLoading] = useState(false);

  const [activeTenderId, setActiveTenderId] =
    useState<number | null>(null);

  const [openDocumentationModal, setOpenDocumentationModal] =
    useState(false);

  /* ================= PAGINATION ================= */

  const pageSize = 5;

  const [currentPage, setCurrentPage] =
    useState(1);

  /* ================= OPTIONAL REFRESH ================= */

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await getApproval(1);

      if (
        res?.success &&
        Array.isArray(res.data)
      ) {
        const mapped: Approval[] =
          res.data.map((item: any) => ({
            id: item.id,
            kode: item.kode,
            customer:
              item.customer_name ?? "-",
            tanggal: item.tanggal,
            total: Number(
              item.total_harga || 0
            ),
            documentation:
              "Quotation, NPWP, Company Profile",
            details: (item.details || []).map(
              (d: any) => ({
                kategori: d.category_name,
                qty: Number(d.qty),
                harga: Number(
                  d.price_per_unit
                ),
                subtotal: Number(
                  d.subtotal
                ),
              })
            ),
          }));

        setDataApproval(mapped);
      }
    } catch (err) {
      Swal.fire(
        "Error",
        "Gagal memuat data approval",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // OPTIONAL AUTO REFRESH
  // useEffect(() => {
  //   fetchData();
  // }, []);

  /* ================= FORMAT ================= */

  const formatCurrency = (
    amount: number
  ) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("Rp", "Rp ");

  const formatDateIndonesia = (
    date: string
  ) => {
    return new Intl.DateTimeFormat(
      "id-ID",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ).format(new Date(date));
  };

  /* ================= FILTER ================= */

  const filteredData = dataApproval.filter(
    (item) =>
      item.kode
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.customer
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  /* ================= PAGINATION ================= */

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

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-white animate-pulse">
          Memuat data approval...
        </div>
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

              <div
                className="
                  w-8 h-8
                  rounded-xl
                  bg-yellow-500
                  flex items-center justify-center
                  shadow-lg shadow-yellow-500/20
                "
              >
                <ShieldCheck className="w-4 h-4 text-black" />
              </div>

              <h1 className="text-xl font-bold tracking-wide">
                Approval List
              </h1>

            </div>

            <p className="text-sm text-white/50">
              Approval process and supporting documentation
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-[320px]">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

            <input
              type="text"
              placeholder="Search approval..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                h-12
                pl-11
                pr-4
                rounded-2xl
                bg-white/5
                border border-white/10
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-500/40
              "
            />
          </div>

        </div>

        {/* LIST */}
        <div className="space-y-4">

          {paginatedData.length === 0 ? (

            <div
              className="
                text-center
                py-20
                bg-white/5
                rounded-3xl
                border border-white/10
                text-white/40
              "
            >
              Tidak ada data approval ditemukan
            </div>

          ) : (

            paginatedData.map((item, index) => {
              const isOpen =
                openRow === item.id;

              return (
                <Fragment key={item.id}>

                  <div
                    className="
                      rounded-3xl
                      border border-white/10
                      bg-white/[0.03]
                      overflow-hidden
                    "
                  >

                    {/* TOP */}
                    <div
                      className="
                        p-5
                        flex flex-col xl:flex-row
                        xl:items-center
                        xl:justify-between
                        gap-5
                      "
                    >

                      {/* LEFT */}
                      <div className="flex items-start gap-4">

                        <div
                          className="
                            w-12 h-12
                            rounded-2xl
                            bg-yellow-500/15
                            border border-yellow-500/20
                            flex items-center justify-center
                            text-yellow-400
                            font-bold
                          "
                        >
                          #
                          {(currentPage - 1) *
                            pageSize +
                            index +
                            1}
                        </div>

                        <div>

                          <h2
                            className="
                              font-bold
                              text-yellow-400
                              text-lg
                            "
                          >
                            {item.kode}
                          </h2>

                          <div
                            className="
                              flex flex-wrap
                              items-center
                              gap-4
                              mt-2
                              text-sm
                              text-white/60
                            "
                          >

                            <div className="flex items-center gap-1">
                              <CalendarDays className="w-4 h-4" />
                              {formatDateIndonesia(
                                item.tanggal
                              )}
                            </div>

                            <div>
                              Customer:
                              <span className="text-white/80 font-medium ml-1">
                                {item.customer}
                              </span>
                            </div>

                          </div>

                        </div>

                      </div>

                      {/* RIGHT */}
                      <div className="flex flex-wrap items-center gap-3">

                        {/* TOTAL */}
                        <div
                          className="
                            px-5 py-2
                            rounded-2xl
                            bg-yellow-500/10
                            border border-yellow-500/20
                            text-yellow-400
                            font-bold
                          "
                        >
                          {formatCurrency(
                            item.total
                          )}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-wrap items-center gap-2">

                          {/* DOC */}
                          <button
                            onClick={() => {
                              setActiveTenderId(
                                item.id
                              );

                              setOpenDocumentationModal(
                                true
                              );
                            }}
                            className="
                              h-10
                              px-4
                              rounded-xl
                              bg-cyan-500/10
                              border border-cyan-500/20
                              text-cyan-400
                              hover:bg-cyan-500/20
                              transition
                              flex items-center gap-2
                            "
                          >
                            <FileText className="w-4 h-4" />
                            Doc
                          </button>

                          {/* PURCHASING */}
                          <button
                            onClick={() =>
                              handleWhatsappShare(
                                item,
                                "manager_purchasing"
                              )
                            }
                            className="
                              h-10
                              px-4
                              rounded-xl
                              bg-blue-500/10
                              border border-blue-500/20
                              text-blue-400
                              hover:bg-blue-500/20
                              transition
                              flex items-center gap-2
                            "
                          >
                            <ClipboardCheck className="w-4 h-4" />
                            Purchasing
                          </button>

                          {/* FINANCE */}
                          <button
                            onClick={() =>
                              handleWhatsappShare(
                                item,
                                "manager_finance"
                              )
                            }
                            className="
                              h-10
                              px-4
                              rounded-xl
                              bg-emerald-500/10
                              border border-emerald-500/20
                              text-emerald-400
                              hover:bg-emerald-500/20
                              transition
                              flex items-center gap-2
                            "
                          >
                            <Wallet className="w-4 h-4" />
                            Finance
                          </button>

                          {/* MARKETING */}
                          <button
                            onClick={() =>
                              handleWhatsappShare(
                                item,
                                "manager_marketing"
                              )
                            }
                            className="
                              h-10
                              px-4
                              rounded-xl
                              bg-orange-500/10
                              border border-orange-500/20
                              text-orange-400
                              hover:bg-orange-500/20
                              transition
                              flex items-center gap-2
                            "
                          >
                            <BadgeCheck className="w-4 h-4" />
                            Marketing
                          </button>

                          {/* TOGGLE */}
                          <button
                            onClick={() =>
                              setOpenRow(
                                isOpen
                                  ? null
                                  : item.id
                              )
                            }
                            className={`
                              w-10 h-10
                              rounded-xl
                              border
                              flex items-center justify-center
                              transition
                              ${
                                isOpen
                                  ? "bg-yellow-500 text-black border-yellow-500"
                                  : "bg-white/5 border-white/10 hover:bg-white/10"
                              }
                            `}
                          >
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-300 ${
                                isOpen
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                </Fragment>
              );
            })

          )}

        </div>

      </div>

      <DocumentationModal
        open={openDocumentationModal}
        tenderId={activeTenderId}
        onClose={() => {
          setOpenDocumentationModal(false);
          setActiveTenderId(null);
        }}
      />
    </DashboardLayout>
  );
}