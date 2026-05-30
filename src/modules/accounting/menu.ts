import {
  LayoutDashboard,
  BookOpen,
  Wallet,
  Package,
  Truck,
  Users,
  Percent,
  ShoppingCart,
  Receipt,
  BadgeDollarSign,
  CreditCard,
  ListOrdered,
  BookText,
  ClipboardPen,
  FolderTree,
  ChartColumnBig,
} from "lucide-react";

const accountingMenu = [
  {
    title: "Dashboard",
    items: [
      {
        name: "Accounting Dashboard",
        icon: LayoutDashboard,
        href: "/accounting",
      },
      {
        name: "Financial Summary",
        icon: ChartColumnBig,
        href: "/accounting/summary",
      },
    ],
  },

  {
    title: "Master Data",
    items: [
      {
        name: "Account Category",
        icon: FolderTree,
        href: "/dashboard/accounting/account-category",
      },
      {
        name: "Journal Accounts",
        icon: BookOpen,
        href: "/accounting/accounts",
      },
      {
        name: "Opening Balance",
        icon: Wallet,
        href: "/accounting/opening-balance",
      },
      {
        name: "Products",
        icon: Package,
        href: "/accounting/products",
      },
      {
        name: "Suppliers / Vendors",
        icon: Truck,
        href: "/accounting/vendors",
      },
      {
        name: "Customers",
        icon: Users,
        href: "/accounting/customers",
      },
      {
        name: "VAT Settings",
        icon: Percent,
        href: "/accounting/tax-settings",
      },
    ],
  },

  {
    title: "Transactions",
    items: [
      {
        name: "Purchase Orders",
        icon: ShoppingCart,
        href: "/accounting/purchase-orders",
      },
      {
        name: "Invoices",
        icon: Receipt,
        href: "/accounting/invoices",
      },
      {
        name: "Revenue",
        icon: BadgeDollarSign,
        href: "/accounting/revenue",
      },
      {
        name: "Expenses",
        icon: CreditCard,
        href: "/accounting/expenses",
      },
    ],
  },

  {
    title: "Reporting",
    items: [
      {
        name: "Transaction List",
        icon: ListOrdered,
        href: "/accounting/transactions",
      },
      {
        name: "Journal Book",
        icon: BookText,
        href: "/accounting/journal-entries",
      },
      {
        name: "Adjusting Entries",
        icon: ClipboardPen,
        href: "/accounting/adjusting-entries",
      },
    ],
  },
];

export default accountingMenu;