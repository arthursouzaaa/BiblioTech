export default function SummaryCard({ icon: Icon, label, value }) {
  return (
    <div className="flex-1 min-w-[220px] rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br from-indigo-600 to-blue-700">
      <div className="flex items-center gap-2 text-indigo-100 text-sm font-medium">
        <Icon size={18} />
        {label}
      </div>
      <div className="mt-3 text-4xl font-bold tracking-tight">{value}</div>
    </div>
  );
}