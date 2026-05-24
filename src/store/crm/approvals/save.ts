import { generateSignature } from "@/lib/hmac";
import { API_CONFIG } from "@/lib/config";

export type SaveApprovalPayload = {
    tender_id: number;
    approval_role:
    | "purchasing"
    | "admin_keuangan"
    | "manager_marketing";
    approver_id: number;
    status: "approved" | "rejected" | "pending";
    notes?: string;
    sequence?: number;
};

type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};

export async function saveApproval<T = any>(
    payload: SaveApprovalPayload
): Promise<ApiResponse<T>> {

    const method = "POST";
    const url = "/public/v1/approvals/store";

    const body = JSON.stringify(payload);

    const timestamp = Math.floor(Date.now() / 1000);

    const secret =
        process.env.NEXT_PUBLIC_API_SECRET_KEY ?? "";

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
            result?.message ||
            `Failed save approval (${response.status})`
        );
    }

    return result;
}