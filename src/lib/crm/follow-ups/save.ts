import { generateSignature } from "@/lib/hmac";
import { API_CONFIG } from "@/lib/config";

export type FollowUpLogPayload = {
    tender_id: string | number;
    followup_stage: "1" | "2" | "3" | "4" | "5";
    followup_date: string;
    result: "pending" | "responded" | "no_answer" | "rejected";
    notes?: string;
    next_action_plan?: string;
    user_id?: number;
};

export async function createFollowUpLog(
    payload: FollowUpLogPayload
) {
    const method = "POST";
    const url = "/public/v1/followUps/logs";
    const body = JSON.stringify(payload);
    const timestamp = Math.floor(Date.now() / 1000);
    const secret = process.env.NEXT_PUBLIC_API_SECRET_KEY || "";

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
                "Accept": "application/json",
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
            result?.message || `Failed to create follow up log: ${response.status}`
        );
    }

    return result;
}