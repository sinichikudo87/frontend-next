import {
  LayoutDashboard,
  User,
  Truck,
  Users,
  Building2,
  DollarSign,
  Layers,
  FileText,
  FileCheck,
  ClipboardCheck,
  FileSpreadsheet,
  Wrench,
  Receipt,
} from "lucide-react";

// ==========================================
// 1. OVERVIEW
// ==========================================
export const operationsOverviewMenu = [
  {
    title: "Overview",
    items: [
      {
        name: "Dashboard Operasional",
        icon: LayoutDashboard,
        href: "/operations",
      },
    ],
  },
];

// ==========================================
// 2. MASTER DATA
// ==========================================
export const operationsMasterMenu = [
  {
    title: "Master Data",
    items: [
      { name: "Biodata Driver", icon: User, href: "/dashboard/operations/masters/driver" },
      { name: "Manajemen Unit & Armada", icon: Truck, href: "/dashboard/operations/masters/unit" },
      { name: "Profil Investor", icon: Users, href: "/dashboard/operations/masters/investor" },
      { name: "Basis Data Pelanggan", icon: Users, href: "/dashboard/operations/masters/customer" },
      { name: "Garasi", icon: Building2, href: "/dashboard/operations/masters/garage" },
      // { name: "Kategori Biaya Operasional", icon: DollarSign, href: "/dashboard/operations/masters/cost-category" }
    ],
  },
];

// ==========================================
// 3. TRANSAKSI OPERATION
// ==========================================
export const operationsTransactionMenu = [
  {
    title: "Transaksi Operasional",
    items: [
      { name: "Manajemen Order", icon: FileText, href: "/dashboard/operations/transaksi/order" },
      { name: "Surat Jalan Driver", icon: FileCheck, href: "/dashboard/operations/transaksi/surat-jalan" },
      { name: "Inspeksi & Checklist Unit", icon: ClipboardCheck, href: "/dashboard/operations/transaksi/checklist" },
      { name: "Disbursement & Biaya Driver", icon: DollarSign, href: "/dashboard/operations/transaksi/pengajuan-driver" },
      { name: "Realisasi Dana Operasional", icon: FileSpreadsheet, href: "/dashboard/operations/transaksi/laporan-dana" },
      { name: "Payroll & Penggajian Driver", icon: DollarSign, href: "/dashboard/operations/transaksi/gaji-driver" },
      { name: "Iuran & Retribusi Driver", icon: DollarSign, href: "/dashboard/operations/transaksi/iuran-driver" },
      { name: "Pemeliharaan & Servis Unit", icon: Wrench, href: "/dashboard/operations/transaksi/maintenance" },
      { name: "Persetujuan Servis Investor", icon: Users, href: "/dashboard/operations/transaksi/konfirmasi-investor" },
      { name: "Termin Pembayaran Investor", icon: DollarSign, href: "/dashboard/operations/transaksi/bayar-investor" },
      { name: "Kontrak & Order Bulanan", icon: Layers, href: "/dashboard/operations/transaksi/order-bulanan" },
      { name: "Pusat Approval Pengajuan", icon: FileCheck, href: "/dashboard/operations/transaksi/approval" },
    ],
  },
];

// ==========================================
// 4. DOKUMEN OPERATION
// ==========================================
// export const operationsDocumentMenu = [
//   {
//     title: "Manajemen Dokumen",
//     items: [
//       { name: "Berita Acara (BA)", icon: FileText, href: "/dashboard/operations/dokumen/berita-acara" },
//       { name: "Surat Perintah Kerja (SPK)", icon: FileText, href: "/dashboard/operations/dokumen/spk" },
//       { name: "Purchase Order (PO)", icon: FileText, href: "/dashboard/operations/dokumen/po" },
//       { name: "Faktur Tagihan (Invoice)", icon: Receipt, href: "/dashboard/operations/dokumen/invoice" },
//       { name: "Kuitansi & Nota Pelunasan", icon: Receipt, href: "/dashboard/operations/dokumen/kwitansi" },
//       { name: "Faktur Pajak / Penjualan", icon: Receipt, href: "/dashboard/operations/dokumen/faktur" },
//       { name: "Arsip Surat Jalan", icon: FileCheck, href: "/dashboard/operations/dokumen/surat-jalan" },
//       { name: "Log Checklist Fisik Unit", icon: ClipboardCheck, href: "/dashboard/operations/dokumen/checklist-dokumen" },
//       { name: "Rekonsiliasi Bukti Pengeluaran", icon: Receipt, href: "/dashboard/operations/dokumen/bukti-bayar" },
//     ],
//   },
// ];

// ==========================================
// 5. REPORTING OPERATION
// ==========================================
export const operationsReportingMenu = [
  {
    title: "Pelaporan & Analisis",
    items: [
      { name: "Order Per Periode", icon: FileSpreadsheet, href: "/dashboard/operations/reporting/order" },
      { name: "Kinerja Driver", icon: FileSpreadsheet, href: "/dashboard/operations/reporting/driver" },
      { name: "Utilitas Unit", icon: FileSpreadsheet, href: "/dashboard/operations/reporting/unit" },
      { name: "Rekapitulasi Maintenance", icon: FileSpreadsheet, href: "/dashboard/operations/reporting/maintenance" },
      { name: "Imbal Hasil Investor", icon: FileSpreadsheet, href: "/dashboard/operations/reporting/investor" },
      { name: "Fluktuasi Kas Driver", icon: FileSpreadsheet, href: "/dashboard/operations/reporting/operasional-driver" },
      { name: "Audit Dokumen Order Bulanan", icon: FileSpreadsheet, href: "/dashboard/operations/reporting/dokumen-bulanan" },
      { name: "Log Riwayat Approval", icon: FileSpreadsheet, href: "/dashboard/operations/reporting/approval" },
      { name: "Cash Advance Driver", icon: FileSpreadsheet, href: "/dashboard/operations/reporting/cash-advance" },
      { name: "Selisih (Varian) Dana", icon: FileSpreadsheet, href: "/dashboard/operations/reporting/selisih-dana" },
    ],
  },
];

const operationsMenu = [
  ...operationsOverviewMenu,
  ...operationsMasterMenu,
  ...operationsTransactionMenu,
  // ...operationsDocumentMenu,
  ...operationsReportingMenu,
];

export default operationsMenu;