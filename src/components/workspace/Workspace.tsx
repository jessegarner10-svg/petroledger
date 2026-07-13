import type { ReactNode } from "react";

type WorkspaceProps = {
  header?: ReactNode;
  toolbar?: ReactNode;
  children?: ReactNode;
  detailsPanel?: ReactNode;
};

export default function Workspace({ header, toolbar, children, detailsPanel }: WorkspaceProps) {
  return (
    <div className="max-w-7xl">
      {header}

      {toolbar}

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">{children}</div>
        {detailsPanel ? <div className="w-full lg:w-80">{detailsPanel}</div> : null}
      </div>
    </div>
  );
}
