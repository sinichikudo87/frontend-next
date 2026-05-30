import ReportingClient from "@/components/ui/dashboard/kpi/reporting/reporting-client";
import { getReporting } from "../../../../lib/kpi/reporting/view";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  try {

    const response = await getReporting(10, 9);

    const initialData =
      response?.success &&
      Array.isArray(response.data)
        ? response.data
        : [];

    return (
      <ReportingClient
        initialData={initialData}
      />
    );

  } catch (error: any) {

    console.error(
      "Gagal memuat reporting KPI:",
      error
    );

    return (
      <div className="p-10 text-red-500">
        <pre>
          {JSON.stringify(
            {
              message: error?.message,
              stack: error?.stack,
            },
            null,
            2
          )}
        </pre>
      </div>
    );
  }
}