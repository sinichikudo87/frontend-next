import type { MenuItem } from "../types";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Briefcase,
  Settings,
  Megaphone,
  PhoneCall,
  CheckCircle,
} from "lucide-react";

const crmMenu: MenuItem[] = [
  {
    name: "CRM Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/crm",
  },
  {
    name: "Customers",
    icon: Users,
    href: "/dashboard/crm/customers",
  },
  {
    name: "Tenders",
    icon: Megaphone,
    href: "/dashboard/crm/tenders",
  },
  {
    name: "Follow-ups",
    icon: PhoneCall,
    href: "/dashboard/crm/follow-up",
  },
  {
    name: "Approvals",
    icon: CheckCircle,
    href: "/dashboard/crm/approvals",
  },
  {
    name: "Leads Analytics",
    icon: BarChart3,
    href: "/dashboard/crm/lead-analytics",
  },
  {
    name: "Accounts / Deals",
    icon: Briefcase,
    href: "/dashboard/crm/accounts-deals",
  },
  {
    name: "CRM Settings",
    icon: Settings,
    href: "/dashboard/crm/crm-settings",
  },
];

export default crmMenu;