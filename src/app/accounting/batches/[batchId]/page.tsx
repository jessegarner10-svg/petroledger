"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import EnterpriseTable, { type Column } from "../../../../components/EnterpriseTable";
import Workspace from "../../../../components/workspace/Workspace";
import WorkspaceDetailsPanel from "../../../../components/workspace/WorkspaceDetailsPanel";
import WorkspaceHeader from "../../../../components/workspace/WorkspaceHeader";
import WorkspaceToolbar from "../../../../components/workspace/WorkspaceToolbar";

type ValidationTone = "success" | "warning";

type ValidationItem = {
  id: string;
  tone: ValidationTone;
  title: string;
  detail?: string;
};

type JournalRow = {
  account: string;
  description: string;
  debit: number;
  credit: number;
  property: string;
  reference: string;
};

const mockBatchDetails = {
  id: "REV-24013",
  title: "Revenue Batch REV-24013",
  subtitle: "Review this batch before posting.",
  confidence: 98,
  statusLabel: "Ready to Post",
  source: "Revenue Import",
  accountingPeriod: "July 2026",
  createdBy: "M. Alvarez",
  createdDate: "2026-07-10T08:30:00Z",
  entryCount: 6,
  debitTotal: 1248500,
  creditTotal: 1248500,
  balanced: true,
  isReadyToPost: true,
};

const validationItems: ValidationItem[] = [
  {
    id: "debits-credits",
    tone: "success",
    title: "Debits equal Credits",
  },
  {
    id: "accounting-period",
    tone: "success",
    title: "Accounting Period Open",
  },
  {
    id: "properties",
    tone: "success",
    title: "All Properties Matched",
  },
  {
    id: "coa",
    tone: "success",
    title: "Chart of Accounts Valid",
  },
  {
    id: "property-acceptances",
    tone: "warning",
    title: "Two property matches were accepted during import",
    detail: "Review completed for North Fork and Mesa Federal 4H.",
  },
];

