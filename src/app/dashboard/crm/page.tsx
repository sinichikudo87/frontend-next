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
} from "recharts";

import {
  Users,
  BadgeDollarSign,
  TrendingUp,
  Target,
  PhoneCall,
  ArrowUpRight,
} from "lucide-react";

const activityData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 150 },
  { month: "Mar", value: 180 },
  { month: "Apr", value: 170 },
  { month: "May", value: 210 },
  { month: "Jun", value: 240 },
];

const customerData = [
  { name: "New Leads", value: 45 },
  { name: "Prospects", value: 30 },
  { name: "Negotiation", value: 25 },
  { name: "Won Deals", value: 20 },
];

const leadSourceData = [
  { source: "Facebook", total: 120 },
  { source: "Instagram", total: 98 },
  { source: "Website", total: 76 },
  { source: "WhatsApp", total: 65 },
];

const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981"];

const recentActivities = [
  {
    title: "New lead from Facebook Ads",
    time: "5 minutes ago",
  },
  {
    title: "Quotation sent to PT Petrosea",
    time: "20 minutes ago",
  },
  {
    title: "Deal closed with PT Freeport",
    time: "1 hour ago",
  },
  {
    title: "Customer follow up completed",
    time: "2 hours ago",
  },
];

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

export default function CRMDashboardPage() {
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
              CRM Dashboard
            </h1>

            <p className="text-white/50 mt-1">
              Monitor customer activity and sales performance
            </p>

          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
            <TrendingUp className="w-4 h-4 text-emerald-400" />

            <span className="text-sm text-white/70">
              Revenue Growth +12.8%
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
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10"
          >

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-emerald-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Total Customers
            </p>

            <h2 className="text-4xl font-black mt-2">
              1,248
            </h2>

            <span className="text-emerald-400 text-xs">
              +85 this month
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
                <Target className="w-6 h-6 text-cyan-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-emerald-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Active Leads
            </p>

            <h2 className="text-4xl font-black mt-2">
              342
            </h2>

            <span className="text-cyan-400 text-xs">
              Growing pipeline
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
                <BadgeDollarSign className="w-6 h-6 text-fuchsia-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-emerald-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Deals Closed
            </p>

            <h2 className="text-4xl font-black mt-2">
              128
            </h2>

            <span className="text-fuchsia-400 text-xs">
              +18 this month
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
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>

              <ArrowUpRight className="w-5 h-5 text-emerald-400" />

            </div>

            <p className="text-slate-400 text-sm mt-5">
              Conversion Rate
            </p>

            <h2 className="text-4xl font-black mt-2">
              38%
            </h2>

            <span className="text-emerald-400 text-xs">
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

          {/* ACTIVITY */}
          <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">

            <div className="mb-6">

              <h2 className="text-xl font-bold">
                CRM Activity Overview
              </h2>

              <p className="text-sm text-slate-400">
                Leads and sales performance analytics
              </p>

            </div>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={activityData}>

                  <defs>

                    <linearGradient id="colorCRM" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>

                  </defs>

                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />

                  <XAxis dataKey="month" stroke="#94a3b8" />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#a78bfa"
                    fill="url(#colorCRM)"
                    strokeWidth={3}
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* PIE */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-500/10">

            <div className="mb-6">

              <h2 className="text-xl font-bold">
                Sales Pipeline
              </h2>

              <p className="text-sm text-slate-400">
                Deal stage distribution
              </p>

            </div>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={customerData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {customerData.map((entry, index) => (

                      <Cell
                        key={index}
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

        {/* BOTTOM */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEAD SOURCES */}
          <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">

            <div className="mb-6">

              <h2 className="text-xl font-bold">
                Lead Sources
              </h2>

              <p className="text-sm text-slate-400">
                Traffic and lead generation channels
              </p>

            </div>

            <div className="h-[320px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={leadSourceData}>

                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />

                  <XAxis dataKey="source" stroke="#94a3b8" />

                  <Tooltip />

                  <Bar
                    dataKey="total"
                    radius={[10, 10, 0, 0]}
                    fill="#8b5cf6"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* ACTIVITY */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">

            <div className="mb-6">

              <h2 className="text-xl font-bold">
                Recent Activity
              </h2>

              <p className="text-sm text-slate-400">
                Latest CRM updates
              </p>

            </div>

            <div className="space-y-4">

              {recentActivities.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5"
                >

                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4 text-indigo-400" />
                  </div>

                  <div>

                    <p className="text-sm font-medium">
                      {item.title}
                    </p>

                    <span className="text-xs text-white/40">
                      {item.time}
                    </span>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </div>

      </motion.div>

    </DashboardLayout>
  );
}