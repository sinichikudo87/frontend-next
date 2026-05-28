import DriverClient from "@/components/ui/dashboard/operations/masters/drivers/driver-client";
import { getDriver } from "../../../../../lib/operations/masters/drivers/view";

type Driver = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  is_active: number;
};

export const dynamic = "force-dynamic"; 

export default async function Page() {
  let initialDrivers: Driver[] = [];

  try {
    const res = await getDriver(1);

    if (res?.success && Array.isArray(res.data)) {
      initialDrivers = res.data.map((item: any) => ({
        id: Number(item.driver_id),
        name: item.user?.user_name ?? "-",
        phone: item.phone_number ?? "-",
        email: item.user?.user_email ?? "-",
        address: item.driver_address ?? "-",
        is_active: Number(item.driver_active ?? 1),
      }));
    }
  } catch (err) {
    console.error("Gagal memuat data di server:", err);
  }

  return <DriverClient initialData={initialDrivers} />;
}