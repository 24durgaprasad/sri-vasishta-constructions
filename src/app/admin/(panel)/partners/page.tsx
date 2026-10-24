import { getAllPartners } from "@/lib/repositories/partners";
import { PartnersManager } from "./PartnersManager";

export const metadata = { title: "Partners — Admin" };

export default async function AdminPartnersPage() {
  const partners = await getAllPartners();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Partners & Associates</h1>
        <p className="text-sm text-navy-500 mt-1">
          Banks, interior designers, materials, and leasing associates
        </p>
      </div>
      <PartnersManager initialPartners={partners} />
    </div>
  );
}
