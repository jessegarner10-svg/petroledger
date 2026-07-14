"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import EnterpriseTable, { type Column } from "../../../components/EnterpriseTable";
import Workspace from "../../../components/workspace/Workspace";
import WorkspaceDetailsPanel from "../../../components/workspace/WorkspaceDetailsPanel";
import WorkspaceHeader from "../../../components/workspace/WorkspaceHeader";
import WorkspaceToolbar from "../../../components/workspace/WorkspaceToolbar";
import type { Batch, BatchSource, BatchStatus } from "../../../types/accounting";

type BatchRow = Batch & {
  accountingPeriod: string;
  sourceLabel: string;
  statusLabel: string;
  debitDisplay: string;
  creditDisplay: string;
  createdDate: string;
  isUnbalanced: boolean;
};

const SOURCE_LABELS: Record<BatchSource, string> = {
  REVENUE: "Revenue",
  AP: "AP",
  AR: "AR",
  PRODUCTION: "Production",
  ACCRUAL: "Accrual",
  HEDGE: "Hedge",
  MANUAL: "Manual",
  JIB: "JIB",
};

const STATUS_LABELS: Record<BatchStatus, string> = {
  DRAFT: "Draft",
  READY: "Ready",
  POSTED: "Posted",
  VOID: "Void",
};

const STATUS_STYLES: Record<BatchStatus, string> = {
  DRAFT: "bg-slate-100 text-slate-700",
  READY: "bg-amber-100 text-amber-700",
  POSTED: "bg-emerald-100 text-emerald-700",
  VOID: "bg-rose-100 text-rose-700",
};

