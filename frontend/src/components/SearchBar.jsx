import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 w-full max-w-sm shadow-sm">
      <Search size={16} className="text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400"
      />
    </div>
  );
}