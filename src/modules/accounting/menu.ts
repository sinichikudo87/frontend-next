import type { MenuItem } from "../types";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  TrendingUp,
  Settings,
} from "lucide-react";

const accountingMenu: MenuItem[] = [
  {
    name: "Accounting Dashboard",
    icon: LayoutDashboard,
    href: "/accounting",
  },
  {
    name: "Invoices",
    icon: FileText,
    href: "/accounting/invoices",
  },
  {
    name: "Reports",
    icon: BarChart3,
    href: "/accounting/reports",
  },
  {
    name: "Cashflow",
    icon: TrendingUp,
    href: "/accounting/cashflow",
  },
  {
    name: "Accounting Settings",
    icon: Settings,
    href: "/accounting/settings",
  },
];

export default accountingMenu;