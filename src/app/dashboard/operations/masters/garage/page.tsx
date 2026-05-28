import GarageClient from "@/components/ui/dashboard/operations/masters/garages/garage-client";
import { getGarage } from "../../../../../lib/operations/masters/garages/view";

type Garage = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  is_active: number;
};

export const dynamic = "force-dynamic";

export default async function Page() {
  let initialGarages: Garage[] = [];

  try {
    const res = await getGarage<Garage>(1);

    if (res?.success && Array.isArray(res.data)) {
      initialGarages = res.data.map((item) => ({
        id: Number(item.id),
        name: item.name ?? "-",
        phone: item.phone ?? "-",
        email: item.email ?? "-",
        address: item.address ?? "-",
        is_active: Number(item.is_active ?? 1),
      }));
    }
  } catch (err) {
    console.error("Gagal memuat data garage di server:", err);
  }

  return <GarageClient initialData={initialGarages} />;
}