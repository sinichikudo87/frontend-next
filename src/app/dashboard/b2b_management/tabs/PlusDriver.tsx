"use client";
import { useState } from "react";
import {
    MapPin,
    Calendar,
    Car,
    Search,
    Route,
    Check,
    ArrowRight,
    Zap,
    Layers,
    Compass,
    Building2
} from "lucide-react";

export default function PlusDriverTab() {
    const [mode, setMode] = useState("direct");

    const [extras, setExtras] = useState([
        { id: 'bbm', label: 'BBM', active: true },
        { id: 'makan', label: 'Makan Driver', active: false },
        { id: 'inap', label: 'Inap Driver', active: false },
        { id: 'transfer_in', label: 'Transfer In', active: false },
        { id: 'transfer_out', label: 'Transfer Out', active: false },
        { id: 'parkir', label: 'Parkir', active: false },
        { id: 'snack', label: 'Snack', active: false },
        { id: 'wedding', label: 'Wedding', active: false },
        { id: 'tol', label: 'Tol', active: false },
    ]);

    const toggleExtra = (id: string) => {
        setExtras(prev =>
            prev.map(item =>
                item.id === id ? { ...item, active: !item.active } : item
            )
        );
    };

    const modes = [
        { key: "single", label: "Single", icon: Zap },
        { key: "multi", label: "Multi", icon: Layers },
        { key: "direct", label: "Direct", icon: Compass },
    ] as const;

    return (
        <div className="w-full min-h-screen px-8 py-6 text-white">

            <div className="grid grid-cols-12 gap-10 mt-8 w-full">

                {/* LEFT */}
                <div className="col-span-12 lg:col-span-9 space-y-8">

                    {/* MODE SWITCH */}
                    <div className="relative flex w-full p-1.5 rounded-2xl bg-white/5 border border-white/10">

                        <div
                            className={`absolute inset-y-1.5 left-1.5 w-1/3 rounded-xl transition-all duration-500 ${mode === "single"
                                ? "translate-x-0 bg-gradient-to-r from-orange-500 to-pink-500"
                                : mode === "multi"
                                    ? "translate-x-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                    : "translate-x-[200%] bg-gradient-to-r from-purple-500 to-indigo-500"
                                }`}
                        />

                        {modes.map(m => {
                            const Icon = m.icon;

                            return (
                                <button
                                    key={m.key}
                                    onClick={() => setMode(m.key)}
                                    className={`relative z-10 flex-1 py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest ${mode === m.key ? "text-white" : "text-white/30"
                                        }`}
                                >
                                    <Icon size={14} />
                                    {m.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* PICKUP */}
                        <div className="space-y-1">
                            <label className="text-xs text-white/40 ml-1">Pickup Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400" size={18} />
                                <input className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12" />
                            </div>
                        </div>

                        {/* DESTINATION */}
                        <div className="space-y-1">
                            <label className="text-xs text-white/40 ml-1">Destination</label>
                            <div className="relative">
                                <ArrowRight className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
                                <input className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12" />
                            </div>
                        </div>

                        {/* JEMPUT */}
                        <div className="space-y-1">
                            <label className="text-xs text-white/40 ml-1">Tanggal Jemput</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12" />
                            </div>
                        </div>

                        {/* SELESAI */}
                        <div className="space-y-1">
                            <label className="text-xs text-white/40 ml-1">Tanggal Selesai</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12" />
                            </div>
                        </div>

                        {/* VENDOR + MOBIL */}
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* VENDOR */}
                            <div className="space-y-1">
                                <label className="text-xs text-white/40 ml-1">Vendor</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400" size={18} />
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12">
                                        <option>Pilih Vendor</option>
                                        <option>Vendor A</option>
                                        <option>Vendor B</option>
                                    </select>
                                </div>
                            </div>

                            {/* MOBIL */}
                            <div className="space-y-1">
                                <label className="text-xs text-white/40 ml-1">Mobil</label>
                                <div className="relative">
                                    <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12">
                                        <option>Pilih Mobil</option>
                                        <option>SUV Executive</option>
                                        <option>Sedan Luxury</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* BIAYA TAMBAHAN */}
                    <div className="mt-6">

                        <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                            Biaya Tambahan
                        </div>

                        <div className="border-t border-white/10 mb-4"></div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                            {extras.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => toggleExtra(item.id)}
                                    className={`flex items-center gap-3 p-4 rounded-xl border transition ${item.active
                                        ? "bg-cyan-500/10 border-cyan-500"
                                        : "bg-white/5 border-white/5"
                                        }`}
                                >
                                    <div className={`w-5 h-5 flex items-center justify-center rounded border ${item.active ? "bg-cyan-500 border-cyan-500" : "border-white/20"
                                        }`}>
                                        {item.active && <Check size={12} className="text-black" />}
                                    </div>
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            ))}

                        </div>

                    </div>

                </div>

                {/* RIGHT */}
                <div className="col-span-12 lg:col-span-3">

                    <div className="sticky top-6 bg-white/5 border border-white/10 rounded-3xl p-6">

                        <div className="flex items-center gap-2 mb-4">
                            <Route size={18} className="text-cyan-400" />
                            <h3 className="font-bold">Estimasi</h3>
                        </div>

                        <div className="text-xs text-white/40 space-y-1">
                            <p>Pickup: Surabaya</p>
                            <p>Destination: -</p>
                        </div>

                        <div className="mt-6 space-y-2 text-xs">

                            <div className="flex justify-between text-white/40">
                                <span>Base Fare</span>
                                <span>Rp 850.000</span>
                            </div>

                            <div className="border-t border-white/10 my-3"></div>

                            {extras.filter(e => e.active).map(e => (
                                <div key={e.id} className="flex justify-between text-cyan-400">
                                    <span>+ {e.label}</span>
                                    <span>Include</span>
                                </div>
                            ))}

                        </div>

                        <button className="mt-6 w-full bg-cyan-500 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                            <Search size={16} />
                            Search Unit
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}