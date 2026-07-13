import type { ReactNode } from "react";

type WorkflowContentProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function WorkflowContent({ title, description, children }: WorkflowContentProps) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {description ? <p className="mt-1 text-sm text-gray-600">{description}</p> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
