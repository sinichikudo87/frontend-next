"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { getAccountCategory } from "../../../../../lib/accounting/account-category/view";

import {
  Search,
  FolderTree,
  ChevronDown,
  MoreVertical,
  BadgeCheck,
  FileText,
} from "lucide-react";

/* ================= TYPES ================= */
type AccountCategoryType = {
  id: number;
  company_id: number;
  name: string;
  description: string;
  is_active: number;
};

interface Props {
  initialData: AccountCategoryType[];
}

export default function AccountCategory({ initialData }: Props) {
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [categories, setCategories] =
    useState<AccountCategoryType[]>(initialData);

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  /* ================= REFRESH ================= */
  const refreshData = async () => {
    try {
      const res = await getAccountCategory(1);

      if (res?.success && Array.isArray(res.data)) {
        const mapped: AccountCategoryType[] = res.data.map((item: any) => ({
          id: Number(item.id),
          company_id: Number(item.company_id),
          name: item.name ?? "-",
          description: item.description ?? "-",
          is_active: Number(item.is_active ?? 1),
        }));

        setCategories(mapped);
      }
    } catch (err) {
      console.error("Failed refresh categories:", err);
    }
  };

  /* ================= FILTER ================= */
  const filteredData = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 text-white space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">

          <div>
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <FolderTree className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  Account Categories
                </h1>

                <p className="text-sm text-white/50">
                  Total Categories: {filteredData.length}
                </p>
              </div>

            </div>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search category..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-500/40 transition"
            />
          </div>

        </div>

        {/* LIST */}
        <div className="space-y-4">

          {paginatedData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-white/40">
              No category data
            </div>
          ) : (
            paginatedData.map((item) => {

              const isOpen = openRow === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
                >

                  {/* TOP BAR */}
                  <div className="p-5 flex items-center justify-between">

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center">
                        <FolderTree className="w-6 h-6 text-cyan-400" />
                      </div>

                      <div>

                        <div className="flex items-center gap-3 flex-wrap">

                          <h2 className="text-lg font-bold text-white">
                            {item.name}
                          </h2>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                              item.is_active === 1
                                ? "bg-green-500/10 border-green-500/20 text-green-400"
                                : "bg-red-500/10 border-red-500/20 text-red-400"
                            }`}
                          >
                            {item.is_active === 1
                              ? "ACTIVE"
                              : "INACTIVE"}
                          </span>

                        </div>

                        <div className="text-sm text-white/50 mt-1">
                          Company ID: {item.company_id}
                        </div>

                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2">

                      <button
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center"
                      >
                        <MoreVertical className="w-5 h-5 text-white/70" />
                      </button>

                      <button
                        onClick={() =>
                          setOpenRow(isOpen ? null : item.id)
                        }
                        className={`w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition ${
                          isOpen
                            ? "bg-cyan-500 text-black border-cyan-500"
                            : "bg-white/5 hover:bg-white/10"
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

                  {/* DETAILS */}
                  {isOpen && (
                    <div className="border-t border-white/10 p-5 bg-black/10">

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">

                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                              <BadgeCheck className="w-5 h-5 text-cyan-400" />
                            </div>

                            <div>
                              <p className="text-xs text-white/40">
                                Status
                              </p>

                              <h3 className="font-semibold text-white">
                                {item.is_active === 1
                                  ? "Active"
                                  : "Inactive"}
                              </h3>
                            </div>

                          </div>

                        </div>

                        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">

                          <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-purple-400" />
                            </div>

                            <div>
                              <p className="text-xs text-white/40">
                                Description
                              </p>

                              <h3 className="font-semibold text-white">
                                {item.description}
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
              onClick={() =>
                setCurrentPage((p) => Math.max(p - 1, 1))
              }
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white/5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-xl transition ${
                  currentPage === i + 1
                    ? "bg-cyan-500 text-black font-bold"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(p + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white/5 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition"
            >
              Next
            </button>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}