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
        name: "Summary Keuangan",
        icon: ChartColumnBig,
        href: "/accounting/summary",
      },
    ],
  },

  {
    title: "Master Data",
    items: [
      {
        name: "Klasifikasi Akun",
        icon: FolderTree,
        href: "/accounting/account-categories",
      },
      {
        name: "Akun Jurnal",
        icon: BookOpen,
        href: "/accounting/accounts",
      },
      {
        name: "Saldo Awal",
        icon: Wallet,
        href: "/accounting/opening-balance",
      },
      {
        name: "Produk",
        icon: Package,
        href: "/accounting/products",
      },
      {
        name: "Supplier / Vendor",
        icon: Truck,
        href: "/accounting/vendors",
      },
      {
        name: "Pelanggan / Customer",
        icon: Users,
        href: "/accounting/customers",
      },
      {
        name: "Pengaturan PPN",
        icon: Percent,
        href: "/accounting/tax-settings",
      },
    ],
  },

  {
    title: "Transaksi",
    items: [
      {
        name: "Purchase Order",
        icon: ShoppingCart,
        href: "/accounting/purchase-orders",
      },
      {
        name: "Tagihan / Invoice",
        icon: Receipt,
        href: "/accounting/invoices",
      },
      {
        name: "Pendapatan",
        icon: BadgeDollarSign,
        href: "/accounting/revenue",
      },
      {
        name: "Pengeluaran",
        icon: CreditCard,
        href: "/accounting/expenses",
      },
    ],
  },

  {
    title: "Reporting",
    items: [
      {
        name: "List Transaksi",
        icon: ListOrdered,
        href: "/accounting/transactions",
      },
      {
        name: "Buku Jurnal",
        icon: BookText,
        href: "/accounting/journal-entries",
      },
      {
        name: "Jurnal Penyesuaian",
        icon: ClipboardPen,
        href: "/accounting/adjusting-entries",
      },
    ],
  },
];

export default accountingMenu;