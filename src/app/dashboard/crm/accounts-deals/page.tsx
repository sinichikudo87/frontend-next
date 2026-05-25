import AccountsDealsUsers from "@/components/ui/dashboard/crm/accounts-deals/accounts-deals-users";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ================= TYPES ================= */
type DealDetail = {
  kategori: string;
  qty: number | string;
  harga: number;
  subtotal: number;
  status: string;
};

export type AccountDeal = {
  id: string;
  customer: string;
  tanggal: string;
  total: number;
  status: string;
  source: string;
  pic: string;
  details: DealDetail[];
};

export default async function Page() {
  const initialDeals: AccountDeal[] = [
    {
      id: "DL-2601-00004",
      customer: "PT Petrosea",
      tanggal: "26 Jan 2026",
      total: 22000000,
      status: "Deal Closed",
      source: "Website",
      pic: "Rama Saputra",
      details: [
        {
          kategori: "DOUBLE CABIN",
          qty: 1,
          harga: 22000000,
          subtotal: 22000000,
          status: "Approved",
        },
      ],
    },
    {
      id: "DL-2601-00003",
      customer: "PT Pama",
      tanggal: "24 Jan 2026",
      total: 3000000,
      status: "Negotiation",
      source: "Instagram",
      pic: "Dewi Lestari",
      details: [
        {
          kategori: "ALPHARD",
          qty: 1,
          harga: 3000000,
          subtotal: 3000000,
          status: "Pending",
        },
      ],
    },
    {
      id: "DL-2601-00002",
      customer: "PT Freeport",
      tanggal: "20 Jan 2026",
      total: 1200000,
      status: "Waiting Approval",
      source: "Facebook Ads",
      pic: "Yoga Pratama",
      details: [
        {
          kategori: "AVANZA ALL NEW",
          qty: 2,
          harga: 600000,
          subtotal: 1200000,
          status: "Review",
        },
      ],
    },
  ];

  return <AccountsDealsUsers initialData={initialDeals} />;
}