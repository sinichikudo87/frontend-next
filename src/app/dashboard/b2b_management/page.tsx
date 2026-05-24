"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayoutB2B";

import PenawaranTab from "./tabs/Penawaran";
import JadwalTab from "./tabs/Jadwal";
import PlusDriverTab from "./tabs/PlusDriver";
import LepasKunciTab from "./tabs/LepasKunci";
import BulananTab from "./tabs/Bulanan";
import ReportingTab from "./tabs/Reporting";
import PartnerTab from "./tabs/Partner";
import DriverTab from "./tabs/Driver";
import PelaporanTab from "./tabs/Pelaporan";

import {
  Megaphone,
  Calendar,
  Users,
  KeyRound,
  BarChart3,
  FileText,
  Handshake,
  User,
  ClipboardList, LayoutDashboard, ArrowRight
} from "lucide-react";

import { useRouter } from "next/navigation";

const modules = [
  { name: "Penawaran", icon: Megaphone, component: PenawaranTab, color: "from-pink-500 to-rose-500" },
  { name: "Jadwal", icon: Calendar, component: JadwalTab, color: "from-blue-500 to-cyan-500" },
  { name: "Plus Driver", icon: Users, component: PlusDriverTab, color: "from-purple-500 to-indigo-500" },
  { name: "Lepas Kunci", icon: KeyRound, component: LepasKunciTab, color: "from-orange-400 to-yellow-500" },
  { name: "Bulanan", icon: BarChart3, component: BulananTab, color: "from-emerald-500 to-green-500" },
  { name: "Reporting", icon: FileText, component: ReportingTab, color: "from-slate-500 to-gray-500" },
  { name: "Partner", icon: Handshake, component: PartnerTab, color: "from-fuchsia-500 to-pink-500" },
  { name: "Driver", icon: User, component: DriverTab, color: "from-sky-500 to-blue-500" },
  { name: "Pelaporan", icon: ClipboardList, component: PelaporanTab, color: "from-violet-500 to-purple-500" },
];

export default function B2BDashboardPage() {
  const [activeTab, setActiveTab] = useState("Penawaran");

  const activeModule = modules.find((m) => m.name === activeTab);
  const ActiveComponent = activeModule?.component ?? PenawaranTab;
  const ActiveIcon = activeModule?.icon ?? Megaphone;
  const router = useRouter();

  return (
    <DashboardLayout>

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

        {/* LEFT */}
        <div className="text-center lg:text-left">
          <p className="text-white/70 text-lg">
            Selamat Datang
          </p>

          <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 text-transparent bg-clip-text">
            PT WISATA JATIM TRANS INDONESIA
          </h1>

          <p className="text-slate-300 text-sm mt-1">
            B2B Dashboard Manajemen
          </p>
        </div>

        {/* RIGHT ACTION */}
        <div className="flex items-center justify-center lg:justify-end gap-3">

          {/* ADMIN DASHBOARD */}
          <button
            onClick={() => router.push("/dashboard/admin")}
            className="group relative overflow-hidden h-14 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-[0_10px_35px_rgba(59,130,246,0.35)] flex items-center gap-4"
          >

            {/* GLOW */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10" />

            {/* ICON */}
            <div className="relative w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center backdrop-blur-xl group-hover:rotate-6 transition-all duration-300">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>

            {/* TEXT */}
            <div className="relative text-left">
              <p className="text-[11px] text-white/70 leading-none">
                Quick Access
              </p>

              <h3 className="text-sm font-semibold text-white">
                Dashboard Admin
              </h3>
            </div>

            {/* BADGE */}
            <div className="relative w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition" />
            </div>

            {/* SHINE */}
            <div className="absolute top-0 -left-[120%] w-[120px] h-full bg-white/20 blur-2xl rotate-12 group-hover:left-[120%] transition-all duration-1000" />

          </button>

        </div>

      </div>

      {/* TAB NAVIGATION */}
      <div className="flex gap-3 overflow-x-auto p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-xl">

        {modules.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl text-sm transition-all duration-300 whitespace-nowrap group ${isActive ? "text-white font-semibold bg-white/10 shadow-md" : "text-white/60 hover:text-white hover:bg-white/10"}`}
            >

              {/* ICON */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-md transition-all duration-300 ${isActive ? "scale-110 shadow-lg" : "opacity-80 group-hover:opacity-100"}`}
              >
                <Icon size={20} className="text-white" />
              </div>

              {/* LABEL */}
              <span className="relative text-base">
                {item.name}

                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full" />
                )}
              </span>

              {/* ACTIVE DOT */}
              {isActive && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
              )}

            </button>
          );
        })}

      </div>

      {/* CONTENT */}
      <div className="mt-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-2xl p-8 shadow-xl">

        {/* HEADER CONTENT */}
        <div className="flex items-center gap-3 mb-6">

          <div
            className={`
              w-12 h-12 rounded-xl flex items-center justify-center
              bg-gradient-to-br ${activeModule?.color}
              shadow-lg
            `}
          >
            <ActiveIcon size={20} className="text-white" />
          </div>

          <h2 className="text-white text-xl font-bold">
            {activeTab}
          </h2>

        </div>

        {/* TAB CONTENT RENDER */}
        <ActiveComponent />

      </div>

    </DashboardLayout>
  );
}