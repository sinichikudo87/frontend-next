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

const kpiMenu: any[] = [
  
  {
    title: "Overview",
    items: [
      {
        name: "KPI Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/kpi",
      },
    ],
  },

  // GROUP MASTER
  {
    title: "Master Data",
    items: [
      {
        name: "Employee KPI",
        icon: Users,
        href: "/dashboard/kpi/employees",
      },
      {
        name: "Job Desk Master",
        icon: Briefcase,
        href: "/dashboard/kpi/job-desk-master",
      },
    ],
  },

  // GROUP TRANSACTIONS
  {
    title: "Transactions",
    items: [
      {
        name: "Targets & Goals",
        icon: TrendingUp,
        href: "/dashboard/kpi/goals",
      },
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
    ],
  },

  // GROUP REPORTING & SETTINGS
  {
    title: "Reports & Configurations",
    items: [
      {
        name: "Reports",
        icon: FileText,
        href: "/dashboard/kpi/reporting", 
      },
      {
        name: "KPI Settings",
        icon: Settings,
        href: "/dashboard/kpi/settings",
      },
    ],
  },
];

export default kpiMenu;