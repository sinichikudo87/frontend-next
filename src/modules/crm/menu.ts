import {
  LayoutDashboard,
  Users,
  Megaphone,
  PhoneCall,
  CheckCircle,
  BarChart3,
  Briefcase,
  Settings,
} from "lucide-react";

const crmMenu = [
  {
    title: "Overview",
    items: [
      {
        name: "CRM Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/crm",
      },
    ],
  },
  {
    title: "Core CRM Data",
    items: [
      {
        name: "Customers",
        icon: Users,
        href: "/dashboard/crm/customers",
      },
      {
        name: "Accounts / Deals",
        icon: Briefcase,
        href: "/dashboard/crm/accounts-deals",
      },
    ],
  },
  {
    title: "Marketing & Sales Activity",
    items: [
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
    ],
  },
  {
    title: "Approvals & Analytics",
    items: [
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
    ],
  },
  {
    title: "Pengaturan",
    items: [
      {
        name: "CRM Settings",
        icon: Settings,
        href: "/dashboard/crm/crm-settings",
      },
    ],
  },
];

export default crmMenu;