import DashboardLayout from "@/components/layout/DashboardLayout";
import SystemAdminContent from "@/components/ui/dashboard/system-setting/dashboard";

async function getSystemAdminData() {
  const systemUptimeData = [
    { month: "Jan", value: 99.8 },
    { month: "Feb", value: 99.9 },
    { month: "Mar", value: 99.7 },
    { month: "Apr", value: 99.9 },
    { month: "May", value: 100 },
    { month: "Jun", value: 99.9 },
  ];

  const storageDistribution = [
    { name: "Database Used", value: 35 },
    { name: "Media Assets", icon: "HardDrive", value: 45 },
    { name: "Available Space", value: 20 },
  ];

  const systemSummary = {
    totalUsers: 1420,
    activeSessions: 84,
    apiRequests: "1.2M",
    systemHealth: "Optimal",
  };

  return { systemUptimeData, storageDistribution, systemSummary };
}

export default async function SystemAdminDashboardPage() {
  const { systemUptimeData, storageDistribution, systemSummary } = await getSystemAdminData();

  return (
    <DashboardLayout>
      <SystemAdminContent 
        systemUptimeData={systemUptimeData} 
        storageDistribution={storageDistribution} 
        systemSummary={systemSummary}
      />
    </DashboardLayout>
  );
}