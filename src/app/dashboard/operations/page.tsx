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
  Settings,
  CheckCircle2,
  LoaderCircle,
  Activity,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const operationsData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 72 },
  { month: "Mar", value: 78 },
  { month: "Apr", value: 75 },
  { month: "May", value: 85 },
  { month: "Jun", value: 90 },
];

const opsStatusData = [
  { name: "Completed Tasks", value: 45 },
  { name: "In Progress", value: 35 },
  { name: "Pending", value: 20 },
];

const COLORS = ["#06b6d4", "#8b5cf6", "#f59e0b"];

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

export default function OperationsDashboardPage() {
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
              Operations Dashboard
            </h1>

            <p className="text-white/50 mt-1">
              Monitor operational workflow and task efficiency
            </p>

          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
            <TrendingUp className="w-4 h-4 text-cyan-400" />

            <span className="text-sm text-white/70">
              Efficiency Increased +8.4%
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
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
          >

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                <Settings className="w-6 h-6 text-cyan-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-emerald-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Total Operations
            </p>

            <h2 className="text-4xl font-black mt-2">
              128
            </h2>

            <span className="text-emerald-400 text-xs">
              +14 this month
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
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10"
          >

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-emerald-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Completed
            </p>

            <h2 className="text-4xl font-black mt-2">
              86
            </h2>

            <span className="text-cyan-400 text-xs">
              Smooth workflow
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
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-500/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-500/10"
          >

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center">
                <LoaderCircle className="w-6 h-6 text-fuchsia-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-emerald-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              In Progress
            </p>

            <h2 className="text-4xl font-black mt-2">
              34
            </h2>

            <span className="text-fuchsia-400 text-xs">
              Ongoing tasks
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
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/20 to-orange-500/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
          >

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-emerald-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Efficiency Rate
            </p>

            <h2 className="text-4xl font-black mt-2">
              90%
            </h2>

            <span className="text-pink-400 text-xs">
              High productivity
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

          {/* OPERATIONS TREND */}
          <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-white">
                Operations Performance Overview
              </h2>

              <p className="text-sm text-slate-400">
                Monthly workflow efficiency trend
              </p>

            </div>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={operationsData}>

                  <defs>

                    <linearGradient id="colorOPS" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>

                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />

                  <XAxis dataKey="month" stroke="#cbd5e1" />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#06b6d4"
                    fill="url(#colorOPS)"
                    strokeWidth={3}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* OPS STATUS */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-500/10">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-white">
                Operations Status
              </h2>

              <p className="text-sm text-slate-400">
                Task distribution
              </p>

            </div>

            <div className="h-[350px] flex items-center justify-center">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={opsStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {opsStatusData.map((entry, index) => (

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