const mockBatches: Batch[] = [
  {
    id: "BCH-24001",
    batchNumber: "REV-24001",
    description: "June revenue recognition",
    accountingPeriodId: "2026-07",
    source: "REVENUE",
    status: "READY",
    entryCount: 6,
    debitTotal: 185000,
    creditTotal: 185000,
    createdBy: "M. Alvarez",
    createdAt: "2026-07-08T08:30:00Z",
    postedBy: "",
    postedAt: "",
  },
  {
    id: "BCH-24002",
    batchNumber: "AP-24002",
    description: "Vendor invoice import",
    accountingPeriodId: "2026-07",
    source: "AP",
    status: "DRAFT",
    entryCount: 4,
    debitTotal: 43980,
    creditTotal: 43980,
    createdBy: "R. Bell",
    createdAt: "2026-07-07T13:15:00Z",
    postedBy: "",
    postedAt: "",
  },
  {
    id: "BCH-24003",
    batchNumber: "AR-24003",
    description: "Cash receipts posting",
    accountingPeriodId: "2026-06",
    source: "AR",
    status: "READY",
    entryCount: 3,
    debitTotal: 120000,
    creditTotal: 120000,
    createdBy: "J. Chen",
    createdAt: "2026-07-06T10:05:00Z",
    postedBy: "",
    postedAt: "",
  },
  {
    id: "BCH-24004",
    batchNumber: "AC-24004",
    description: "Monthly accrual review",
    accountingPeriodId: "2026-06",
    source: "ACCRUAL",
    status: "READY",
    entryCount: 5,
    debitTotal: 65000,
    creditTotal: 65000,
    createdBy: "L. Moreno",
    createdAt: "2026-07-05T11:25:00Z",
    postedBy: "",
    postedAt: "",
  },
  {
    id: "BCH-24005",
    batchNumber: "MN-24005",
    description: "Manual journal entry",
    accountingPeriodId: "2026-05",
    source: "MANUAL",
    status: "DRAFT",
    entryCount: 2,
    debitTotal: 17500,
    creditTotal: 17500,
    createdBy: "S. Peters",
    createdAt: "2026-07-04T09:40:00Z",
    postedBy: "",
    postedAt: "",
  },
  {
    id: "BCH-24006",
    batchNumber: "HD-24006",
    description: "Hedge settlement closeout",
    accountingPeriodId: "2026-05",
    source: "HEDGE",
    status: "POSTED",
    entryCount: 8,
    debitTotal: 325000,
    creditTotal: 325000,
    createdBy: "A. Singh",
    createdAt: "2026-07-03T15:50:00Z",
    postedBy: "T. Brooks",
    postedAt: "2026-07-03T16:20:00Z",
  },
  {
    id: "BCH-24007",
    batchNumber: "JIB-24007",
    description: "JIB allocation distribution",
    accountingPeriodId: "2026-05",
    source: "JIB",
    status: "READY",
    entryCount: 7,
    debitTotal: 87500,
    creditTotal: 87500,
    createdBy: "N. Cole",
    createdAt: "2026-07-02T16:10:00Z",
    postedBy: "",
    postedAt: "",
  },
  {
    id: "BCH-24008",
    batchNumber: "REV-24008",
    description: "July revenue posting",
    accountingPeriodId: "2026-07",
    source: "REVENUE",
    status: "POSTED",
    entryCount: 6,
    debitTotal: 248500,
    creditTotal: 248500,
    createdBy: "M. Alvarez",
    createdAt: "2026-07-01T08:15:00Z",
    postedBy: "T. Brooks",
    postedAt: "2026-07-01T09:00:00Z",
  },
  {
    id: "BCH-24009",
    batchNumber: "AP-24009",
    description: "AP holdback reconciliation",
    accountingPeriodId: "2026-06",
    source: "AP",
    status: "VOID",
    entryCount: 4,
    debitTotal: 21000,
    creditTotal: 21000,
    createdBy: "R. Bell",
    createdAt: "2026-06-30T12:20:00Z",
    postedBy: "",
    postedAt: "",
  },
  {
    id: "BCH-24010",
    batchNumber: "AR-24010",
    description: "Customer refund adjustment",
    accountingPeriodId: "2026-07",
    source: "AR",
    status: "READY",
    entryCount: 3,
    debitTotal: 9980,
    creditTotal: 10350,
    createdBy: "J. Chen",
    createdAt: "2026-06-29T14:45:00Z",
    postedBy: "",
    postedAt: "",
  },
  {
    id: "BCH-24011",
    batchNumber: "PR-24011",
    description: "Production allocation review",
    accountingPeriodId: "2026-07",
    source: "PRODUCTION",
    status: "DRAFT",
    entryCount: 5,
    debitTotal: 182500,
    creditTotal: 182500,
    createdBy: "L. Moreno",
    createdAt: "2026-06-28T09:10:00Z",
    postedBy: "",
    postedAt: "",
  },
  {
    id: "BCH-24012",
    batchNumber: "MN-24012",
    description: "Manual reclassification",
    accountingPeriodId: "2026-06",
    source: "MANUAL",
    status: "POSTED",
    entryCount: 2,
    debitTotal: 42000,
    creditTotal: 42000,
    createdBy: "S. Peters",
    createdAt: "2026-06-27T17:35:00Z",
    postedBy: "T. Brooks",
    postedAt: "2026-06-27T18:05:00Z",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: BatchStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

export default function BatchesPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<"ALL" | BatchStatus>("ALL");
  const [sourceFilter, setSourceFilter] = useState<"ALL" | BatchSource>("ALL");
  const [periodFilter, setPeriodFilter] = useState<string>("ALL");

  const rows = useMemo<BatchRow[]>(() => {
    return mockBatches.map((batch) => ({
      ...batch,
      accountingPeriod: batch.accountingPeriodId,
      sourceLabel: SOURCE_LABELS[batch.source],
      statusLabel: STATUS_LABELS[batch.status],
      debitDisplay: formatCurrency(batch.debitTotal),
      creditDisplay: formatCurrency(batch.creditTotal),
      createdDate: formatDate(batch.createdAt),
      isUnbalanced: batch.debitTotal !== batch.creditTotal,
    }));
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const statusMatch = statusFilter === "ALL" || row.status === statusFilter;
      const sourceMatch = sourceFilter === "ALL" || row.source === sourceFilter;
      const periodMatch = periodFilter === "ALL" || row.accountingPeriod === periodFilter;
      return statusMatch && sourceMatch && periodMatch;
    });
  }, [periodFilter, rows, sourceFilter, statusFilter]);

  const readyCount = filteredRows.filter((row) => row.status === "READY").length;
  const postedCount = filteredRows.filter((row) => row.status === "POSTED").length;
  const unbalancedCount = filteredRows.filter((row) => row.isUnbalanced).length;

  const columns: Column<BatchRow>[] = [
    { key: "batchNumber", title: "Batch Number", sortable: true, width: "120px" },
    {
      key: "description",
      title: "Description",
      sortable: true,
      width: "240px",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="truncate">{String(value ?? "")}</span>
          {row.isUnbalanced && (
            <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" aria-label="Unbalanced batch" />
          )}
        </div>
      ),
    },
    { key: "sourceLabel", title: "Source", sortable: true, width: "100px" },
    { key: "accountingPeriod", title: "Accounting Period", sortable: true, width: "120px" },
    {
      key: "statusLabel",
      title: "Status",
      sortable: true,
      width: "100px",
      render: (_value, row) => <StatusBadge status={row.status} />,
    },
    { key: "entryCount", title: "Entry Count", sortable: true, width: "90px", align: "right" },
    {
      key: "debitDisplay",
      title: "Debit Total",
      sortable: true,
      width: "115px",
      align: "right",
    },
    {
      key: "creditDisplay",
      title: "Credit Total",
      sortable: true,
      width: "115px",
      align: "right",
    },
    { key: "createdBy", title: "Created By", sortable: true, width: "120px" },
    { key: "createdDate", title: "Created Date", sortable: true, width: "120px" },
  ];

  return (
    <Workspace
      header={
        <WorkspaceHeader
          title="Batch Queue"
          subtitle="Review, approve, and post accounting batches."
          primaryAction={
            <button className="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
              Create Batch
            </button>
          }
          secondaryActions={
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">{readyCount} ready</span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">{postedCount} posted</span>
              <span className="rounded-full bg-rose-50 px-2.5 py-1 text-rose-700">{unbalancedCount} needs review</span>
            </div>
          }
        />
      }
      toolbar={
        <WorkspaceToolbar
          actions={
            <button
              type="button"
              onClick={() => {
                setStatusFilter("ALL");
                setSourceFilter("ALL");
                setPeriodFilter("ALL");
              }}
              className="rounded border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-600 transition hover:bg-gray-50"
            >
              Reset Filters
            </button>
          }
        >
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-gray-500">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "ALL" | BatchStatus)}
              className="rounded border border-gray-200 bg-white px-2.5 py-1.5 text-sm"
            >
              <option value="ALL">All</option>
              <option value="DRAFT">Draft</option>
              <option value="READY">Ready</option>
              <option value="POSTED">Posted</option>
              <option value="VOID">Void</option>
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-gray-500">Source</span>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value as "ALL" | BatchSource)}
              className="rounded border border-gray-200 bg-white px-2.5 py-1.5 text-sm"
            >
              <option value="ALL">All</option>
              <option value="REVENUE">Revenue</option>
              <option value="AP">AP</option>
              <option value="AR">AR</option>
              <option value="PRODUCTION">Production</option>
              <option value="ACCRUAL">Accrual</option>
              <option value="HEDGE">Hedge</option>
              <option value="MANUAL">Manual</option>
              <option value="JIB">JIB</option>
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <span className="text-gray-500">Period</span>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="rounded border border-gray-200 bg-white px-2.5 py-1.5 text-sm"
            >
              <option value="ALL">All</option>
              <option value="2026-07">2026-07</option>
              <option value="2026-06">2026-06</option>
              <option value="2026-05">2026-05</option>
            </select>
          </label>
        </WorkspaceToolbar>
      }
      detailsPanel={
        <WorkspaceDetailsPanel
          title="Queue Snapshot"
          sections={[
            {
              title: "Overview",
              items: [
                { label: "Ready", value: `${readyCount}` },
                { label: "Posted", value: `${postedCount}` },
                { label: "Needs review", value: `${unbalancedCount}` },
              ],
            },
            {
              title: "Actions",
              actions: (
                <>
                  <button className="rounded border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                    View Summary
                  </button>
                  <button className="rounded border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                    Export Queue
                  </button>
                </>
              ),
            },
          ]}
        />
      }
    >
      <EnterpriseTable<BatchRow>
        columns={columns}
        data={filteredRows}
        rowKey="id"
        initialPageSize={10}
        pageSizeOptions={[10, 25]}
        onRowClick={(row) => router.push(`/accounting/batches/${row.batchNumber}`)}
      />
    </Workspace>
  );
}
