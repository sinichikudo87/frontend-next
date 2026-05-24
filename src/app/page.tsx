"use client";

import { useState } from "react";
import {
  LogOut,
  Settings,
  MessageCircle,
  PhoneCall,
  X,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

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

export default function PortalPage() {
  const [openMenu, setOpenMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const bubbles = [
    { size: "w-16 h-16", left: "left-[5%]", delay: "0s", duration: "16s" },
    { size: "w-24 h-24", left: "left-[15%]", delay: "3s", duration: "22s" },
    { size: "w-12 h-12", left: "left-[30%]", delay: "1s", duration: "14s" },
    { size: "w-32 h-32", left: "left-[45%]", delay: "5s", duration: "26s" },
    { size: "w-20 h-20", left: "left-[60%]", delay: "2s", duration: "19s" },
    { size: "w-28 h-28", left: "left-[75%]", delay: "7s", duration: "24s" },
    { size: "w-14 h-14", left: "left-[90%]", delay: "4s", duration: "17s" },
  ];

  const contacts = [
    {
      name: "Customer Service",
      number: "6282245760966",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Marketing Team",
      number: "6282221074098",
      color: "from-cyan-400 to-blue-500",
    },
  ];

  const divisions = [
    {
      name: "B2B Management",
      description: "Business partnership management and enterprise collaboration.",
      href: "/dashboard/b2b_management",
      gradient: "from-cyan-500 to-sky-500",
      icon: "🏢",
    },
    {
      name: "CRM",
      description: "Customer relationship management and customer analytics.",
      href: "/dashboard/crm",
      gradient: "from-violet-500 to-purple-500",
      icon: "📊",
    },
    {
      name: "KPI",
      description: "Performance indicator monitoring and business evaluation dashboard.",
      href: "/dashboard/kpi",
      gradient: "from-rose-500 to-pink-500",
      icon: "📈",
    },
    {
      name: "Accounting",
      description: "Financial management, invoices, reporting, and accounting system.",
      href: "/dashboard/accounting",
      gradient: "from-blue-500 to-indigo-500",
      icon: "💰",
    },
    {
      name: "HRD",
      description: "Employee management, attendance, payroll, and HR analytics.",
      href: "/dashboard/hrd",
      gradient: "from-emerald-500 to-teal-500",
      icon: "👥",
    },
    {
      name: "Operations",
      description: "Operational activities, monitoring, and workflow management.",
      href: "/dashboard/operations",
      gradient: "from-orange-500 to-amber-500",
      icon: "⚙️",
    },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Logout",
      cancelButtonText: "Cancel",
      background: "#1e1b4b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      window.location.href = "/login";
    }
  };

  return (
    <main className="min-h-screen w-full text-white overflow-hidden relative bg-[linear-gradient(to_right,_#160040,_#9A0680)]">
      
      {/* STYLE INJECTION UNTUK ANIMASI GELEMBUNG */}
      <style>{`
        .bubble-effect {
          position: absolute;
          bottom: -150px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(10px);
          animation-name: bubbleFloat;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          box-shadow: inset 0 0 20px rgba(255,255,255,0.15), 0 0 30px rgba(255,255,255,0.08);
          pointer-events: none;
        }
        .bubble-effect::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 1px solid rgba(255,255,255,0.12);
        }
        @keyframes bubbleFloat {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          25% { transform: translate3d(40px, -25vh, 0) scale(1.05); }
          50% { transform: translate3d(-30px, -55vh, 0) scale(1.12); }
          75% { transform: translate3d(50px, -85vh, 0) scale(1.18); }
          100% { transform: translate3d(-40px, -120vh, 0) scale(1.25); opacity: 0; }
        }
      `}</style>

      {/* RENDER ANIMASI GELEMBUNG DI BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            className={`bubble-effect ${bubble.size} ${bubble.left}`}
            style={{
              animationDelay: bubble.delay,
              animationDuration: bubble.duration,
            }}
          />
        ))}
      </div>

      {/* TOP RIGHT */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 right-4 sm:right-6 lg:right-10 z-50"
      >
        {/* DESKTOP */}
        <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-600 flex items-center justify-center text-sm font-bold shadow-xl">
            DK
          </div>
          <div>
            <p className="text-xs text-slate-300">Welcome Back</p>
            <h4 className="text-sm font-bold text-white leading-tight">Dedy Angga</h4>
          </div>
          <div className="w-px h-10 bg-white/10 mx-1" />
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg"
          >
            <LogOut size={18} />
          </motion.button>
        </div>

        {/* MOBILE */}
        <div className="sm:hidden relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpenMenu(!openMenu)}
            className="w-11 h-11 flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] backdrop-blur-2xl shadow-xl"
          >
            <Settings size={20} />
          </motion.button>
          <AnimatePresence>
            {openMenu && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#1b063f]/95 backdrop-blur-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-600 flex items-center justify-center text-sm font-bold">
                    DK
                  </div>
                  <div>
                    <p className="text-xs text-slate-300">Welcome Back</p>
                    <h4 className="text-sm font-bold text-white">Dedy Angga</h4>
                  </div>
                </div>
                <div className="h-px bg-white/10 mb-4" />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 py-3 text-sm font-semibold"
                >
                  <LogOut size={16} />
                  Logout
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />

      {/* GLOW */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-fuchsia-500/20 blur-[180px] rounded-full z-0 pointer-events-none"
      />

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.06),_transparent_35%)] z-0 pointer-events-none" />

      {/* CONTENT */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full px-4 sm:px-6 lg:px-10 py-16"
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-5 shadow-lg">
            <span className="text-pink-300 text-xs animate-pulse">◆</span>
            <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-slate-200">
              Enterprise Management Portal
            </span>
          </div>

          <h1 className="flex items-center justify-center gap-3 text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">
            <span className="text-white">CARLINX</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-300">
              PORTAL
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-200 text-sm md:text-base leading-relaxed">
            Centralized enterprise platform for all business divisions with modern dashboard architecture.
          </p>
        </motion.div>

        {/* CARDS */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 w-full"
        >
          {divisions.map((division) => (
            <motion.a
              key={division.name}
              href={division.href}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-5 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.30)] w-full"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-all duration-500 bg-gradient-to-br ${division.gradient}`} />
              <div className="absolute inset-[1px] rounded-[27px] border border-white/5 pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${division.gradient} flex items-center justify-center text-2xl shadow-2xl`}
                  >
                    {division.icon}
                  </motion.div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:border-white/20 transition-all duration-300 text-sm">
                    ↗
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-bold mb-2 tracking-tight">{division.name}</h2>
                  <p className="text-slate-200 leading-relaxed text-xs">{division.description}</p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-slate-300">
                    Open Dashboard
                  </span>
                  <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide bg-gradient-to-r ${division.gradient}`}>
                    ACCESS
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* CONTACT LIST */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-40 flex flex-col gap-3"
          >
            {contacts.map((item, index) => (
              <motion.a
                key={index}
                href={`https://wa.me/${item.number}`}
                target="_blank"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/15 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}>
                  <PhoneCall className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                  <p className="text-xs text-white/50">+{item.number}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOAT BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 flex items-center justify-center shadow-[0_10px_40px_rgba(34,197,94,0.45)] transition-all duration-500 ${open ? "rotate-180 scale-110" : ""}`}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40 animate-ping"></span>
        <span className="absolute inset-0 rounded-full bg-green-400 blur-2xl opacity-30 animate-pulse"></span>
        <div className="relative z-10">
          {open ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white animate-bounce" />
          )}
        </div>
      </motion.button>
    </main>
  );
}