import { generateSignature } from "@/lib/hmac";
import { API_CONFIG } from "@/lib/config";

/* ================= TYPES (DISESUAIKAN DENGAN LOG PROGRESS HARIAN) ================= */
export type SaveKpiWorkProgressUpdatePayload = {
    user_jobdesk_kpi_id: number;
    date: string;
    actual_value_submitted: string;
    score_impact: number;
    notes: string | null;
    attachment_url: string | null;
};

type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
    errors?: any;
};

/* ================= API FUNCTION ================= */
export async function saveKpiWorkProgressUpdate<T = any>(
    payload: SaveKpiWorkProgressUpdatePayload
): Promise<ApiResponse<T>> {
    const method = "POST";
    const url = "/public/v1/kpi-work-progress-update/store"; 
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
            result?.message || `Failed to save KPI work progress update (${response.status})`
        );
    }

    return result;
}