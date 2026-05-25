import CRMDashboardPage from "@/components/ui/dashboard/crm/dashboard";

async function getDashboardData() {

  // const res = await fetch("http://localhost:8000/api/crm/dashboard", {
  //   cache: "no-store",
  // });

  // return res.json();

  return {
    summary: {
      customers: 1248,
      leads: 342,
      deals: 128,
      conversion: 38,
    },

    activityData: [
      { month: "Jan", value: 120 },
      { month: "Feb", value: 150 },
      { month: "Mar", value: 180 },
      { month: "Apr", value: 170 },
      { month: "May", value: 210 },
      { month: "Jun", value: 240 },
    ],

    customerData: [
      { name: "New Leads", value: 45 },
      { name: "Prospects", value: 30 },
      { name: "Negotiation", value: 25 },
      { name: "Won Deals", value: 20 },
    ],

    leadSourceData: [
      { source: "Facebook", total: 120 },
      { source: "Instagram", total: 98 },
      { source: "Website", total: 76 },
      { source: "WhatsApp", total: 65 },
    ],

    recentActivities: [
      {
        title: "New lead from Facebook Ads",
        time: "5 minutes ago",
      },
      {
        title: "Quotation sent to PT Petrosea",
        time: "20 minutes ago",
      },
      {
        title: "Deal closed with PT Freeport",
        time: "1 hour ago",
      },
      {
        title: "Customer follow up completed",
        time: "2 hours ago",
      },
    ],
  };
}

export default async function Page() {

  const data = await getDashboardData();

  return (
    <CRMDashboardPage data={data} />
  );
}