import { Plus } from "lucide-react";

export default function SectionHeader({ title, buttonLabel, onButtonClick }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      {buttonLabel && (
        <button
          onClick={onButtonClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm"
        >
          <Plus size={16} /> {buttonLabel}
        </button>
      )}
    </div>
  );
}