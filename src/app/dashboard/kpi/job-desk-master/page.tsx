import JobDeskMasterClient from "@/components/ui/dashboard/kpi/job-desk-master/job-desk-master-client";
import { getJobDeskMaster, type DepartmentData } from "../../../../lib/kpi/jobDeskMaster/view";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ================= TYPES ================= */
export type JobDeskKPI = {
  id: number;
  job_title: string;
  department: string;
  kpi_name: string;
  target_indicator: string;
  weight: number;
  is_active: number;
};

export default async function Page() {
  let initialJobDesks: JobDeskKPI[] = []; 
  let initialDepartments: DepartmentData[] = []; 

  try {
    // Ambil data dari API Laravel via Fetch Wrapper
    const res = await getJobDeskMaster(1);

    if (res?.success) {
      // 1. Mapping data Job Desk KPI jika datanya valid
      if (res.data) {
        const rawItems = Array.isArray(res.data) ? res.data : [res.data];
        initialJobDesks = rawItems.map((item: any) => ({
          id: Number(item.id ?? item.id),
          job_title: item.job_title ?? "-",
          department: item.department ?? "-",
          kpi_name: item.kpi_name ?? "-",
          target_indicator: item.target_indicator ?? "-",
          weight: Number(item.weight ?? 0),
          is_active: Number(item.is_active ?? 1),
        }));
      }
      
      // 2. Mapping data Departments jika tersedia
      if (res.departments && Array.isArray(res.departments)) {
        initialDepartments = res.departments;
      }
    }
  } catch (err) {
    console.error("Gagal memuat data master job desk pada SSR:", err);
  }

  return (
    <JobDeskMasterClient 
      initialData={initialJobDesks} 
      initialDepartments={initialDepartments} 
    />
  );
}