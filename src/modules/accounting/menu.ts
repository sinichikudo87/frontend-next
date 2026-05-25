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
  Settings,
} from "lucide-react";

const accountingMenu = [
  {
    title: "Overview",
    items: [
      {
        name: "Accounting Dashboard",
        icon: LayoutDashboard,
        href: "/accounting",
      },
    ],
  },
  {
    title: "Master Data",
    items: [
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
        name: "Pendapatan / Revenue",
        icon: BadgeDollarSign,
        href: "/accounting/revenue",
      },
      {
        name: "Pengeluaran / Expenses",
        icon: CreditCard,
        href: "/accounting/expenses",
      },
    ],
  },
  {
    title: "Pencatatan Akuntansi",
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
  {
    title: "Pengaturan",
    items: [
      {
        name: "Pengaturan PPN / VAT",
        icon: Percent,
        href: "/accounting/tax-settings",
      },
      {
        name: "Accounting Settings",
        icon: Settings,
        href: "/accounting/settings",
      },
    ],
  },
];

export default accountingMenu;