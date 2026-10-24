interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  keyField: keyof T;
  emptyMessage?: string;
}

export function AdminTable<T extends Record<string, unknown>>({
  columns,
  rows,
  keyField,
  emptyMessage = "No records found.",
}: AdminTableProps<T>) {
  if (rows.length === 0) {
    return <p className="text-navy-400 text-sm py-8 text-center">{emptyMessage}</p>;
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-navy-100">
      <table className="w-full text-sm">
        <thead className="bg-navy-50 text-navy-600 uppercase text-xs tracking-wide">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-50">
          {rows.map((row) => (
            <tr key={String(row[keyField])} className="hover:bg-navy-50/50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-navy-700">
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
