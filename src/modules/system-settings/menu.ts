import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  KeyRound,
  Fingerprint,
  AppWindow,
  Terminal,
  DatabaseBackup,
  BellRing,
  Webhook,
  Activity,
  History,
  HardDrive,
  Sliders,
  Languages,
} from "lucide-react";

const systemAdminMenu = [
  {
    title: "Overview",
    items: [
      {
        name: "System Console Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
      },
    ],
  },
  {
    title: "User & Access Management",
    items: [
      { name: "Manajemen Pengguna (Users)", icon: Users, href: "/admin/access/users" },
      { name: "Hak Akses & Role (RBAC)", icon: ShieldCheck, href: "/admin/access/roles" },
      { name: "Kebijakan Keamanan & Sandi", icon: KeyRound, href: "/admin/access/security-policies" },
      { name: "Autentikasi Dua Faktor (2FA)", icon: Fingerprint, href: "/admin/access/mfa" },
    ],
  },
  {
    title: "System Configuration",
    items: [
      { name: "Pengaturan Profil Sistem", icon: Sliders, href: "/admin/config/general" },
      { name: "Lokalisasi & Bahasa", icon: Languages, href: "/admin/config/localization" },
      { name: "Manajemen Modul & Fitur", icon: AppWindow, href: "/admin/config/modules" },
      { name: "Notifikasi & Gateway SMTP", icon: BellRing, href: "/admin/config/notifications" },
    ],
  },
  {
    title: "Integration & Developer Tools",
    items: [
      { name: "Konfigurasi API Keys", icon: Terminal, href: "/admin/developer/api-keys" },
      { name: "Webhooks & Callback", icon: Webhook, href: "/admin/developer/webhooks" },
    ],
  },
  {
    title: "Maintenance & DevOps",
    items: [
      { name: "Utilitas Backup & Pemulihan", icon: DatabaseBackup, href: "/admin/maintenance/backup" },
      { name: "Alokasi & Penyimpanan Data", icon: HardDrive, href: "/admin/maintenance/storage" },
    ],
  },
  {
    title: "Audit & Monitoring",
    items: [
      { name: "Log Aktivitas Pengguna (Audit Trail)", icon: History, href: "/admin/monitoring/audit-logs" },
      { name: "Metrik Kinerja Sistem (Uptime)", icon: Activity, href: "/admin/monitoring/system-health" },
    ],
  },
];

export default systemAdminMenu;