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
} from "recharts";

import {
  Wallet,
  TrendingUp,
  DollarSign,
  PieChart as PieChartIcon,
  ArrowUpRight,
} from "lucide-react";

const financeData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 135 },
  { month: "Mar", value: 150 },
  { month: "Apr", value: 145 },
  { month: "May", value: 170 },
  { month: "Jun", value: 190 },
];

const accountingData = [
  { name: "Income", value: 55 },
  { name: "Expense", value: 30 },
  { name: "Tax", value: 15 },
];

const COLORS = ["#10b981", "#ef4444", "#f59e0b"];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function AccountingDashboardPage() {
  return (
    <DashboardLayout>

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

            <h1 className="text-3xl font-black">
              Accounting Dashboard
            </h1>

            <p className="text-white/50 mt-1">
              Monitor company financial performance and accounting analytics
            </p>

          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
            <TrendingUp className="w-4 h-4 text-emerald-400" />

            <span className="text-sm text-white/70">
              Financial Growth +12.4%
            </span>
          </div>

        </div>

        {/* SUMMARY */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{
            staggerChildren: 0.12,
          }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
        >

          {/* CARD */}
          <motion.div
            variants={fadeUp}
            whileHover={{
              y: -6,
              scale: 1.01,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
          >

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-emerald-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-emerald-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Total Revenue
            </p>

            <h2 className="text-4xl font-black mt-2">
              $128K
            </h2>

            <span className="text-emerald-400 text-xs">
              +12% this month
            </span>

          </motion.div>

          {/* CARD */}
          <motion.div
            variants={fadeUp}
            whileHover={{
              y: -6,
              scale: 1.01,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-rose-500/20 to-rose-500/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/10"
          >

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-rose-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-rose-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Expenses
            </p>

            <h2 className="text-4xl font-black mt-2">
              $86K
            </h2>

            <span className="text-rose-400 text-xs">
              Controlled spending
            </span>

          </motion.div>

          {/* CARD */}
          <motion.div
            variants={fadeUp}
            whileHover={{
              y: -6,
              scale: 1.01,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
          >

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-cyan-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Profit
            </p>

            <h2 className="text-4xl font-black mt-2">
              $42K
            </h2>

            <span className="text-cyan-400 text-xs">
              Stable growth
            </span>

          </motion.div>

          {/* CARD */}
          <motion.div
            variants={fadeUp}
            whileHover={{
              y: -6,
              scale: 1.01,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-amber-500/20 to-amber-500/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10"
          >

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                <PieChartIcon className="w-6 h-6 text-amber-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-amber-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Net Margin
            </p>

            <h2 className="text-4xl font-black mt-2">
              32%
            </h2>

            <span className="text-amber-400 text-xs">
              Above target
            </span>

          </motion.div>

        </motion.div>

        {/* CHARTS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 xl:grid-cols-3 gap-6"
        >

          {/* REVENUE CHART */}
          <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-white">
                Revenue Overview
              </h2>

              <p className="text-sm text-slate-400">
                Monthly income growth trend
              </p>

            </div>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={financeData}>

                  <defs>

                    <linearGradient id="colorFIN" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>

                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />

                  <XAxis dataKey="month" stroke="#cbd5e1" />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    fill="url(#colorFIN)"
                    strokeWidth={3}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* PIE CHART */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-white">
                Financial Breakdown
              </h2>

              <p className="text-sm text-slate-400">
                Income vs expenses distribution
              </p>

            </div>

            <div className="h-[350px] flex items-center justify-center">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={accountingData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {accountingData.map((entry, index) => (

                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))}
                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </motion.div>

      </motion.div>

    </DashboardLayout>
  );
}