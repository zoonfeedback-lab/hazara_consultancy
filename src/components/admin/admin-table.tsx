"use client";

type Column<T> = {
  align?: "left" | "center" | "right";
  className?: string;
  header: string;
  render: (row: T) => React.ReactNode;
};

type AdminTableProps<T> = {
  columns: Column<T>[];
  emptyAction?: React.ReactNode;
  emptyMessage?: string;
  emptyTitle?: string;
  loading?: boolean;
  onRowClick?: (row: T) => void;
  rowKey: (row: T) => string;
  rows: T[];
  skeletonRows?: number;
};

export function AdminTable<T>({
  columns,
  emptyAction,
  emptyMessage = "There is nothing to show here yet.",
  emptyTitle = "No records found",
  loading = false,
  onRowClick,
  rowKey,
  rows,
  skeletonRows = 5,
}: AdminTableProps<T>) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-[12px] border border-[#EEEEEE]">
        <table className="admin-table">
          <thead>
            <tr className="bg-[#FCFCFD] text-xs uppercase tracking-[0.16em] text-[#6B7280]">
              {columns.map((column) => (
                <th key={column.header}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: skeletonRows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={`${column.header}-${rowIndex}`}>
                    <div className="admin-skeleton h-4 w-full rounded-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="admin-empty-state">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EDE6] text-[#0F2447]">
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[1.6]">
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h10" />
          </svg>
        </div>
        <div className="space-y-2">
          <div className="text-base font-semibold text-[#0F2447]">{emptyTitle}</div>
          <p className="max-w-md text-sm leading-6 text-[#4B5563]">{emptyMessage}</p>
        </div>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[12px] border border-[#EEEEEE]">
      <table className="admin-table">
        <thead>
          <tr className="bg-[#FCFCFD] text-xs uppercase tracking-[0.16em] text-[#6B7280]">
            {columns.map((column) => (
              <th
                key={column.header}
                className={`${column.className ?? ""} ${
                  column.align === "center"
                    ? "text-center"
                    : column.align === "right"
                      ? "text-right"
                      : "text-left"
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className={onRowClick ? "cursor-pointer hover:bg-[#F6F7FB]" : ""}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column) => (
                <td
                  key={`${rowKey(row)}-${column.header}`}
                  className={`${column.className ?? ""} ${
                    column.align === "center"
                      ? "text-center"
                      : column.align === "right"
                        ? "text-right"
                        : "text-left"
                  }`}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
