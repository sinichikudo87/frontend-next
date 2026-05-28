import { generateSignature } from "@/lib/hmac";
import { API_CONFIG } from "@/lib/config";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export async function getReporting<T = any>(
  userId?: number | null,
  departmentId?: number | null
): Promise<ApiResponse<T>> {

  const method = "GET";

  /*
  |--------------------------------------------------------------------------
  | QUERY
  |--------------------------------------------------------------------------
  */

  const query = new URLSearchParams();

  if (userId !== null && userId !== undefined) {
    query.append("user_id", String(userId));
  }

  if (
    departmentId !== null &&
    departmentId !== undefined
  ) {
    query.append(
      "department_id",
      String(departmentId)
    );
  }

  const queryString = query.toString();

  /*
  |--------------------------------------------------------------------------
  | URL
  |--------------------------------------------------------------------------
  */

  const url = queryString
    ? `/public/v1/kpi-reporting?${queryString}`
    : `/public/v1/kpi-reporting`;

  const body = "";

  const timestamp = Math.floor(Date.now() / 1000);

  const secret =
    process.env.NEXT_PUBLIC_API_SECRET_KEY ?? "";

  /*
  |--------------------------------------------------------------------------
  | IMPORTANT:
  | SIGN EXACT URL
  |--------------------------------------------------------------------------
  */

  const signature = generateSignature(
    method,
    url,
    body,
    timestamp,
    secret
  );

  /*
  |--------------------------------------------------------------------------
  | FETCH
  |--------------------------------------------------------------------------
  */

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
      result?.message ||
      `Failed fetch reporting (${response.status})`
    );
  }

  return result;
}