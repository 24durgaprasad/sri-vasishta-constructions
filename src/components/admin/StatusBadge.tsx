interface StatusBadgeProps {
  status: string;
}

const colors: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  new: "bg-blue-100 text-blue-800",
  held: "bg-yellow-100 text-yellow-800",
  booked: "bg-orange-100 text-orange-800",
  sold: "bg-red-100 text-red-800",
  contacted: "bg-purple-100 text-purple-800",
  closed: "bg-gray-100 text-gray-600",
  published: "bg-green-100 text-green-800",
  draft: "bg-gray-100 text-gray-600",
  "under-construction": "bg-yellow-100 text-yellow-800",
  ready: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  upcoming: "bg-purple-100 text-purple-800",
  "sold-out": "bg-red-100 text-red-800",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status.replace(/-/g, " ")}
    </span>
  );
}
