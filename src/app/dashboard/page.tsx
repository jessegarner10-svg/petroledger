import EnterpriseTable, { Column } from "../../components/EnterpriseTable";
import { Property } from "../../types/property";

const columns: Column<Property>[] = [
  { key: "id", title: "ID", sortable: true, width: "90px" },
  { key: "propertyNumber", title: "Property #", sortable: true, width: "120px" },
  { key: "propertyName", title: "Name", sortable: true },
  { key: "operator", title: "Operator", sortable: true, width: "160px" },
  { key: "state", title: "State", sortable: true, width: "80px" },
  { key: "status", title: "Status", sortable: true, width: "110px" },
  { key: "workingInterest", title: "WI %", sortable: true, width: "90px" },
  { key: "netRevenueInterest", title: "NRI %", sortable: true, width: "90px" },
];

const sampleRows: Property[] = Array.from({ length: 23 }).map((_, i) => ({
  id: String(2000 + i),
  propertyNumber: `P-${100 + i}`,
  propertyName: `Lease ${i + 1}`,
  operator: [`Acme Energy`, `Gulf Ops`, `Petro Co`, `Bluefield`][i % 4],
  state: ["TX", "OK", "LA", "NM"][i % 4],
  county: `County ${((i % 6) + 1)}`,
  propertyType: i % 2 === 0 ? "Lease" : "Unit",
  workingInterest: Math.round((Math.random() * 100) * 100) / 100,
  netRevenueInterest: Math.round((Math.random() * 100) * 100) / 100,
  status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Inactive" : "Pending",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export default function DashboardPage() {
  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-4">Enterprise Data Table demonstration.</p>

      <section className="p-0">
        <EnterpriseTable<Property> columns={columns} data={sampleRows} rowKey="id" initialPageSize={10} />
      </section>
    </div>
  );
}
