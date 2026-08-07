import { Pencil, Trash2 } from "lucide-react";

export default function ActionButtons() {
  return (
    <div className="flex gap-2">
      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-900 text-xs font-semibold hover:bg-amber-300 transition-colors">
        <Pencil size={13} /> Editar
      </button>
      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-400 transition-colors">
        <Trash2 size={13} /> Excluir
      </button>
    </div>
  );
}