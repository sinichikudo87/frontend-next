"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  YAxis,
} from "recharts";

import {
  Users,
  TrendingUp,
  Target,
  PhoneCall,
  ArrowUpRight,
  Clock,
  Layers,
  Share2,
} from "lucide-react";

const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

interface DashboardProps {
  data: {
    summary: {
      customers: number;
      leads: number;
      deals: number;
      conversion: number;
    };
    activityData: { month: string; value: number }[];
    customerData: { name: string; value: number }[];
    leadSourceData: { source: string; total: number }[];
    recentActivities: { title: string; time: string }[];
  };
}

export default function CRMDashboardPage({ data }: DashboardProps) {
  const { summary, activityData, customerData, leadSourceData, recentActivities } = data;

  return (
    <DashboardLayout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6 space-y-6 text-white"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight">CRM Dashboard</h1>
            <p className="text-white/50 mt-1">
              Monitor customer activity and sales performance
            </p>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* TOTAL CUSTOMERS */}
          <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/15 via-indigo-500/5 to-transparent p-6 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm font-medium">Total Customers</p>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-black transition-colors duration-300">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <h2 className="text-4xl font-black tracking-tight">{summary.customers}</h2>
              <span className="flex items-center gap-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">
                <ArrowUpRight className="w-3.5 h-3.5" /> 12%
              </span>
            </div>
          </div>

          {/* ACTIVE LEADS */}
          <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/15 via-cyan-500/5 to-transparent p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm font-medium">Active Leads</p>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors duration-300">
                <PhoneCall className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <h2 className="text-4xl font-black tracking-tight">{summary.leads}</h2>
              <span className="flex items-center gap-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">
                <ArrowUpRight className="w-3.5 h-3.5" /> 8.4%
              </span>
            </div>
          </div>

          {/* DEALS CLOSED */}
          <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/15 via-fuchsia-500/5 to-transparent p-6 hover:border-fuchsia-500/30 transition-all duration-300 hover:-translate-y-1 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm font-medium">Deals Closed</p>
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 group-hover:bg-fuchsia-500 group-hover:text-black transition-colors duration-300">
                <Target className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <h2 className="text-4xl font-black tracking-tight">{summary.deals}</h2>
              <span className="flex items-center gap-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">
                <ArrowUpRight className="w-3.5 h-3.5" /> 21%
              </span>
            </div>
          </div>

          {/* CONVERSION RATE */}
          <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent p-6 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 shadow-lg">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm font-medium">Conversion Rate</p>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <h2 className="text-4xl font-black tracking-tight">{summary.conversion}%</h2>
              <span className="flex items-center gap-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">
                <ArrowUpRight className="w-3.5 h-3.5" /> 4.2%
              </span>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: MAIN GRAPH & PIE CHART */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* AREA CHART */}
          <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 shadow-xl">
            <div className="mb-6">
              <h3 className="text-lg font-bold">Sales Deal Progress</h3>
              <p className="text-xs text-white/40">Grafik akumulasi nilai tender bulanan</p>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorCRM" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "16px",
                      color: "#fff",
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#a78bfa" fill="url(#colorCRM)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* DONUT / PIE CHART */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-4 h-4 text-fuchsia-400" />
                <h3 className="text-lg font-bold">Customer Stages</h3>
              </div>
              <p className="text-xs text-white/40">Komposisi status pipeline tender</p>
            </div>
            
            <div className="h-[180px] relative my-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={customerData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {customerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-xs text-white/40 block">Total Stages</span>
                <span className="text-xl font-bold">{customerData.reduce((a, b) => a + b.value, 0)}</span>
              </div>
            </div>

            {/* LEGEND INDIKATOR */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {customerData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-white/70 truncate">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: BAR CHART & RECENT ACTIVITIES */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* BAR CHART: LEAD SOURCES */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 shadow-xl">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Share2 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-lg font-bold">Lead Channels</h3>
              </div>
              <p className="text-xs text-white/40">Sumber datangnya konsumen</p>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadSourceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis dataKey="source" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={70} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px" }} />
                  <Bar dataKey="total" fill="#06b6d4" radius={[0, 8, 8, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LIST TERBARU: RECENT ACTIVITIES */}
          <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 shadow-xl flex flex-col justify-between">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-lg font-bold">Live Activities</h3>
                </div>
                <p className="text-xs text-white/40">Log aktivitas penawaran ter-update</p>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            <div className="space-y-3 division-y division-white/5">
              {recentActivities.slice(0, 4).map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <p className="text-sm font-medium text-white/90 truncate max-w-[200px] sm:max-w-md">
                      {activity.title}
                    </p>
                  </div>
                  <span className="text-xs text-white/40 whitespace-nowrap ml-2">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}