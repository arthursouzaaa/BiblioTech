import { BookOpen } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 text-white">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
            <BookOpen size={28} />
          </div>
          <h1 className="text-2xl font-bold">Biblioteca</h1>
          <p className="text-indigo-100 text-sm mt-1">Sistema de gerenciamento de acervo</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">{children}</div>
      </div>
    </div>
  );
}