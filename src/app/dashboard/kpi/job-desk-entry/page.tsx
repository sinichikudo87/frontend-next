import JobDeskEntryClient from "@/components/ui/dashboard/kpi/job-desk-entry/job-desk-entry-client";
import { getJobDeskEntry } from "../../../../lib/kpi/jobDeskEntry/view";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ================= TYPES ================= */
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
    const res = await getJobDeskEntry(1); 

    if (res?.success && res.data) {
      const rawItems = Array.isArray(res.data) ? res.data : [res.data];

      initialJobDesks = rawItems.map((item: any, index: number) => {
        const parsedId = Number(item.user_jobdesk_id);
        const finalId = isNaN(parsedId) || parsedId === 0 ? index + 1 : parsedId;

        const dailyLogsFromApi: DailyProgressLog[] = Array.isArray(item.daily_logs) 
          ? item.daily_logs.map((log: any) => ({
              entry_id: Number(log.entry_id ?? 0),
              date: log.date ?? "2026-05-20",
              actual_value_submitted: log.actual_value_submitted ?? item.actual_value ?? "-",
              score_impact: Number(log.score_impact ?? item.score ?? 0),
              notes: log.notes ?? item.notes ?? "-",
              attachment_url: log.attachment_url || undefined
            }))
          : [
              {
                entry_id: finalId * 100 + 1,
                date: "2026-05-19",
                actual_value_submitted: item.actual_value ?? "-",
                score_impact: Number(item.score ?? 0),
                notes: item.notes && item.notes !== "-" ? item.notes : "Regular progress log entry.",
                attachment_url: "#"
              }
            ];

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
          accumulated_actual_value: item.actual_value ?? "-",
          final_score: Number(item.score ?? 0),
          period_month: Number(item.period_month ?? 0),
          period_year: Number(item.period_year ?? 0),
          status: item.status ?? "PENDING",
          daily_logs: dailyLogsFromApi
        };
      });
    }
  } catch (err) {
    console.error("Gagal memuat data master job desk entry pada SSR:", err);
  }

  return <JobDeskEntryClient initialData={initialJobDesks} />;
}