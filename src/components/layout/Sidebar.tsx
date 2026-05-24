"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import hrdMenu from "@/modules/hrd/menu";
import crmMenu from "@/modules/crm/menu";
import kpiMenu from "@/modules/kpi/menu";
import operationsMenu from "@/modules/operations/menu";
import accountingMenu from "@/modules/accounting/menu";

import { hrdConfig } from "@/modules/hrd/config";
import { kpiConfig } from "@/modules/kpi/config";
import { operationsConfig } from "@/modules/operations/config";
import { accountingConfig } from "@/modules/accounting/config";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isCRM = pathname.includes("/crm");
  const isHRD = pathname.includes("/hrd");
  const isKPI = pathname.includes("/kpi");
  const isOPS = pathname.includes("/operations");
  const isACC = pathname.includes("/accounting");

  let menu = hrdMenu;
  let config = hrdConfig;

  if (isCRM) {
    menu = crmMenu;
    config = {
      name: "CRM",
      subtitle: "Customer Relationship System",
    };
  }

  if (isHRD) {
    menu = hrdMenu;
    config = hrdConfig;
  }

  if (isKPI) {
    menu = kpiMenu;
    config = kpiConfig;
  }

  if (isOPS) {
    menu = operationsMenu;
    config = operationsConfig;
  }

  if (isACC) {
    menu = accountingMenu;
    config = accountingConfig;
  }

  const SidebarContent = () => (
    <>
      {/* BRAND */}
      <div className="mb-10">
        <h1 className="text-2xl font-black text-white">{config.name}</h1>
        <p className="text-xs text-slate-400 mt-1">{config.subtitle}</p>
      </div>

      {/* MENU */}
      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-2xl transition-all
                ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );

  // Di dalam Sidebar.tsx bagian return:

return (
  <>
    {/* MOBILE HEADER */}
    <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between p-4 border-b border-white/10 bg-[#160040] backdrop-blur-2xl">
      <h1 className="text-white font-bold">{config.name}</h1>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-xl bg-white/10 text-white active:scale-95 transition-transform"
      >
        <Menu size={20} />
      </button>
    </div>

    {/* DESKTOP SIDEBAR */}
    <aside className="hidden lg:flex w-72 border-r border-white/10 bg-white/[0.04] backdrop-blur-2xl p-5 flex-col">
      <SidebarContent />
    </aside>

    {/* MOBILE SIDEBAR MODAL */}
    {open && (
      <div className="fixed inset-0 z-[100] lg:hidden">
        {/* 1. Overlay */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={() => setOpen(false)} 
        />

        {/* 2. Panel */}
        <div className="absolute top-0 left-0 w-72 h-full bg-[#111] p-5 shadow-2xl flex flex-col">
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setOpen(false)}
              className="p-2 rounded-xl bg-white/10 text-white"
            >
              <X size={20} />
            </button>
          </div>
          <SidebarContent />
        </div>
      </div>
    )}
  </>
);
}