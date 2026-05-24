import type { MenuItem } from "../types";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  TrendingUp,
  Settings,
  Briefcase,
  ClipboardList,
  RefreshCcw,
  FileText,
} from "lucide-react";

const kpiMenu: MenuItem[] = [
  {
    name: "KPI Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/kpi",
  },
  {
    name: "Employee KPI",
    icon: Users,
    href: "/dashboard/kpi/employees",
  },
  {
    name: "Performance Analytics",
    icon: BarChart3,
    href: "/dashboard/kpi/analytics",
  },
  {
    name: "Targets & Goals",
    icon: TrendingUp,
    href: "/dashboard/kpi/goals",
  },

  // MASTER
  {
    name: "Job Desk Master",
    icon: Briefcase,
    href: "/dashboard/kpi/job-desk-master",
  },

  // TRANSACTIONS
  {
    name: "Job Desk Entry",
    icon: ClipboardList,
    href: "/dashboard/kpi/job-desk-entry",
  },
  {
    name: "Work Progress Update",
    icon: RefreshCcw,
    href: "/dashboard/kpi/work-progress-update",
  },

  // REPORTING
  {
    name: "Reports",
    icon: FileText,
    href: "/dashboard/kpi/reports",
  },

  {
    name: "KPI Settings",
    icon: Settings,
    href: "/dashboard/kpi/settings",
  },
];

export default kpiMenu;