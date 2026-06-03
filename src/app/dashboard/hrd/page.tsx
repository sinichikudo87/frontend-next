import DashboardLayout from "@/components/layout/DashboardLayout";
import HRDDashboardClient from "@/components/ui/dashboard/hrd/dashboard";

async function getHRDData() {
  const attendanceData = [
    { month: "Jan", value: 78 },
    { month: "Feb", value: 82 },
    { month: "Mar", value: 88 },
    { month: "Apr", value: 91 },
    { month: "May", value: 89 },
    { month: "Jun", value: 95 },
  ];

  const employeeData = [
    { name: "HRD", value: 40 },
    { name: "Finance", value: 28 },
    { name: "IT", value: 35 },
    { name: "Marketing", value: 22 },
  ];

  const summary = {
    totalEmployees: 248,
    attendanceRate: "92%",
    totalDepartments: 12,
    performanceRate: "88%",
    growth: "+8.2%",
  };

  return { attendanceData, employeeData, summary };
}

export default async function HRDDashboardPage() {
  const { attendanceData, employeeData, summary } = await getHRDData();

  return (
    <DashboardLayout>
      <HRDDashboardClient 
        attendanceData={attendanceData} 
        employeeData={employeeData} 
        summary={summary} 
      />
    </DashboardLayout>
  );
}