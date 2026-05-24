"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { Fragment, useState } from "react";
import Swal from "sweetalert2";

import {
  Search,
  CalendarDays,
  BadgeDollarSign,
  ChevronDown,
  Building2,
  Handshake,
  CircleDollarSign,
  CheckCircle2,
  Clock3,
  TrendingUp,
  BriefcaseBusiness,
  CircleDashed,
  CircleCheckBig,
} from "lucide-react";

type DealDetail = {
  kategori: string;
  qty: number | string;
  harga: number;
  subtotal: number;
  status: string;
};

type AccountDeal = {
  id: string;
  customer: string;
  tanggal: string;
  total: number;
  status: string;
  source: string;
  pic: string;
  details: DealDetail[];
};

export default function AccountsDealsPage() {
  const [search, setSearch] = useState("");
  const [openRow, setOpenRow] =
    useState<string | null>("DL-2601-00004");

  const dataDeals: AccountDeal[] = [
    {
      id: "DL-2601-00004",
      customer: "PT Petrosea",
      tanggal: "26 Jan 2026",
      total: 22000000,
      status: "Deal Closed",
      source: "Website",
      pic: "Rama Saputra",
      details: [
        {
          kategori: "DOUBLE CABIN",
          qty: 1,
          harga: 22000000,
          subtotal: 22000000,
          status: "Approved",
        },
      ],
    },
    {
      id: "DL-2601-00003",
      customer: "PT Pama",
      tanggal: "24 Jan 2026",
      total: 3000000,
      status: "Negotiation",
      source: "Instagram",
      pic: "Dewi Lestari",
      details: [
        {
          kategori: "ALPHARD",
          qty: 1,
          harga: 3000000,
          subtotal: 3000000,
          status: "Pending",
        },
      ],
    },
    {
      id: "DL-2601-00002",
      customer: "PT Freeport",
      tanggal: "20 Jan 2026",
      total: 1200000,
      status: "Waiting Approval",
      source: "Facebook Ads",
      pic: "Yoga Pratama",
      details: [
        {
          kategori: "AVANZA ALL NEW",
          qty: 2,
          harga: 600000,
          subtotal: 1200000,
          status: "Review",
        },
      ],
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("Rp", "Rp ");
  };

  const filteredData = dataDeals.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.customer.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Deal Closed":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
      case "Negotiation":
        return "bg-yellow-500/15 text-yellow-400 border-yellow-500/20";
      default:
        return "bg-blue-500/15 text-blue-400 border-blue-500/20";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 text-white space-y-6">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <div className="flex items-center gap-3 mb-2">

              <div className="w-10 h-10 rounded-2xl bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <Handshake className="w-5 h-5 text-black" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-wide">
                  Accounts Deals
                </h1>

                <p className="text-sm text-white/50">
                  Monitor customer deals, negotiations and sales pipeline
                </p>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="relative w-full lg:w-[340px]">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

            <input
              type="text"
              placeholder="Search deals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500/40 placeholder:text-white/30"
            />
          </div>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-white/50">
                  Total Deals
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  128
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
                <BadgeDollarSign className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-white/50">
                  Closed Deals
                </p>

                <h2 className="text-3xl font-bold mt-2 text-emerald-400">
                  84
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <CircleCheckBig className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-white/50">
                  Revenue Pipeline
                </p>

                <h2 className="text-3xl font-bold mt-2 text-blue-400">
                  Rp 4.2B
                </h2>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {filteredData.map((item, index) => {
            const isOpen = openRow === item.id;

            return (
              <Fragment key={item.id}>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/10">

                  {/* TOP */}
                  <div className="p-5">

                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                      {/* LEFT */}
                      <div className="flex items-start gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 border border-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">
                          #{index + 1}
                        </div>

                        <div>

                          <div className="flex flex-wrap items-center gap-3">

                            <h2 className="font-bold text-yellow-400 text-lg tracking-wide">
                              {item.id}
                            </h2>

                            <div
                              className={`px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(
                                item.status
                              )}`}
                            >
                              {item.status}
                            </div>

                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white/60">

                            <div className="flex items-center gap-1">
                              <CalendarDays className="w-4 h-4" />
                              {item.tanggal}
                            </div>

                            <div className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {item.customer}
                            </div>

                            <div className="flex items-center gap-1">
                              <BriefcaseBusiness className="w-4 h-4" />
                              PIC :
                              <span className="text-white/80 font-medium">
                                {item.pic}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <CircleDashed className="w-4 h-4" />
                              Source :
                              <span className="text-cyan-400 font-medium">
                                {item.source}
                              </span>
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-3">

                        <div className="px-5 py-3 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-500/20">

                          <div className="text-xs text-white/50 mb-1">
                            Deal Value
                          </div>

                          <div className="font-bold text-lg text-yellow-400">
                            {formatCurrency(item.total)}
                          </div>
                        </div>

                        {/* TOGGLE */}
                        <button
                          type="button"
                          onClick={() => {
                            setOpenRow((prev) =>
                              prev === item.id ? null : item.id
                            );
                          }}
                          className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
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

                  {/* DETAIL */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >

                    <div className="border-t border-white/10 p-5 bg-black/10">

                      <div className="mb-4 flex items-center gap-2">

                        <CircleDollarSign className="w-4 h-4 text-yellow-400" />

                        <h3 className="text-sm font-semibold text-yellow-400 tracking-wide uppercase">
                          Deal Detail
                        </h3>
                      </div>

                      <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                          <thead>
                            <tr className="text-white/50 border-b border-white/10">

                              <th className="text-left pb-3 font-medium">
                                Vehicle Category
                              </th>

                              <th className="text-center pb-3 font-medium">
                                Qty
                              </th>

                              <th className="text-center pb-3 font-medium">
                                Price
                              </th>

                              <th className="text-center pb-3 font-medium">
                                Subtotal
                              </th>

                              <th className="text-center pb-3 font-medium">
                                Status
                              </th>

                            </tr>
                          </thead>

                          <tbody>
                            {item.details.map((detail, dIdx) => (
                              <tr
                                key={dIdx}
                                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                              >

                                <td className="py-4 font-medium text-white/80 uppercase">
                                  {detail.kategori}
                                </td>

                                <td className="py-4 text-center text-white/70">
                                  {detail.qty}
                                </td>

                                <td className="py-4 text-center text-white/70">
                                  {formatCurrency(detail.harga)}
                                </td>

                                <td className="py-4 text-center font-semibold text-yellow-400">
                                  {formatCurrency(detail.subtotal)}
                                </td>

                                <td className="py-4 text-center">

                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">

                                    <Clock3 className="w-3 h-3 text-blue-400" />

                                    <span className="text-xs text-white/70">
                                      {detail.status}
                                    </span>

                                  </div>

                                </td>

                              </tr>
                            ))}
                          </tbody>

                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              </Fragment>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}