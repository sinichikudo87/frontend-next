"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import React, { useState } from "react";
import Swal from "sweetalert2";

import {
  Settings,
  Search,
  MessageCircle,
  Mail,
  Users,
  Shield,
  Bell,
  Database,
  Globe,
} from "lucide-react";

type SettingItem = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: boolean;
};

export default function CRMSettingsPage() {
  const [search, setSearch] = useState("");

  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: 1,
      title: "WhatsApp Notification",
      description: "Send notification via WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      status: true,
    },
    {
      id: 2,
      title: "Email Notification",
      description: "Send notification via Email",
      icon: <Mail className="w-5 h-5" />,
      status: false,
    },
    {
      id: 3,
      title: "Lead Auto Assignment",
      description: "Automatic lead distribution",
      icon: <Users className="w-5 h-5" />,
      status: true,
    },
    {
      id: 4,
      title: "CRM Security",
      description: "Enable CRM security",
      icon: <Shield className="w-5 h-5" />,
      status: true,
    },
    {
      id: 5,
      title: "Realtime Notification",
      description: "Enable realtime notification",
      icon: <Bell className="w-5 h-5" />,
      status: false,
    },
    {
      id: 6,
      title: "API Integration",
      description: "Third party integration",
      icon: <Globe className="w-5 h-5" />,
      status: true,
    },
    {
      id: 7,
      title: "Database Backup",
      description: "Automatic backup system",
      icon: <Database className="w-5 h-5" />,
      status: true,
    },
  ]);

  const filteredSettings = settings.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSetting = (id: number) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: !item.status,
            }
          : item
      )
    );

    Swal.fire({
      title: "Updated",
      text: "CRM setting updated successfully.",
      icon: "success",
      background: "#0f172a",
      color: "#fff",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 text-white space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <Settings className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">CRM Settings</h1>
                <p className="text-sm text-white/50">CRM system configuration</p>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search setting..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition duration-200"
            />
          </div>
        </div>

        {/* LIST - SEKARANG MENJADI LAYOUT GRID */}
        {filteredSettings.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-white/40">
            No settings found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredSettings.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 hover:border-yellow-500/30 transition-all duration-300 shadow-md hover:shadow-yellow-500/[0.02]"
              >
                {/* TOP CONTENT */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 shrink-0">
                      {item.icon}
                    </div>

                    <div className="space-y-1">
                      <h2 className="font-bold text-white tracking-wide">
                        {item.title}
                      </h2>
                      <p className="text-sm text-white/40 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* BOTTOM TOGGLE BAR */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Status: {item.status ? "Active" : "Inactive"}
                  </span>

                  <button
                    onClick={() => toggleSetting(item.id)}
                    className={`w-12 h-7 rounded-full transition-colors duration-300 relative outline-none ${
                      item.status ? "bg-emerald-500" : "bg-white/10 border border-white/5"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${
                        item.status ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}