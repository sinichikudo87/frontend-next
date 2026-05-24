import { generateSignature } from "@/lib/hmac";
import { API_CONFIG } from "@/lib/config";

type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
};

export async function getCustomer<T = any>(id: number): Promise<ApiResponse<T>> {
    const method = "GET";
    const url = `/public/v1/customers/${id}`;
    const body = "";

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
            cache: "no-store",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result?.message || `Failed fetch customer (${response.status})`
        );
    }

    return result;
}