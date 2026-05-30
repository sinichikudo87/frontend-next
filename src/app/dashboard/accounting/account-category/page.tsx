import AccountCategory from "@/components/ui/dashboard/accounting/account-category/page";
import { getAccountCategory } from "../../../../lib/accounting/account-category/view";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/* ================= TYPES ================= */
export type AccountCategoryType = {
  id: number;
  company_id: number;
  name: string;
  description: string;
  is_active: number;
};

export default async function Page() {
  let initialCategories: AccountCategoryType[] = [];

  try {
    const res = await getAccountCategory(1);

    if (res?.success && Array.isArray(res.data)) {
      initialCategories = res.data.map((item: any) => ({
        id: Number(item.id),
        company_id: Number(item.company_id),
        name: item.name ?? "-",
        description: item.description ?? "-",
        is_active: Number(item.is_active ?? 1),
      }));
    }
  } catch (err) {
    console.error("Failed load account categories:", err);
  }

  return <AccountCategory initialData={initialCategories} />;
}