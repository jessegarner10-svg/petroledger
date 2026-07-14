"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import EnterpriseTable, { type Column } from "../../components/EnterpriseTable";
import Workspace from "../../components/workspace/Workspace";
import WorkspaceDetailsPanel from "../../components/workspace/WorkspaceDetailsPanel";
import WorkspaceHeader from "../../components/workspace/WorkspaceHeader";
import { quickActions, readyToPostRows, recentActivity, workItems } from "../../mock/workItems";
import type { BatchReadyRow } from "../../mock/workItems";

const readyToPostColumns: Column<BatchReadyRow>[] = [
  { key: "batch", title: "Batch", sortable: true, width: "110px" },
  { key: "source", title: "Source", sortable: true, width: "90px" },
  { key: "period", title: "Period", sortable: true, width: "100px" },
  { key: "createdBy", title: "Created By", sortable: true, width: "120px" },
  { key: "status", title: "Status", sortable: true, width: "90px" },
  { key: "debit", title: "Debit", sortable: true, width: "110px", align: "right" },
  { key: "credit", title: "Credit", sortable: true, width: "110px", align: "right" },
  { key: "balanced", title: "Balanced", sortable: true, width: "90px" },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <Workspace
      header={
        <WorkspaceHeader
          title="Good Morning, Jesse"
          subtitle="Here's what needs your attention today."
          primaryAction={
            <Link href="/accounting/batches" className="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
              Review Queue
            </Link>
          }
        />
      }
      detailsPanel={
        <WorkspaceDetailsPanel
          title="Today at a glance"
          sections={[
            {
              title: "Focus",
              items: [
                { label: "Next action", value: "Review REV-24013" },
                { label: "Pending exceptions", value: "2" },
                { label: "Balanced batches", value: "3" },
              ],
            },
          ]}
        />
      }
    >
      <div className="space-y-4">
        <section className="rounded-md border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">My Work</h2>
            <span className="text-xs text-gray-500">Priority queue</span>
          </div>
          <div className="space-y-2">
            {workItems.map((item) => {
              const content = (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                  <div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="mt-0.5 text-xs text-gray-500">{item.module}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-700">{item.priority}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">{item.status}</span>
                    <span className="text-gray-500">{item.effort}</span>
                  </div>
                </div>
              );

              return item.href ? (
                <Link key={item.id} href={item.href}>
                  {content}
                </Link>
              ) : (
                <div key={item.id}>{content}</div>
              );
            })}
          </div>
        </section>

        <section className="rounded-md border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Continue Working</h2>
            <span className="text-xs text-gray-500">In progress</span>
          </div>
          <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-gray-900">Revenue Import</div>
                <div className="mt-1 text-xs text-gray-500">Step 3 of 5 • 65% complete</div>
                <div className="mt-1 text-xs text-gray-500">Estimated time remaining: 2 minutes</div>
              </div>
              <Link href="/revenue/import" className="rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white">
                Continue
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-md border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Quick Actions</h2>
            <span className="text-xs text-gray-500">Common tasks</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href} className="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100">
                {action.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Ready to Post</h2>
            <span className="text-xs text-gray-500">Balanced drafts</span>
          </div>
          <EnterpriseTable<BatchReadyRow>
            columns={readyToPostColumns}
            data={readyToPostRows}
            rowKey="id"
            initialPageSize={10}
            pageSizeOptions={[10]}
            onRowClick={(row) => router.push(`/accounting/batches/${row.batch}`)}
          />
        </section>

        <section className="rounded-md border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
            <span className="text-xs text-gray-500">Latest updates</span>
          </div>
          <div className="space-y-2">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                <span>{item.title}</span>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Workspace>
  );
}
