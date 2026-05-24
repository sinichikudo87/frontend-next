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
  Users,
  UserCheck,
  Building2,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const attendanceData = [
  { month: "Jan", value: 78 },
  { month: "Feb", value: 82 },
  { month: "Mar", value: 88 },
  { month: "Apr", value: 91 },
  { month: "May", value: 89 },
  { month: "Jun", value: 95 },
];

const employeeData = [
  { name: "HRD", value: 40 },
  { name: "Finance", value: 28 },
  { name: "IT", value: 35 },
  { name: "Marketing", value: 22 },
];

const COLORS = ["#ec4899", "#8b5cf6", "#06b6d4", "#10b981"];

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

export default function HRDDashboardPage() {
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
              HRD Dashboard
            </h1>

            <p className="text-white/50 mt-1">
              Monitor employee performance and human resource analytics
            </p>

          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
            <TrendingUp className="w-4 h-4 text-emerald-400" />

            <span className="text-sm text-white/70">
              Employee Growth +8.2%
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
                <Users className="w-6 h-6 text-emerald-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-emerald-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Total Employees
            </p>

            <h2 className="text-4xl font-black mt-2">
              248
            </h2>

            <span className="text-emerald-400 text-xs">
              +12 this month
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
                <UserCheck className="w-6 h-6 text-cyan-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-cyan-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Attendance
            </p>

            <h2 className="text-4xl font-black mt-2">
              92%
            </h2>

            <span className="text-cyan-400 text-xs">
              Stable performance
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
                <Building2 className="w-6 h-6 text-fuchsia-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-fuchsia-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Departments
            </p>

            <h2 className="text-4xl font-black mt-2">
              12
            </h2>

            <span className="text-fuchsia-400 text-xs">
              Active divisions
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
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/20 to-pink-500/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10"
          >

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-pink-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-pink-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Performance
            </p>

            <h2 className="text-4xl font-black mt-2">
              88%
            </h2>

            <span className="text-pink-400 text-xs">
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

          {/* Attendance Chart */}
          <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-500/10">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-white">
                Attendance Overview
              </h2>

              <p className="text-sm text-slate-400">
                Monthly employee attendance statistics
              </p>

            </div>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={attendanceData}>

                  <defs>

                    <linearGradient
                      id="colorAttendance"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                    </linearGradient>

                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff10"
                  />

                  <XAxis
                    dataKey="month"
                    stroke="#cbd5e1"
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#e879f9"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorAttendance)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Pie Chart */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">

            <div className="mb-6">

              <h2 className="text-xl font-bold text-white">
                Employee Distribution
              </h2>

              <p className="text-sm text-slate-400">
                Employee percentage by division
              </p>

            </div>

            <div className="h-[350px] flex items-center justify-center">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={employeeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {employeeData.map((entry, index) => (

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