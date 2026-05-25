"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  X,
  Loader2,
  ExternalLink,
  FileImage,
  AlertTriangle,
  FolderOpen,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { API_CONFIG } from "@/lib/config";
import { generateSignature } from "@/lib/hmac";
import { encryptId } from "@/lib/helpers/encrypt";

type Props = {
  open: boolean;
  tenderId: number | null;
  onClose: () => void;
};

type ApiDocumentItem = {
  id: number;
  deskripsi: string;
  nama_file_asli: string;
  file_type: string;
  formatted_size: string;
  file_url: string;
};

export default function DocumentationModal({
  open,
  tenderId,
  onClose,
}: Props) {
  const [documents, setDocuments] = useState<ApiDocumentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUploadedDocuments = async () => {
      if (!open || !tenderId) return;

      setLoading(true);
      setErrorMessage(null);

      try {
        const encryptedId = encryptId(tenderId.toString());
        const safeEncryptedId = encodeURIComponent(encryptedId);

        const method = "GET";

        const urlSignature = `/public/v1/tenders/tender-documents-customer/${encryptedId}/documents`;

        const urlFetch = `/public/v1/tenders/tender-documents-customer/${safeEncryptedId}/documents`;

        const timestamp = Math.floor(Date.now() / 1000);

        const secret = process.env.NEXT_PUBLIC_API_SECRET_KEY ?? "";

        const signature = generateSignature(
          method,
          urlSignature,
          "",
          timestamp,
          secret
        );

        const response = await fetch(
          `${API_CONFIG.BASE_URL}${urlFetch}`,
          {
            method,
            headers: {
              Accept: "application/json",
              "X-API-KEY": API_CONFIG.API_KEY,
              "X-TIMESTAMP": timestamp.toString(),
              "X-SIGNATURE": signature,
            },
            cache: "no-store",
          }
        );

        const text = await response.text();

        let result: any = {};

        try {
          result = JSON.parse(text);
        } catch {
          throw new Error("Respon internal CRM tidak valid.");
        }

        if (!response.ok || !result.success) {
          throw new Error(
            result?.message || `Gagal memuat dokumen (${response.status})`
          );
        }

        setDocuments(result.data || []);
      } catch (error: any) {
        console.error("🚨 Error Fetching Documents:", error.message);

        setErrorMessage(error.message);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUploadedDocuments();
  }, [open, tenderId]);

  if (!open) return null;

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();

    if (["png", "jpg", "jpeg", "svg", "webp"].includes(ext || "")) {
      return <FileImage className="w-4 h-4 text-emerald-300" />;
    }

    return <FileText className="w-4 h-4 text-cyan-300" />;
  };

  const getBadgeColor = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();

    if (["png", "jpg", "jpeg", "svg", "webp"].includes(ext || "")) {
      return `
        from-emerald-500/15
        to-emerald-400/5
        border-emerald-500/20
      `;
    }

    return `
      from-cyan-500/15
      to-sky-400/5
      border-cyan-500/20
    `;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-slate-900 via-[#111827] to-slate-950 shadow-[0_0_80px_rgba(0,0,0,0.55)]">

        {/* Glow */}
        <div className="absolute -top-24 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

        {/* HEADER */}
        <div className="relative px-6 py-5 border-b border-white/5 bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-transparent">
          <div className="flex items-start justify-between gap-4">

            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </div>

                <div>
                  <h2 className="text-xl font-black tracking-tight text-white">
                    Tender Documentation
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    Kelola seluruh dokumen tender dalam satu workspace terintegrasi.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[10px] font-semibold text-emerald-300">
                  <ShieldCheck className="w-3 h-3" />
                  Secure CRM Storage
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-[10px] font-semibold text-cyan-300">
                  {documents.length} Files
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="
                group
                w-10 h-10
                rounded-2xl
                border border-white/10
                bg-white/[0.03]
                hover:bg-red-500/15
                hover:border-red-500/20
                transition-all duration-300
                flex items-center justify-center
                cursor-pointer
              "
            >
              <X className="w-4 h-4 text-slate-400 group-hover:text-red-300 transition" />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="relative p-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
                <Loader2 className="relative w-10 h-10 text-cyan-400 animate-spin" />
              </div>

              <p className="mt-4 text-sm font-medium text-slate-400 tracking-wide animate-pulse">
                Memuat dokumentasi tender...
              </p>
            </div>
          ) : errorMessage ? (
            <div className="rounded-3xl border border-red-500/20 bg-red-500/[0.03] p-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>

              <h3 className="text-lg font-bold text-red-300">
                Gagal Memuat Dokumen
              </h3>

              <p className="text-sm text-red-300/70 mt-2 max-w-md leading-relaxed">
                {errorMessage}
              </p>
            </div>
          ) : documents.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] py-20 px-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-5">
                <FolderOpen className="w-8 h-8 text-slate-500" />
              </div>

              <h3 className="text-lg font-bold text-slate-300">
                Tidak Ada Dokumen
              </h3>

              <p className="text-sm text-slate-500 mt-2 max-w-md">
                Belum ada file dokumentasi yang diunggah untuk tender ini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {documents.map((doc) => {
                const fullDownloadUrl = doc.file_url.startsWith("http")
                  ? doc.file_url
                  : `${
                      API_CONFIG.BASE_URL_STORAGE ||
                      API_CONFIG.BASE_URL.replace(/\/api$/, "")
                    }${doc.file_url}`;

                return (
                  <div
                    key={doc.id}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border border-white/[0.10]
                      bg-gradient-to-b
                      from-white/[0.07]
                      to-white/[0.03]
                      backdrop-blur-xl
                      p-4
                      hover:border-cyan-400/30
                      hover:bg-white/[0.06]
                      hover:shadow-[0_8px_30px_rgba(6,182,212,0.10)]
                      transition-all duration-300
                    "
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_45%)]" />

                    {/* ICON */}
                    <div
                      className={`
                        relative
                        w-11 h-11
                        rounded-xl
                        border
                        bg-gradient-to-br
                        flex items-center justify-center
                        mb-3
                        transition-all duration-300
                        group-hover:scale-105
                        ${getBadgeColor(doc.nama_file_asli)}
                      `}
                    >
                      {getFileIcon(doc.nama_file_asli)}
                    </div>

                    {/* CONTENT */}
                    <div className="relative">
                      <h3 className="text-[13px] font-bold text-white line-clamp-2 leading-snug">
                        {doc.deskripsi || "Dokumen Tender"}
                      </h3>

                      <p className="mt-1.5 text-[11px] text-cyan-300/80 truncate">
                        {doc.nama_file_asli}
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-2">
                        <span className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.05] text-[10px] font-mono text-slate-400">
                          {doc.formatted_size}
                        </span>

                        <a
                          href={fullDownloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            h-8
                            px-3
                            rounded-lg
                            bg-gradient-to-r
                            from-cyan-500
                            to-blue-600
                            hover:from-cyan-400
                            hover:to-blue-500
                            text-white
                            text-[11px]
                            font-bold
                            flex items-center gap-1.5
                            shadow-md shadow-cyan-500/10
                            transition-all duration-300
                          "
                        >
                          <ExternalLink className="w-3 h-3" />
                          Open
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="relative px-6 py-4 border-t border-white/5 bg-black/20 flex justify-between items-center">
          <div className="text-[11px] text-slate-500">
            CRM Tender Documentation System
          </div>

          <button
            onClick={onClose}
            className="
              h-10
              px-4
              rounded-2xl
              bg-white/[0.04]
              border border-white/[0.08]
              hover:bg-white/[0.08]
              hover:border-white/[0.15]
              transition-all duration-300
              text-xs
              font-semibold
              text-slate-300
              hover:text-white
              cursor-pointer
            "
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}