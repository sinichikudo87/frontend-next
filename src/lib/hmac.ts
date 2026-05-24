import crypto from "crypto";

export function generateSignature(
    method: string,
    url: string,
    body: unknown,
    timestamp: number | string,
    secret?: string
): string {

    const hmacSecret =
        secret ||
        process.env.NEXT_PUBLIC_API_SECRET_KEY;

    if (!hmacSecret) {

        console.error(
            "HMAC Error: Secret key tidak ditemukan di .env"
        );

        return "";
    }

    let safeBody = "";

    if (
        method.toUpperCase() !== "GET" &&
        body
    ) {

        safeBody =
            typeof body === "object"
                ? JSON.stringify(body)
                : String(body);
    }

    const safeMethod = method.toUpperCase();

    const safeUrl = url;

    const safeTimestamp = timestamp.toString();

    const payload =
        safeMethod +
        safeUrl +
        safeBody +
        safeTimestamp;

    try {

        return crypto
            .createHmac(
                "sha256",
                hmacSecret
            )
            .update(payload)
            .digest("hex");

    } catch (error) {

        console.error(
            "Crypto Hmac Error:",
            error
        );

        return "";
    }
}