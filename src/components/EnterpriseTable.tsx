"use client";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Column<T> = {
  key: keyof T & string;
  title: string;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, row: T) => ReactNode;
  align?: "left" | "center" | "right";
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T & string;
  loading?: boolean;
  pageSizeOptions?: number[];
  initialPageSize?: number;
};

export default function EnterpriseTable<T extends object>({
  columns,
  data,
  rowKey,
  loading = false,
  pageSizeOptions = [10, 25, 50],
  initialPageSize = 10,
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let items = data;
    if (q) {
      items = items.filter((r) =>
        Object.values(r).some((v) => String(v).toLowerCase().includes(q))
      );
    }

    if (sortKey) {
      items = [...items].sort((a, b) => {
        const A = (a as Record<string, unknown>)[sortKey];
        const B = (b as Record<string, unknown>)[sortKey];
        if (A == null && B == null) return 0;
        if (A == null) return sortDir === "asc" ? -1 : 1;
        if (B == null) return sortDir === "asc" ? 1 : -1;
        if (typeof A === "number" && typeof B === "number") {
          return sortDir === "asc" ? A - B : B - A;
        }
        return sortDir === "asc"
          ? String(A).localeCompare(String(B))
          : String(B).localeCompare(String(A));
      });
    }

    return items;
  }, [data, search, sortKey, sortDir]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  function toggleSelectAll(checked: boolean) {
    if (checked) {
      const next: Record<string, boolean> = {};
      paged.forEach((r) => (next[String(r[rowKey])] = true));
      setSelected((s) => ({ ...s, ...next }));
    } else {
      const next = { ...selected };
      paged.forEach((r) => delete next[String(r[rowKey])]);
      setSelected(next);
    }
  }

  function toggleRow(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  function handleSort(col: Column<T>) {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.key);
      setSortDir("asc");
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="text-sm font-semibold">Records</div>
          <div className="text-xs text-gray-500">{total} items</div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="hidden sm:block">
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search rows..."
              className="px-3 py-1.5 w-64 bg-white border border-gray-200 rounded text-sm focus:outline-none"
            />
          </div>

          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50">Export</button>
          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm hover:bg-gray-50">Refresh</button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs text-gray-600">
              <th className="w-12 px-3 py-2 border-b">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </th>
              {columns.map((col) => {
                const alignClass = col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left";

                return (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    className={`px-3 py-2 border-b cursor-pointer select-none ${alignClass}`}
                    onClick={() => handleSort(col)}
                  >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">{col.title}</span>
                    {col.sortable && (
                      <span className="text-gray-400 text-xs">
                        {sortKey === col.key ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                      </span>
                    )}
                  </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && paged.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-500">
                  <div className="mb-2 text-sm">No records to display</div>
                  <div className="text-xs text-gray-400">Try adjusting filters or refresh the view.</div>
                </td>
              </tr>
            )}

            {!loading && paged.map((row) => (
              <tr key={String(row[rowKey])} className="odd:bg-white even:bg-gray-50">
                <td className="px-3 py-2 border-t">
                  <input
                    type="checkbox"
                    checked={!!selected[String(row[rowKey])]}
                    onChange={() => toggleRow(String(row[rowKey]))}
                  />
                </td>
                {columns.map((col) => {
                  const value = row[col.key];
                  const alignClass = col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left";
                  const content = col.render ? col.render(value, row) : String(value ?? "");

                  return (
                    <td key={col.key} className={`px-3 py-1.5 border-t text-xs text-gray-700 ${alignClass}`}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
        <div className="flex items-center space-x-3">
          <div>Rows per page</div>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
            className="px-2 py-1 border border-gray-200 rounded bg-white text-sm"
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-xs text-gray-500">{(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, total)} of {total}</div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2 py-1 border border-gray-200 rounded bg-white text-sm"
            >Prev</button>
            <div className="px-2 py-1 text-sm">{currentPage} / {totalPages}</div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-2 py-1 border border-gray-200 rounded bg-white text-sm"
            >Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
