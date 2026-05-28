"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  Target,
  TrendingUp,
  Layers,
  Clock,
  BarChart3,
  ArrowUpRight,
  Activity,
  PieChart as PieIcon,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100 } 
  },
} as const;

interface DashboardProps {
  data: {
    summary: {
      total_kpi: number;
      total_score: number;
      final_score: number;
      total_entries: number;
      avg_score: number;
    };
    activityData: { month: string; value: number }[];
    recentActivities: { title: string; time: string }[];
    detail: any[];
  };
}

export default function KPIDashboardPage({ data }: DashboardProps) {
  const summary = data?.summary ?? {
    total_kpi: 0,
    total_score: 0,
    final_score: 0,
    total_entries: 0,
    avg_score: 0,
  };

  const activityData = data?.activityData ?? [];
  const recentActivities = data?.recentActivities ?? [];

  // Data tiruan untuk Pie Chart berdasarkan summary yang ada
  const pieData = [
    { name: "Total KPI", value: summary.total_kpi || 10, color: "#8b5cf6" },
    { name: "Total Score", value: summary.total_score || 75, color: "#22d3ee" },
    { name: "Final Score", value: summary.final_score || 80, color: "#e879f9" },
    { name: "Avg Score", value: summary.avg_score || 85, color: "#34d399" },
  ];

  const Card = ({ title, value, icon: Icon, color, trend }: any) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/10 group"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/60 uppercase tracking-wider">{title}</p>
        <div className="p-1.5 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
      
      <div className="mt-3 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
          {trend && (
            <p className="text-[11px] text-emerald-400 flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3 h-3" /> {trend}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="p-6 space-y-6 text-white"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Activity className="w-3 h-3 animate-pulse" /> Live System
            </div>
            <h1 className="text-3xl font-bold">KPI Dashboard</h1>
            <p className="text-white/50 text-sm">
              Performance overview & productivity tracking
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 px-3 rounded-xl self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs text-white/70">Sync Terakhir Berhasil</span>
          </div>
        </motion.div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card title="Total KPI" value={summary.total_kpi} icon={Target} color="text-indigo-400" trend="Aktif" />
          <Card title="Total Score" value={(summary.total_score ?? 0).toFixed(2)} icon={TrendingUp} color="text-cyan-400" trend="+12.3% MoM" />
          <Card title="Final Score" value={(summary.final_score ?? 0).toFixed(2)} icon={BarChart3} color="text-fuchsia-400" trend="Optimal" />
          <Card title="Avg Score" value={(summary.avg_score ?? 0).toFixed(2)} icon={Layers} color="text-emerald-400" trend="+4.5% target" />
        </div>

        {/* MIDDLE LAYOUT: AREA CHART & PIE CHART SIDE BY SIDE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* AREA CHART (2/3 Kolom) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <h3 className="font-semibold">Monthly KPI Performance</h3>
              </div>
              <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-white/60">
                Realtime Data
              </span>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fill="url(#chartGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* PIE CHART (1/3 Kolom) */}
          <motion.div variants={itemVariants} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PieIcon className="w-4 h-4 text-cyan-400" />
                <h3 className="font-semibold">Metrics Share</h3>
              </div>
              <p className="text-white/40 text-[11px]">Perbandingan bobot nilai ringkasan KPI saat ini</p>
            </div>

            <div className="h-[200px] my-2 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }} />
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60} // Diubah jadi Donut Chart biar modern
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Teks di tengah Donut Pie */}
              <div className="absolute text-center">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Status</p>
                <p className="text-lg font-bold text-emerald-400">Good</p>
              </div>
            </div>

            {/* Legend Kustom Ringkas di bawah Pie */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] text-white/60 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* RECENT ACTIVITY (Full-width di bawah setelah grafik) */}
        <motion.div variants={itemVariants} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold">Recent Activities</h3>
            </div>
            <span className="text-xs text-white/40">{recentActivities.length} logs tersedia</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recentActivities.length > 0 ? (
              recentActivities.slice(0, 6).map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition duration-200 group"
                >
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors truncate pr-4">
                    {item.title}
                  </span>
                  <span className="text-xs text-white/40 shrink-0 font-mono">
                    {item.time ? new Date(item.time).toLocaleDateString() : "-"}
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-xs text-white/30 border border-dashed border-white/10 rounded-xl">
                Tidak ada aktivitas terbaru
              </div>
            )}
          </div>
        </motion.div>

      </motion.div>
    </DashboardLayout>
  );
}