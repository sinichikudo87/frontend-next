export const API_CONFIG = {

    BASE_URL:
        process.env.NEXT_PUBLIC_API_URL ||
        "http://127.0.0.1:8000/api",

    BASE_URL_STORAGE:
    process.env.NEXT_PUBLIC_API_STORAGE_URL ||
    (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api$/, "") : "") ||
    "http://127.0.0.1:8000",

    API_KEY:
        process.env.NEXT_PUBLIC_API_KEY ||
        "vendor_001",

};