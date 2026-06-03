import { generateSignature } from "@/lib/hmac";
import { API_CONFIG } from "@/lib/config";

/* ================= TYPES (DISESUAIKAN DENGAN LARAVEL) ================= */
export type SaveJobDeskMasterPayload = {
    id?: number | null;
    company_id: number;
    job_title: string;
    department_id: number;
    kpi_name: string;
    target_indicator: string;
    weight: number;
    is_active?: number;
};

type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
    errors?: any;
};

/* ================= API FUNCTION ================= */
export async function saveJobDeskMaster<T = any>(
    payload: SaveJobDeskMasterPayload
): Promise<ApiResponse<T>> {
    const method = "POST";
    const url = "/public/v1/job-desk-master/store";
    const body = JSON.stringify(payload);
    const timestamp = Math.floor(Date.now() / 1000);
    const secret = process.env.NEXT_PUBLIC_API_SECRET_KEY ?? "";

    const signature = generateSignature(
        method,
        url,
        body,
        timestamp,
        secret
    );

    const response = await fetch(
        `${API_CONFIG.BASE_URL}${url}`,
        {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-API-KEY": API_CONFIG.API_KEY,
                "X-TIMESTAMP": timestamp.toString(),
                "X-SIGNATURE": signature,
            },
            body,
            cache: "no-store",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result?.message || `Failed to save job desk master (${response.status})`
        );
    }

    return result;
}