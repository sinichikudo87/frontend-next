import WorkProgressUpdateClient from "@/components/ui/dashboard/kpi/work-progress-update/work-progress-update-client";
import { getWorkProgressUpdate } from "../../../../lib/kpi/workProgressUpdate/view";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type DailyProgressLog = {
  entry_id: number;
  date: string;
  actual_value_submitted: string;
  score_impact: number;
  notes: string;
  attachment_url?: string;
};

export type JobDeskKPI = {
  id: number;
  company_id: number;
  user_id: number;
  user_name: string;
  jobdesk_master_id: number;
  job_title: string; 
  kpi_name: string;
  weight: number;
  target_value: string;
  accumulated_actual_value: string;
  final_score: number;
  period_month: number;
  period_year: number;
  status: string;
  daily_logs: DailyProgressLog[];
};

export default async function Page() {
  let initialJobDesks: JobDeskKPI[] = [];

  try {
    // 🌟 FIX: Jangan di-hardcode angka 1. Tarik secara global menggunakan string "null"
    const res = await getWorkProgressUpdate("null", 9); 

    if (res?.success && res.data) {
      const rawItems = Array.isArray(res.data) ? res.data : [res.data];

      initialJobDesks = rawItems.map((item: any, index: number) => {
        // Ambil ID relasi user_jobdesk_kpi secara tepat
        const parsedId = Number(item.user_jobdesk_kpi_id || item.user_jobdesk_id || item.id);
        const finalId = isNaN(parsedId) || parsedId === 0 ? index + 1 : parsedId;

        const dailyLogsFromApi: DailyProgressLog[] = Array.isArray(item.daily_logs) 
          ? item.daily_logs.map((log: any) => ({
              entry_id: Number(log.entry_id ?? 0),
              date: log.date ?? "2026-06-03",
              actual_value_submitted: log.actual_value_submitted ?? "-",
              score_impact: Number(log.score_impact ?? 0),
              notes: log.notes ?? "-",
              attachment_url: log.attachment_url || undefined
            }))
          : [];

        return {
          id: finalId,
          company_id: Number(item.company_id ?? 0),
          user_id: Number(item.user_id ?? 0),
          user_name: item.user_name ?? "-",
          jobdesk_master_id: Number(item.jobdesk_master_id ?? 0),
          job_title: item.job_title ?? "-",
          kpi_name: item.kpi_name ?? "-",
          weight: Number(item.weight ?? 0),
          target_value: item.target_value ?? "-",
          accumulated_actual_value: item.accumulated_actual_value ?? item.actual_value ?? "-",
          final_score: Number(item.final_score ?? item.score ?? 0),
          period_month: Number(item.period_month ?? 0),
          period_year: Number(item.period_year ?? 0),
          status: item.status ?? "PENDING",
          daily_logs: dailyLogsFromApi
        };
      });
    }
  } catch (err) {
    console.error("Gagal memuat data awal progress update pada SSR:", err);
  }

  return <WorkProgressUpdateClient initialData={initialJobDesks} />;
}