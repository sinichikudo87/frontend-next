import DashboardLayout from "@/components/layout/DashboardLayout";
import OperationsContent from "@/components/ui/dashboard/operations/dashboard";

async function getOperationsData() {
  const operationsData = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 72 },
    { month: "Mar", value: 78 },
    { month: "Apr", value: 75 },
    { month: "May", value: 85 },
    { month: "Jun", value: 90 },
  ];

  const opsStatusData = [
    { name: "Completed Tasks", value: 45 },
    { name: "In Progress", value: 35 },
    { name: "Pending", value: 20 },
  ];

  return { operationsData, opsStatusData };
}

export default async function OperationsDashboardPage() {
  const { operationsData, opsStatusData } = await getOperationsData();

  return (
    <DashboardLayout>
      <OperationsContent 
        operationsData={operationsData} 
        opsStatusData={opsStatusData} 
      />
    </DashboardLayout>
  );
}