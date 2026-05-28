import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserX,
  FileText,
  Briefcase,
  GraduationCap,
  CalendarDays,
  Clock,
  Coins,
  ShieldAlert,
  HeartHandshake,
  FileSpreadsheet,
  Settings,
} from "lucide-react";

const hrdMenu = [
  {
    title: "Overview",
    items: [
      {
        name: "HRD Dashboard",
        icon: LayoutDashboard,
        href: "/hrd",
      },
    ],
  },
  {
    title: "Master Data",
    items: [
      { name: "Data Karyawan", icon: Users, href: "/hrd/master/employees" },
      { name: "Struktur Organisasi / Jabatan", icon: Briefcase, href: "/hrd/master/departments" },
      { name: "Data Kontrak Kerja", icon: FileText, href: "/hrd/master/contracts" },
      { name: "Data Calon Karyawan (Kandidat)", icon: UserCheck, href: "/hrd/master/candidates" },
    ],
  },
  {
    title: "Manajemen Kehadiran",
    items: [
      { name: "Presensi / Absensi", icon: Clock, href: "/hrd/attendance/logs" },
      { name: "Pengajuan Cuti & Izin", icon: CalendarDays, href: "/hrd/attendance/leaves" },
      { name: "Manajemen Lembur (Overtime)", icon: Clock, href: "/hrd/attendance/overtime" },
      { name: "Jadwal Kerja / Shift", icon: CalendarDays, href: "/hrd/attendance/shifts" },
    ],
  },
  {
    title: "Payroll & Benefit",
    items: [
      { name: "Proses Gaji (Payroll)", icon: Coins, href: "/hrd/payroll/process" },
      { name: "Slip Gaji Karyawan", icon: FileText, href: "/hrd/payroll/slips" },
      { name: "Insentif, Bonus & Lemburan", icon: Coins, href: "/hrd/payroll/allowances" },
      { name: "Potongan Kasbon / Pinjaman", icon: Coins, href: "/hrd/payroll/loans" },
      { name: "BPJS & Asuransi Kesehatan", icon: HeartHandshake, href: "/hrd/payroll/insurance" },
    ],
  },
  {
    title: "Operasional HRD",
    items: [
      { name: "Rekrutmen & Seleksi", icon: UserCheck, href: "/hrd/operations/recruitment" },
      { name: "Pelatihan & Training Karyawan", icon: GraduationCap, href: "/hrd/operations/training" },
      { name: "Penilaian Kinerja (KPI / Appraisals)", icon: FileText, href: "/hrd/operations/performance" },
      { name: "Pelanggaran & SP (Surat Peringatan)", icon: ShieldAlert, href: "/hrd/operations/disciplinary" },
      { name: "Resign & Pemutusan Hubungan Kerja (PHK)", icon: UserX, href: "/hrd/operations/termination" },
    ],
  },
  {
    title: "Reporting HRD",
    items: [
      { name: "Laporan Rekap Absensi", icon: FileSpreadsheet, href: "/hrd/reporting/attendance" },
      { name: "Laporan Pengeluaran Gaji (Payroll)", icon: FileSpreadsheet, href: "/hrd/reporting/payroll" },
      { name: "Laporan Turn Over Karyawan", icon: FileSpreadsheet, href: "/hrd/reporting/turnover" },
      { name: "Laporan Sisa Cuti Karyawan", icon: FileSpreadsheet, href: "/hrd/reporting/leaves" },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      { name: "Komponen Gaji & Pajak PPh21", icon: Settings, href: "/hrd/settings/payroll-components" },
      { name: "HRD Settings", icon: Settings, href: "/hrd/settings" },
    ],
  },
];

export default hrdMenu;