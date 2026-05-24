"use client";

import { FileText, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DocumentationModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  const documents = [
    {
      name: "Quotation.pdf",
      description: "Main quotation document",
    },
    {
      name: "Vehicle-Specification.pdf",
      description: "Vehicle detail specification",
    },
    {
      name: "Customer-Request.pdf",
      description: "Customer requirement document",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111827] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">

          <div>
            <h2 className="text-lg font-bold text-white">
              Documentation Files
            </h2>

            <p className="text-sm text-white/50 mt-1">
              Supporting quotation approval documents
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">

          {documents.map((doc, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex items-center justify-between hover:bg-white/[0.05] transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-cyan-400" />
                </div>

                <div>
                  <div className="font-medium text-white">
                    {doc.name}
                  </div>

                  <div className="text-sm text-white/40 mt-1">
                    {doc.description}
                  </div>
                </div>
              </div>

              <button className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-sm font-medium">
                View
              </button>
            </div>
          ))}

        </div>

        {/* FOOTER */}
        <div className="px-6 py-5 border-t border-white/10 bg-black/20 flex justify-end">

          <button
            onClick={onClose}
            className="h-11 px-5 rounded-2xl bg-white/5 hover:bg-white/10 transition text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}