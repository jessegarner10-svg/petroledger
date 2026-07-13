import type { ReactNode } from "react";

type WorkflowProps = {
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
  header?: ReactNode;
  stepList?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
};

export default function Workflow({
  title,
  subtitle,
  currentStep,
  totalSteps,
  header,
  stepList,
  content,
  footer,
}: WorkflowProps) {
  return (
    <div className="max-w-7xl rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      {header ?? (
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-start">
        {stepList ? <div>{stepList}</div> : null}
        <div className="min-w-0 flex-1">
          {content}
          {footer ? <div className="mt-4">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
