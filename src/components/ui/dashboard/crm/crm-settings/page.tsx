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
      <div className="p-4 md:p-6 text-white">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>
            <div className="flex items-center gap-2 mb-1">

              <div className="w-9 h-9 rounded-lg bg-yellow-500 flex items-center justify-center">
                <Settings className="w-5 h-5 text-black" />
              </div>

              <h1 className="text-2xl font-bold">
                CRM Settings
              </h1>
            </div>

            <p className="text-sm text-white/50">
              CRM system configuration
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-[300px]">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

            <input
              type="text"
              placeholder="Search setting..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
            />
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">

          {filteredSettings.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >

              {/* LEFT */}
              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                  {item.icon}
                </div>

                <div>
                  <h2 className="font-medium text-white">
                    {item.title}
                  </h2>

                  <p className="text-sm text-white/50">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <button
                onClick={() => toggleSetting(item.id)}
                className={`w-14 h-8 rounded-full transition relative ${
                  item.status
                    ? "bg-emerald-500"
                    : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${
                    item.status ? "right-1" : "left-1"
                  }`}
                />
              </button>

            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}