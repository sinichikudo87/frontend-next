import { generateSignature } from "@/lib/hmac";
import { API_CONFIG } from "@/lib/config";

export type UpdateTenderPayload = {
    detail_id: number;
    category_name: string;
    qty: number;
    price_per_unit: number;
    subtotal: number;
};

export type UpdateStatusTenderHeaderPayload = {
    is_status: number;
};

export type UpdateStatusTenderDetailsPayload = {
    is_status: number;
};


export async function updateTenderDetail(
    id: number,
    payload: UpdateTenderPayload
) {
    const method = "PUT";

    const url =
        `/public/v1/tenders/details/${id}`;

    const body =
        JSON.stringify(payload);

    const timestamp =
        Math.floor(Date.now() / 1000);

    const secret =
        process.env.NEXT_PUBLIC_API_SECRET_KEY || "";

    const signature =
        generateSignature(
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
                "Content-Type":
                    "application/json",

                Accept:
                    "application/json",

                "X-API-KEY":
                    API_CONFIG.API_KEY,

                "X-TIMESTAMP":
                    timestamp.toString(),

                "X-SIGNATURE":
                    signature,
            },

            body,

            cache: "no-store",
        }
    );

    const result =
        await response.json();

    if (!response.ok) {

        throw new Error(
            result?.message ||
            `Failed update tender detail: ${response.status}`
        );

    }

    return result;
}

export async function updateStatusTenderHeader(
    id: number,
    payload: UpdateStatusTenderHeaderPayload
) {
    const method = "POST";
    const url = `/public/v1/tenders/tender-header/${id}/status`;

    const body = JSON.stringify(payload);

    const timestamp = Math.floor(Date.now() / 1000);

    const secret =
        process.env.NEXT_PUBLIC_API_SECRET_KEY || "";

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
            `Failed update tender header: ${response.status}`
        );
    }

    return result;
}

export async function updateStatusTenderDetail(
    id: number,
    payload: UpdateStatusTenderDetailsPayload
) {
    const method = "POST";
    const url = `/public/v1/tenders/tender-detail/${id}/status`;

    const body = JSON.stringify(payload);

    const timestamp = Math.floor(Date.now() / 1000);

    const secret =
        process.env.NEXT_PUBLIC_API_SECRET_KEY || "";

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
            `Failed update tender detail: ${response.status}`
        );
    }

    return result;
}