import type { ReactNode } from "react";

type DetailSection = {
  title?: string;
  items?: Array<{ label: string; value?: ReactNode }>;
  actions?: ReactNode;
};

type WorkspaceDetailsPanelProps = {
  title?: string;
  sections?: DetailSection[];
  emptyState?: ReactNode;
  children?: ReactNode;
};

export default function WorkspaceDetailsPanel({
  title,
  sections,
  emptyState,
  children,
}: WorkspaceDetailsPanelProps) {
  return (
    <aside className="w-full rounded-md border border-gray-200 bg-white p-4 shadow-sm lg:w-80">
      {title ? <h2 className="text-sm font-semibold text-gray-900">{title}</h2> : null}

      {children}

      {!children && sections && sections.length > 0 ? (
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={`${section.title ?? "section"}-${index}`}>
              {section.title ? <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{section.title}</div> : null}
              {section.items && section.items.length > 0 ? (
                <dl className="space-y-2 text-sm text-gray-700">
                  {section.items.map((item, itemIndex) => (
                    <div key={`${item.label}-${itemIndex}`} className="flex items-start justify-between gap-3">
                      <dt className="text-gray-500">{item.label}</dt>
                      <dd className="text-right text-gray-900">{item.value ?? "—"}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {section.actions ? <div className="mt-3 flex flex-wrap gap-2">{section.actions}</div> : null}
            </div>
          ))}
        </div>
      ) : null}

      {!children && !sections || (sections && sections.length === 0 && !emptyState) ? (
        <div className="mt-2 text-sm text-gray-500">No details available.</div>
      ) : null}

      {!children && sections && sections.length === 0 && emptyState ? (
        <div className="mt-2 text-sm text-gray-500">{emptyState}</div>
      ) : null}
    </aside>
  );
}
