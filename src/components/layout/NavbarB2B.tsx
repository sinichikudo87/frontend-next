import Link from "next/link";
import { Bell, Search, ArrowLeft } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-24 border-b border-white/10 bg-white/[0.04] backdrop-blur-2xl px-6 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Back Button */}
        <Link href="/" className="w-11 h-11 flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.10] transition-all duration-300 backdrop-blur-xl shadow-lg">
          <ArrowLeft size={18} />
        </Link>

        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-xs text-slate-400">
            Welcome back, Dedy Angga
          </p>
        </div>
      </div>

      {/* Right */}
      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Search (B2B Focus) */}
        <div className="hidden md:flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-xl px-4 h-11">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search deals, clients..."
            className="bg-transparent outline-none text-sm text-white placeholder:text-slate-500 w-52"
          />
        </div>

        {/* B2B Deal Alerts */}
        <button className="relative w-11 h-11 rounded-xl border border-white/10 bg-white/[0.05] flex items-center justify-center text-slate-300 hover:bg-white/[0.08] transition-all">

          <Bell size={18} />

          {/* indicator */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </button>

      </div>
    </header>
  );
}