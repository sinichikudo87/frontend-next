import type { MenuItem } from "../types";
import {
  LayoutDashboard,
  Truck,
  BarChart3,
  Workflow,
  Settings,
} from "lucide-react";

const operationsMenu: MenuItem[] = [
  {
    name: "Operations Dashboard",
    icon: LayoutDashboard,
    href: "/operations",
  },
  {
    name: "Work Orders",
    icon: Workflow,
    href: "/operations/work-orders",
  },
  {
    name: "Fleet / Resources",
    icon: Truck,
    href: "/operations/fleet",
  },
  {
    name: "Performance Analytics",
    icon: BarChart3,
    href: "/operations/analytics",
  },
  {
    name: "Operations Settings",
    icon: Settings,
    href: "/operations/settings",
  },
];

export default operationsMenu;