"use client";

import { useEffect, useState } from "react";
import {
  X,
  Package2,
  Hash,
  Wallet,
  ReceiptText,
  Sparkles,
} from "lucide-react";
import Swal from "sweetalert2";

import { updateTenderDetail } from "@/lib/crm/tenders/update";

type UnitStatus = "pengajuan" | "approval" | "rejected";

type UnitDetail = {
  detail_id: number;
  category_name: string;
  qty: number;
  price_per_unit: number;
  subtotal: number;
  statusPenawaranDetails?: UnitStatus;
};

type Props = {
  open: boolean;
  onClose: () => void;
  data: UnitDetail | null;
  onSave?: (payload: UnitDetail) => void;
};

export default function EditQuotationModal({
  open,
  onClose,
  data,
  onSave,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<UnitDetail>({
    detail_id: 0,
    category_name: "",
    qty: 1,
    price_per_unit: 0,
    subtotal: 0,
  });

  /* ================= SYNC DATA ================= */
  useEffect(() => {
    if (open && data) {
      setForm({
        detail_id: data.detail_id,
        category_name: data.category_name || "",
        qty: data.qty || 1,
        price_per_unit: data.price_per_unit || 0,
        subtotal: data.subtotal || 0,
      });
    }
  }, [data, open]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (key: keyof UnitDetail, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]:
        key === "qty" || key === "price_per_unit"
          ? Number(value) || 0
          : value,
    }));
  };

  /* ================= SUBTOTAL (DERIVED) ================= */
  const subtotal =
    Number(form.qty || 0) * Number(form.price_per_unit || 0);

  /* ================= SAVE ================= */
  const handleSave = async () => {
    try {
      if (!form.detail_id) {
        Swal.fire("Error", "Detail ID tidak ditemukan", "error");
        return;
      }

      setLoading(true);

      const payload: UnitDetail = {
        detail_id: form.detail_id,
        category_name: form.category_name,
        qty: Number(form.qty),
        price_per_unit: Number(form.price_per_unit),
        subtotal,
      };

      const response = await updateTenderDetail(
        form.detail_id,
        payload
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response?.message || "Updated successfully",
      });

      onSave?.(payload);
      onClose();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err?.message || "Failed update quotation",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">

      {/* GLOW */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-yellow-500/10 blur-3xl" />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0f172a]/95 overflow-hidden">

        {/* TOP BAR */}
        <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400" />

        {/* HEADER */}
        <div className="flex justify-between px-7 pt-7 pb-5 border-b border-white/10">

          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Edit Quotation
              </h2>
              <p className="text-sm text-white/40">
                Update unit & pricing
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>

        </div>

        {/* BODY */}
        <div className="p-7 space-y-6">

          {/* KATEGORI */}
          <div>
            <label className="text-sm text-white/50">
              Kategori
            </label>

            {/* WRAPPER */}
            <div
              className="
      relative
      mt-2
      rounded-xl
      p-[1.5px]
      overflow-hidden
      bg-white/5
      backdrop-blur-xl
    "
            >

              {/* NEON BORDER */}
              <div
                className="
        absolute inset-0
        rounded-xl
        bg-[conic-gradient(from_0deg,#facc15,#f97316,#06b6d4,#facc15)]
        animate-[spin_10s_linear_infinite]
      "
              />

              {/* GLOW */}
              <div
                className="
        absolute inset-0
        rounded-xl
        blur-md
        opacity-40
        bg-[conic-gradient(from_0deg,#facc15,#f97316,#06b6d4,#facc15)]
        animate-[spin_10s_linear_infinite]
      "
              />

              {/* INPUT */}
              <input
                value={form.category_name}
                readOnly
                className="
        relative
        w-full h-12 px-4
        rounded-xl
        bg-[#0f172a]/95
        text-white/80
        outline-none
        border border-white/10
        cursor-not-allowed
      "
              />

            </div>
          </div>

          {/* QTY & PRICE */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-white/50">Qty</label>
              <input
                type="number"
                value={form.qty}
                onChange={(e) =>
                  handleChange("qty", e.target.value)
                }
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-white/50">Price</label>
              <input
                type="number"
                value={form.price_per_unit}
                onChange={(e) =>
                  handleChange("price_per_unit", e.target.value)
                }
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

          </div>

          {/* SUBTOTAL */}
          <div>

            <div
              className="
      relative
      overflow-hidden
      rounded-2xl
      border border-yellow-500/20
      bg-gradient-to-br from-yellow-500/10 to-orange-500/10
      backdrop-blur-xl
      shadow-lg shadow-yellow-500/10
    "
            >

              {/* GLOW */}
              <div
                className="
        absolute -top-10 -right-10
        w-32 h-32
        bg-yellow-400/20
        rounded-full
        blur-3xl
      "
              />

              {/* CONTENT */}
              <div className="relative flex items-center justify-between px-5 py-4">

                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-yellow-400/60">
                    Total Amount
                  </p>

                  <h2 className="text-2xl font-bold text-yellow-300 mt-1">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </h2>
                </div>

                {/* ICON */}
                <div
                  className="
          w-14 h-14
          rounded-2xl
          bg-gradient-to-br from-yellow-400 to-orange-500
          flex items-center justify-center
          shadow-lg shadow-yellow-500/20
        "
                >
                  <ReceiptText className="w-7 h-7 text-black" />
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-7 py-5 border-t border-white/10">

          <button
            onClick={onClose}
            className="px-5 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 h-11 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>
    </div>
  );
}