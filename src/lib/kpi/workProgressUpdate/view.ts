import { generateSignature } from "@/lib/hmac";
import { API_CONFIG } from "@/lib/config";

type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};

export async function getWorkProgressUpdate<T = any>(
    userId: number | "null" = "null", 
    departmentId: number = 9
): Promise<ApiResponse<T>> {
    const method = "GET";
    const url = `/public/v1/kpi-work-progress-update/${userId}/${departmentId}`;
    const body = "";
    const timestamp = Math.floor(Date.now() / 1000);
    const secret = process.env.NEXT_PUBLIC_API_SECRET_KEY ?? "";

    const signature = generateSignature(method, url, body, timestamp, secret);
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-API-KEY": API_CONFIG.API_KEY,
            "X-TIMESTAMP": timestamp.toString(),
            "X-SIGNATURE": signature,
        },
        cache: "no-store",
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result?.message || `Failed fetch progress update (${response.status})`);
    return result;
}

export async function upsertWorkProgress(logsData: any[]): Promise<ApiResponse<any>> {
    const method = "POST";
    const url = "/public/v1/kpi-reporting/upsert-batch";
    const body = JSON.stringify({ logs: logsData });
    const timestamp = Math.floor(Date.now() / 1000);
    const secret = process.env.NEXT_PUBLIC_API_SECRET_KEY ?? "";

    const signature = generateSignature(method, url, body, timestamp, secret);
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-API-KEY": API_CONFIG.API_KEY,
            "X-TIMESTAMP": timestamp.toString(),
            "X-SIGNATURE": signature,
        },
        body,
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result?.message || "Failed upsert log entries");
    return result;
}

/* ================= 🛠️ PERBAIKAN PADA FUNGSI GET LOGS ================= */
export async function getKpiProgressLogs(userJobdeskKpiId: number): Promise<ApiResponse<any[]>> {
    const method = "GET";
    const url = `/public/v1/kpi-work-progress-update/logs/${userJobdeskKpiId}`;
    const body = "";
    const timestamp = Math.floor(Date.now() / 1000);
    const secret = process.env.NEXT_PUBLIC_API_SECRET_KEY ?? "";    
    const signature = generateSignature(method, url, body, timestamp, secret);
    
    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-API-KEY": API_CONFIG.API_KEY,
            "X-TIMESTAMP": timestamp.toString(),
            "X-SIGNATURE": signature,
        },
        cache: "no-store"
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(result?.message || `Failed to fetch history logs (${response.status})`);
    }

    return result;
}