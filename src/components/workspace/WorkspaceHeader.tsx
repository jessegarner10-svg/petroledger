import type { ReactNode } from "react";

type WorkspaceHeaderProps = {
  title: string;
  subtitle?: string;
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
};

export default function WorkspaceHeader({
  title,
  subtitle,
  primaryAction,
  secondaryActions,
}: WorkspaceHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 pb-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {secondaryActions}
        {primaryAction}
      </div>
    </div>
  );
}
