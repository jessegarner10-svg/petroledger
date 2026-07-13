import type { ReactNode } from "react";

type WorkspaceToolbarProps = {
  children?: ReactNode;
  actions?: ReactNode;
};

export default function WorkspaceToolbar({ children, actions }: WorkspaceToolbarProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-3">
      {children}
      {actions ? <div className="ml-auto flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
