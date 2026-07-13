export type WorkflowStepStatus = "complete" | "current" | "pending";

type WorkflowStep = {
  id: string;
  title: string;
  status: WorkflowStepStatus;
};

type WorkflowStepListProps = {
  steps: WorkflowStep[];
};

const statusStyles: Record<WorkflowStepStatus, string> = {
  complete: "bg-emerald-100 text-emerald-700",
  current: "bg-indigo-100 text-indigo-700",
  pending: "bg-gray-100 text-gray-600",
};

export default function WorkflowStepList({ steps }: WorkflowStepListProps) {
  return (
    <div className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 lg:w-72">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Workflow</div>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-3 rounded-md border border-gray-200 bg-white px-3 py-2">
            <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${statusStyles[step.status]}`}>
              {index + 1}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900">{step.title}</div>
              <div className="text-xs text-gray-500">{step.status === "complete" ? "Complete" : step.status === "current" ? "Current" : "Pending"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
