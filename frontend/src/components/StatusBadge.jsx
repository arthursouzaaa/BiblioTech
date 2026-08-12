export default function StatusBadge({ status }) {
  const styles = {
    "Disponível": "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "Emprestado": "bg-amber-50 text-amber-700 border border-amber-200",
    "Ativo": "bg-blue-50 text-blue-700 border border-blue-200",
    "Em atraso": "bg-red-50 text-red-700 border border-red-200",
    "Concluído": "bg-green-50 text-green-700 border border-green-200",
    "Cancelado": "bg-gray-50 text-gray-700 border border-gray-200",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}