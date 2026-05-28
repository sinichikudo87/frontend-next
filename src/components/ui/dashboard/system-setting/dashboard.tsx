"use client";

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
} from "recharts";
import {
  ShieldAlert,
  Users,
  Activity,
  HardDrive,
  Cpu,
  ArrowUpRight,
} from "lucide-react";

interface SystemAdminContentProps {
  systemUptimeData: { month: string; value: number }[];
  storageDistribution: { name: string; value: number }[];
  systemSummary: {
    totalUsers: number;
    activeSessions: number;
    apiRequests: string;
    systemHealth: string;
  };
}

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function SystemAdminContent({
  systemUptimeData,
  storageDistribution,
  systemSummary,
}: SystemAdminContentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeUp}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6 text-white"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">System Console</h1>
          <p className="text-white/50 mt-1">
            Pusat kendali administrasi, infrastruktur, keamanan, dan audit log sistem
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-white/70">
            Status Sistem: {systemSummary.systemHealth}
          </span>
        </div>
      </div>

      {/* SYSTEM SUMMARY METRICS */}
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
      >
        {/* Total Users */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6, scale: 1.01 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-violet-500/5 p-6 backdrop-blur-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-violet-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-violet-400" />
          </div>
          <p className="text-slate-400 text-sm mt-5">Terdaftar (Total Users)</p>
          <h2 className="text-4xl font-black mt-2">{systemSummary.totalUsers}</h2>
          <span className="text-violet-400 text-xs">Pengguna aktif global</span>
        </motion.div>

        {/* Active Sessions */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6, scale: 1.01 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 p-6 backdrop-blur-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-slate-400 text-sm mt-5">Sesi Aktif (Concurrent)</p>
          <h2 className="text-4xl font-black mt-2">{systemSummary.activeSessions}</h2>
          <span className="text-cyan-400 text-xs">Real-time user session</span>
        </motion.div>

        {/* API Requests */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6, scale: 1.01 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 p-6 backdrop-blur-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-slate-400 text-sm mt-5">Lalu Lintas API (24 Jam)</p>
          <h2 className="text-4xl font-black mt-2">{systemSummary.apiRequests}</h2>
          <span className="text-emerald-400 text-xs">Request hit normal</span>
        </motion.div>

        {/* Security Alerts */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6, scale: 1.01 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-amber-500/20 to-amber-500/5 p-6 backdrop-blur-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-amber-400" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-slate-400 text-sm mt-5">Insiden Keamanan</p>
          <h2 className="text-4xl font-black mt-2">0</h2>
          <span className="text-amber-400 text-xs">Sistem aman terlindungi</span>
        </motion.div>
      </motion.div>

      {/* CHARTS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 xl:grid-cols-3 gap-6"
      >
        {/* Area Chart: System Uptime */}
        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
          <div className="mb-6 flex items-center gap-3">
            <Cpu className="w-5 h-5 text-violet-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Metrik Uptime Server</h2>
              <p className="text-sm text-slate-400">Rasio ketersediaan performa server operasional (%)</p>
            </div>
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={systemUptimeData}>
                <defs>
                  <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#cbd5e1" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="Uptime Rate"
                  stroke="#a78bfa"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUptime)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Storage Distribution */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
          <div className="mb-6 flex items-center gap-3">
            <HardDrive className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Alokasi Penyimpanan</h2>
              <p className="text-sm text-slate-400">Distribusi kapasitas Hard Drive server</p>
            </div>
          </div>

          <div className="h-[350px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={storageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {storageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Custom Legend */}
            <div className="absolute bottom-2 flex flex-wrap justify-center gap-4 text-xs">
              {storageDistribution.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-slate-300">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}