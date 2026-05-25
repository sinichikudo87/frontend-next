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

const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981"];

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

interface DashboardProps {
  data: {
    summary: {
      customers: number;
      leads: number;
      deals: number;
      conversion: number;
    };

    activityData: {
      month: string;
      value: number;
    }[];

    customerData: {
      name: string;
      value: number;
    }[];

    leadSourceData: {
      source: string;
      total: number;
    }[];

    recentActivities: {
      title: string;
      time: string;
    }[];
  };
}

export default function CRMDashboardPage({
  data,
}: DashboardProps) {

  const {
    summary,
    activityData,
    customerData,
    leadSourceData,
    recentActivities,
  } = data;

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

        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 p-6">

            <p className="text-slate-400 text-sm">
              Total Customers
            </p>

            <h2 className="text-4xl font-black mt-2">
              {summary.customers}
            </h2>

          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 p-6">

            <p className="text-slate-400 text-sm">
              Active Leads
            </p>

            <h2 className="text-4xl font-black mt-2">
              {summary.leads}
            </h2>

          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-500/5 p-6">

            <p className="text-slate-400 text-sm">
              Deals Closed
            </p>

            <h2 className="text-4xl font-black mt-2">
              {summary.deals}
            </h2>

          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 p-6">

            <p className="text-slate-400 text-sm">
              Conversion Rate
            </p>

            <h2 className="text-4xl font-black mt-2">
              {summary.conversion}%
            </h2>

          </div>

        </div>

        {/* CHART */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.05] p-6">

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

        </div>

      </motion.div>

    </DashboardLayout>
  );
}