import EnterpriseTable, { Column } from "../../components/EnterpriseTable";

type Row = {
  id: string;
  name: string;
  property: string;
  status: string;
  amount: number;
};

const columns: Column<Row>[] = [
  { key: "id", title: "ID", sortable: true, width: "80px" },
  { key: "name", title: "Name", sortable: true },
  { key: "property", title: "Property", sortable: true },
  { key: "status", title: "Status", sortable: true, width: "140px" },
  { key: "amount", title: "Amount", sortable: true, width: "120px" },
];

const sampleRows: Row[] = Array.from({ length: 23 }).map((_, i) => ({
  id: String(1000 + i),
  name: `Lease ${i + 1}`,
  property: `Property ${((i % 5) + 1)}`,
  status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Inactive" : "Pending",
  amount: Math.round(Math.random() * 10000) / 100,
}));

export default function DashboardPage() {
  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-4">Enterprise Data Table demonstration.</p>

      <section className="p-0">
        <EnterpriseTable<Row> columns={columns} data={sampleRows} rowKey="id" initialPageSize={10} />
      </section>
    </div>
  );
}
