export default function InputField({ icon: Icon, label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow">
        <Icon size={16} className="text-slate-400" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}