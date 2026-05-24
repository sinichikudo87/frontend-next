import type { MenuItem } from "../types";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Briefcase,
  Settings,
} from "lucide-react";

const hrdMenu: MenuItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/hrd",
  },
  {
    name: "Employees",
    icon: Users,
    href: "/hrd/employees",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    href: "/hrd/analytics",
  },
  {
    name: "Departments",
    icon: Briefcase,
    href: "/hrd/departments",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/hrd/settings",
  },
];

export default hrdMenu;