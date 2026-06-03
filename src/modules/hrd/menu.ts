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
  MapPin,
} from "lucide-react";

const hrdMenu = [
  {
    title: "Overview",
    items: [
      {
        name: "HR Dashboard",
        icon: LayoutDashboard,
        href: "/hrd",
      },
    ],
  },
  {
    title: "Master Data",
    items: [
      { name: "Employee Directory", icon: Users, href: "/hrd/master/employees" },
      { name: "Organization & Job Titles", icon: Briefcase, href: "/hrd/master/departments" },      
      { name: "Employment Contracts", icon: FileText, href: "/hrd/master/contracts" },
      { name: "Candidates & Applicants", icon: UserCheck, href: "/hrd/master/candidates" },
    ],
  },
  {
    title: "Time & Attendance",
    items: [
      { name: "Attendance Logs", icon: Clock, href: "/hrd/attendance/logs" },
      { name: "Leave & Time Off Requests", icon: CalendarDays, href: "/hrd/attendance/leaves" },
      { name: "Overtime Management", icon: Clock, href: "/hrd/attendance/overtime" },
      { name: "Work Schedules & Shifts", icon: CalendarDays, href: "/hrd/attendance/shifts" },
    ],
  },
  {
    title: "Payroll & Benefits",
    items: [
      { name: "Payroll Processing", icon: Coins, href: "/hrd/payroll/process" },
      { name: "Employee Payslips", icon: FileText, href: "/hrd/payroll/slips" },
      { name: "Incentives, Bonuses & Allowances", icon: Coins, href: "/hrd/payroll/allowances" },
      { name: "Cash Advances & Loans", icon: Coins, href: "/hrd/payroll/loans" },
      { name: "Social Security & Insurance", icon: HeartHandshake, href: "/hrd/payroll/insurance" },
    ],
  },
  {
    title: "HR Operations",
    items: [
      { name: "Recruitment & Selection", icon: UserCheck, href: "/hrd/operations/recruitment" },
      { name: "Training & Development", icon: GraduationCap, href: "/hrd/operations/training" },
      { name: "Performance Review (KPI)", icon: FileText, href: "/hrd/operations/performance" },
      { name: "Disciplinary Actions & Warning Letters", icon: ShieldAlert, href: "/hrd/operations/disciplinary" },
      { name: "Resignations & Terminations", icon: UserX, href: "/hrd/operations/termination" },
    ],
  },
  {
    title: "HR Reporting",
    items: [
      { name: "Attendance Summary Report", icon: FileSpreadsheet, href: "/hrd/reporting/attendance" },
      { name: "Payroll Expense Report", icon: FileSpreadsheet, href: "/hrd/reporting/payroll" },
      { name: "Employee Turnover Report", icon: FileSpreadsheet, href: "/hrd/reporting/turnover" },
      { name: "Remaining Leave Balance Report", icon: FileSpreadsheet, href: "/hrd/reporting/leaves" },
    ],
  },
  {
    title: "Settings",
    items: [
      { name: "Locations", icon: MapPin, href: "/hrd/master/location" },
      { name: "Salary Components & Income Tax", icon: Settings, href: "/hrd/settings/payroll-components" },
      { name: "HR Settings", icon: Settings, href: "/hrd/settings" },
    ],
  },
];

export default hrdMenu;