const journalRows: JournalRow[] = [
  {
    account: "1100 - Accounts Receivable",
    description: "July purchaser statement billing",
    debit: 1248500,
    credit: 0,
    property: "North Fork Unit",
    reference: "REV-24013-001",
  },
  {
    account: "4010 - Sales Revenue",
    description: "Revenue recognition from July statement",
    debit: 0,
    credit: 1185000,
    property: "North Fork Unit",
    reference: "REV-24013-002",
  },
  {
    account: "2310 - Taxes Payable",
    description: "Tax withholding on July settlement",
    debit: 0,
    credit: 63500,
    property: "North Fork Unit",
    reference: "REV-24013-003",
  },
  {
    account: "1100 - Accounts Receivable",
    description: "July purchaser statement billing",
    debit: 0,
    credit: 65000,
    property: "Mesa Federal 4H",
    reference: "REV-24013-004",
  },
  {
    account: "4010 - Sales Revenue",
    description: "Revenue recognition from July statement",
    debit: 65000,
    credit: 0,
    property: "Mesa Federal 4H",
    reference: "REV-24013-005",
  },
  {
    account: "2400 - Accrued Deductions",
    description: "Leasehold deduction reserve",
    debit: 0,
    credit: 12000,
    property: "Mesa Federal 4H",
    reference: "REV-24013-006",
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

export default function BatchReviewPage() {
  const params = useParams<{ batchId?: string }>();
  const [showExplanation, setShowExplanation] = useState(false);

  const batch = useMemo(() => {
    const requestedId = params?.batchId ?? "REV-24013";
    return requestedId === "REV-24013"
      ? mockBatchDetails
      : { ...mockBatchDetails, id: requestedId, title: `Revenue Batch ${requestedId}` };
  }, [params?.batchId]);

  const tableColumns = useMemo<Column<JournalRow>[]>(() => [
    {
      key: "account",
      title: "Account",
      sortable: true,
      width: "20%",
    },
    {
      key: "description",
      title: "Description",
      sortable: true,
      width: "24%",
    },
    {
      key: "debit",
      title: "Debit",
      sortable: true,
      width: "12%",
      align: "right",
      render: (value) => formatCurrency(Number(value ?? 0)),
    },
    {
      key: "credit",
      title: "Credit",
      sortable: true,
      width: "12%",
      align: "right",
      render: (value) => formatCurrency(Number(value ?? 0)),
    },
    {
      key: "property",
      title: "Property",
      sortable: true,
      width: "16%",
    },
    {
      key: "reference",
      title: "Reference",
      sortable: true,
      width: "16%",
    },
  ], []);

  return (
    <>
      <Workspace
        header={
          <WorkspaceHeader
            title={batch.title}
            subtitle={batch.subtitle}
            secondaryActions={
              <div className="flex flex-wrap items-center gap-2">
                <div className="rounded border border-slate-200 bg-white px-2.5 py-1 text-sm text-slate-700">
                  <span className="mr-2 text-xs uppercase tracking-wide text-slate-500">Confidence Score</span>
                  <span className="font-semibold text-slate-900">{batch.confidence}%</span>
                </div>
                <div className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-sm text-emerald-700">
                  <span className="mr-2 text-xs uppercase tracking-wide">Status</span>
                  <span className="font-semibold">{batch.statusLabel}</span>
                </div>
              </div>
            }
            primaryAction={
              <div className="flex items-center gap-2">
                <Link
                  href="/accounting/batches"
                  className="rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Back
                </Link>
                <button
                  type="button"
                  onClick={() => setShowExplanation(true)}
                  className="rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Explain This
                </button>
                <button
                  type="button"
                  className="rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Export
                </button>
                <button
                  type="button"
                  disabled={!batch.isReadyToPost}
                  className="rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Post Batch
                </button>
              </div>
            }
          />
        }
        toolbar={
          <WorkspaceToolbar>
            <div className="text-sm text-gray-600">
              Draft review for revenue generated from the July 2026 purchaser statement.
            </div>
          </WorkspaceToolbar>
        }
        detailsPanel={
          <WorkspaceDetailsPanel
            title="Review Details"
            sections={[
              {
                title: "Batch Details",
                items: [
                  { label: "Batch Number", value: batch.id },
                  { label: "Source", value: batch.source },
                  { label: "Accounting Period", value: batch.accountingPeriod },
                  { label: "Created By", value: batch.createdBy },
                  { label: "Created Date", value: formatDate(batch.createdDate) },
                  { label: "Entry Count", value: batch.entryCount },
                  { label: "Debit Total", value: formatCurrency(batch.debitTotal) },
                  { label: "Credit Total", value: formatCurrency(batch.creditTotal) },
                  { label: "Balanced", value: batch.balanced ? "Yes" : "No" },
                ],
              },
              {
                title: "Related Revenue Import",
                items: [
                  { label: "Import Source", value: "July 2026 purchaser statement" },
                  { label: "Record Count", value: "284 revenue rows" },
                  { label: "Matched Properties", value: "282 of 284" },
                ],
              },
              {
                title: "Activity Timeline",
                items: [
                  { label: "Imported", value: "10 Jul 2026 08:30" },
                  { label: "Validated", value: "10 Jul 2026 08:45" },
                  { label: "Ready for review", value: "10 Jul 2026 08:46" },
                ],
              },
              {
                title: "Validation History",
                items: [
                  { label: "Last review", value: "Auto-validated" },
                  { label: "Approver", value: "Pending" },
                ],
              },
              {
                title: "Notes",
                items: [{ label: "Notes", value: "No notes added yet." }],
              },
            ]}
          />
        }
      >
        <div className="space-y-4">
          <section className="rounded-md border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Validation Summary</h2>
              <span className="text-xs uppercase tracking-wide text-gray-500">Compact review</span>
            </div>

            <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {validationItems.map((item) => (
                <div
                  key={item.id}
                  className={`rounded border p-3 ${item.tone === "success" ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}
                >
                  <div className="flex items-start gap-2">
                    <span className={item.tone === "success" ? "text-emerald-600" : "text-amber-600"}>
                      {item.tone === "success" ? "✓" : "⚠"}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      {item.detail ? <div className="mt-1 text-xs text-gray-600">{item.detail}</div> : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Batch Summary</h2>
              <span className="text-xs uppercase tracking-wide text-gray-500">Key details</span>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs uppercase tracking-wide text-gray-500">Batch Number</div>
                <div className="mt-1 text-sm font-medium text-gray-900">{batch.id}</div>
              </div>
              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs uppercase tracking-wide text-gray-500">Source</div>
                <div className="mt-1 text-sm font-medium text-gray-900">{batch.source}</div>
              </div>
              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs uppercase tracking-wide text-gray-500">Accounting Period</div>
                <div className="mt-1 text-sm font-medium text-gray-900">{batch.accountingPeriod}</div>
              </div>
              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs uppercase tracking-wide text-gray-500">Created By</div>
                <div className="mt-1 text-sm font-medium text-gray-900">{batch.createdBy}</div>
              </div>
              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs uppercase tracking-wide text-gray-500">Created Date</div>
                <div className="mt-1 text-sm font-medium text-gray-900">{formatDate(batch.createdDate)}</div>
              </div>
              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs uppercase tracking-wide text-gray-500">Entry Count</div>
                <div className="mt-1 text-sm font-medium text-gray-900">{batch.entryCount}</div>
              </div>
              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs uppercase tracking-wide text-gray-500">Debit Total</div>
                <div className="mt-1 text-sm font-medium text-gray-900">{formatCurrency(batch.debitTotal)}</div>
              </div>
              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs uppercase tracking-wide text-gray-500">Credit Total</div>
                <div className="mt-1 text-sm font-medium text-gray-900">{formatCurrency(batch.creditTotal)}</div>
              </div>
              <div className="rounded border border-gray-200 bg-gray-50 p-3">
                <div className="text-xs uppercase tracking-wide text-gray-500">Balanced</div>
                <div className="mt-1 text-sm font-medium text-gray-900">{batch.balanced ? "Yes" : "No"}</div>
              </div>
            </div>
          </section>

          <section className="rounded-md border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Journal Entries</h2>
              <span className="text-xs uppercase tracking-wide text-gray-500">Mock accounting lines</span>
            </div>

            <EnterpriseTable
              columns={tableColumns}
              data={journalRows}
              rowKey="reference"
              initialPageSize={6}
            />
          </section>
        </div>
      </Workspace>

      {showExplanation ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-lg rounded-md border border-gray-200 bg-white p-5 shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Why this batch was created</h3>
                <p className="mt-1 text-sm text-gray-600">Mock explanation for review purposes.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowExplanation(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <p>
                Revenue from the July 2026 purchaser statement created Accounts Receivable and Revenue entries.
              </p>
              <p>
                Taxes and deductions were recorded separately so the batch remains auditable and easy to review.
              </p>
              <p>
                All journal entries balance and are ready for the next posting step.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
