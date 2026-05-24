"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";

import {
  TrendingUp,
  Users,
  BadgeDollarSign,
  CalendarDays,
  Search,
  PhoneCall,
  MessageCircleMore,
  CheckCircle2,
  Clock3,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

export default function LeadAnalyticsPage() {
  const analyticsCards = [
    {
      title: "Total Leads",
      value: "1,284",
      growth: "+12.5%",
      icon: Users,
      color: "from-cyan-500/20 to-blue-500/10",
      text: "text-cyan-400",
      up: true,
    },
    {
      title: "Quotation Sent",
      value: "842",
      growth: "+8.2%",
      icon: MessageCircleMore,
      color: "from-emerald-500/20 to-green-500/10",
      text: "text-emerald-400",
      up: true,
    },
    {
      title: "Deals Closed",
      value: "312",
      growth: "+4.1%",
      icon: CheckCircle2,
      color: "from-yellow-500/20 to-orange-500/10",
      text: "text-yellow-400",
      up: true,
    },
    {
      title: "Pending Follow Up",
      value: "97",
      growth: "-2.4%",
      icon: Clock3,
      color: "from-red-500/20 to-pink-500/10",
      text: "text-red-400",
      up: false,
    },
  ];

  const topCustomers = [
    {
      customer: "PT Petrosea",
      leads: 52,
      value: "Rp 220.000.000",
      status: "High Potential",
    },
    {
      customer: "PT Pama",
      leads: 31,
      value: "Rp 140.000.000",
      status: "Negotiation",
    },
    {
      customer: "PT Freeport",
      leads: 24,
      value: "Rp 98.000.000",
      status: "Follow Up",
    },
    {
      customer: "PT Kaltim Prima",
      leads: 18,
      value: "Rp 72.000.000",
      status: "Closed Deal",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 text-white space-y-6">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <div className="flex items-center gap-3 mb-2">

              <div className="w-10 h-10 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <BarChart3 className="w-5 h-5 text-black" />
              </div>

              <h1 className="text-2xl font-bold tracking-wide">
                Lead Analytics
              </h1>
            </div>

            <p className="text-sm text-white/50">
              Customer lead performance and sales analytics dashboard
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full lg:w-[340px]">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

            <input
              type="text"
              placeholder="Search customer or lead..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 placeholder:text-white/30"
            />
          </div>
        </div>

        {/* ANALYTICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          {analyticsCards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <div
                key={idx}
                className={`rounded-3xl border border-white/10 bg-gradient-to-br ${card.color} backdrop-blur-xl p-5 shadow-2xl shadow-black/10`}
              >

                <div className="flex items-center justify-between mb-5">

                  <div className={`w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center ${card.text}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div
                    className={`flex items-center gap-1 text-xs font-semibold ${card.up ? "text-emerald-400" : "text-red-400"
                      }`}
                  >
                    {card.up ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}

                    {card.growth}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-white/50 mb-1">
                    {card.title}
                  </div>

                  <div className={`text-3xl font-bold ${card.text}`}>
                    {card.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CHART SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* SALES PERFORMANCE */}
          <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="text-lg font-bold text-white">
                  Sales Performance
                </h2>

                <p className="text-sm text-white/40">
                  Monthly lead conversion analytics
                </p>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

            {/* LINE CHART */}
            <div className="relative h-[320px] rounded-3xl border border-white/5 bg-black/20 overflow-hidden p-6">

              {/* GRID */}
              <div className="absolute inset-0 flex flex-col justify-between px-6 py-6 pointer-events-none">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="border-t border-dashed border-white/5 w-full"
                  />
                ))}
              </div>

              {/* SVG LINE */}
              <svg
                viewBox="0 0 600 240"
                className="absolute inset-0 w-full h-full px-6 py-6"
                preserveAspectRatio="none"
              >

                {/* LEADS LINE */}
                <polyline
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="
          40,180
          130,140
          220,110
          310,130
          400,80
          490,40
        "
                />

                {/* DEALS LINE */}
                <polyline
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="
          40,210
          130,170
          220,140
          310,150
          400,110
          490,70
        "
                />

                {/* LEADS DOT */}
                {[
                  [40, 180],
                  [130, 140],
                  [220, 110],
                  [310, 130],
                  [400, 80],
                  [490, 40],
                ].map((dot, idx) => (
                  <circle
                    key={idx}
                    cx={dot[0]}
                    cy={dot[1]}
                    r="6"
                    fill="#06b6d4"
                    className="drop-shadow-[0_0_10px_#06b6d4]"
                  />
                ))}

                {/* DEALS DOT */}
                {[
                  [40, 210],
                  [130, 170],
                  [220, 140],
                  [310, 150],
                  [400, 110],
                  [490, 70],
                ].map((dot, idx) => (
                  <circle
                    key={idx}
                    cx={dot[0]}
                    cy={dot[1]}
                    r="6"
                    fill="#22c55e"
                    className="drop-shadow-[0_0_10px_#22c55e]"
                  />
                ))}
              </svg>

              {/* MONTH LABEL */}
              <div className="absolute bottom-4 left-0 right-0 px-10 flex justify-between text-sm text-white/50 font-medium">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>

              {/* LEGEND */}
              <div className="absolute top-5 right-5 flex items-center gap-4 text-xs">

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span className="text-white/60">
                    Leads
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-white/60">
                    Deals
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* LEAD SOURCE */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">

            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="text-lg font-bold text-white">
                  Lead Sources
                </h2>

                <p className="text-sm text-white/40">
                  Traffic distribution and conversion source
                </p>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                <PieChart className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-5">

              {[
                {
                  source: "Facebook Ads",
                  leads: 428,
                  percent: "48%",
                  color: "bg-blue-500",
                  icon: "📘",
                },
                {
                  source: "Instagram Ads",
                  leads: 241,
                  percent: "27%",
                  color: "bg-pink-500",
                  icon: "📸",
                },
                {
                  source: "Website Organic",
                  leads: 134,
                  percent: "15%",
                  color: "bg-cyan-500",
                  icon: "🌐",
                },
                {
                  source: "WhatsApp Campaign",
                  leads: 89,
                  percent: "10%",
                  color: "bg-emerald-500",
                  icon: "💬",
                },
                {
                  source: "TikTok Ads",
                  leads: 56,
                  percent: "6%",
                  color: "bg-white",
                  icon: "🎵",
                },
              ].map((item, idx) => (
                <div key={idx}>

                  <div className="flex items-center justify-between mb-2">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg">
                        {item.icon}
                      </div>

                      <div>
                        <div className="text-sm font-medium text-white/80">
                          {item.source}
                        </div>

                        <div className="text-xs text-white/40">
                          {item.leads} Leads
                        </div>
                      </div>
                    </div>

                    <div className="text-right">

                      <div className="font-bold text-white">
                        {item.percent}
                      </div>

                      <div className="text-[11px] text-white/40">
                        Conversion
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">

                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: item.percent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CUSTOMER TABLE */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">

          <div className="p-5 border-b border-white/10">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-white">
                  Top Customer Leads
                </h2>

                <p className="text-sm text-white/40">
                  Customer lead and revenue performance
                </p>
              </div>

              <div className="w-11 h-11 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                <BadgeDollarSign className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b border-white/10 text-white/50">

                  <th className="text-left py-4 px-5 font-medium">
                    Customer
                  </th>

                  <th className="text-center py-4 font-medium">
                    Leads
                  </th>

                  <th className="text-center py-4 font-medium">
                    Revenue
                  </th>

                  <th className="text-center py-4 font-medium">
                    Status
                  </th>

                  <th className="text-center py-4 font-medium">
                    Activity
                  </th>
                </tr>
              </thead>

              <tbody>
                {topCustomers.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition"
                  >

                    <td className="py-4 px-5 font-medium text-white/80">
                      {item.customer}
                    </td>

                    <td className="py-4 text-center text-cyan-400 font-semibold">
                      {item.leads}
                    </td>

                    <td className="py-4 text-center text-yellow-400 font-semibold">
                      {item.value}
                    </td>

                    <td className="py-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center justify-center gap-2">

                        <button className="w-9 h-9 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition flex items-center justify-center">
                          <PhoneCall className="w-4 h-4" />
                        </button>

                        <button className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition flex items-center justify-center">
                          <MessageCircleMore className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* FOOTER STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="rounded-3xl border border-white/10 bg-cyan-500/10 p-5">
            <div className="flex items-center gap-3 mb-3">

              <CalendarDays className="w-5 h-5 text-cyan-400" />

              <div className="font-semibold">
                Monthly Performance
              </div>
            </div>

            <div className="text-3xl font-bold text-cyan-400">
              84%
            </div>

            <p className="text-sm text-white/40 mt-2">
              Lead conversion target achieved this month
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-yellow-500/10 p-5">
            <div className="flex items-center gap-3 mb-3">

              <TrendingUp className="w-5 h-5 text-yellow-400" />

              <div className="font-semibold">
                Revenue Growth
              </div>
            </div>

            <div className="text-3xl font-bold text-yellow-400">
              +22%
            </div>

            <p className="text-sm text-white/40 mt-2">
              Revenue growth compared to previous month
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-emerald-500/10 p-5">
            <div className="flex items-center gap-3 mb-3">

              <CheckCircle2 className="w-5 h-5 text-emerald-400" />

              <div className="font-semibold">
                Closing Rate
              </div>
            </div>

            <div className="text-3xl font-bold text-emerald-400">
              61%
            </div>

            <p className="text-sm text-white/40 mt-2">
              Successful deal closing percentage
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}