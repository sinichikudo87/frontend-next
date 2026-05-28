import { generateSignature } from "@/lib/hmac";
import { API_CONFIG } from "@/lib/config";

export type JobDeskLogItem = {
    company_id: number;
    user_id: number;
    jobdesk_master_id: number;
    target_value: string;
    period_month: number;
    period_year: number;
    date: string;
    actual_value_submitted: string;
    score_impact: number;
    notes: string;
    attachment_url?: string;
};

export type SaveJobDeskUserPayload = {
    logs: JobDeskLogItem[];
};

type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};

export async function saveJobDeskEntry<T = any>(
    payload: SaveJobDeskUserPayload
): Promise<ApiResponse<T>> {
    const method = "POST";
    const url = "/public/v1/job-desk-entry/store";

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
            result?.message || `Failed to save batch progress logs (${response.status})`
        );
    }

    return result;
}