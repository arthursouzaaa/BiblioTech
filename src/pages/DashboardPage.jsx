import { BookOpen, Users, RefreshCcw } from "lucide-react";
import SummaryCard from "../components/SummaryCard";
import { LIVROS_MOCK, USUARIOS_MOCK, EMPRESTIMOS_MOCK } from "../data/mockData";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      <p className="text-slate-500 mt-1 mb-6">Bem-vindo ao sistema de gerenciamento da biblioteca!</p>

      <div className="flex flex-wrap gap-5">
        <SummaryCard icon={BookOpen} label="Livros" value={LIVROS_MOCK.length} />
        <SummaryCard icon={Users} label="Usuários" value={USUARIOS_MOCK.length} />
        <SummaryCard icon={RefreshCcw} label="Empréstimos ativos" value={EMPRESTIMOS_MOCK.length} />
      </div>

      <h2 className="text-lg font-bold text-slate-800 mt-10 mb-4">Últimos Livros Cadastrados</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white text-left">
              <th className="py-3 px-4 font-semibold">Título</th>
              <th className="py-3 px-4 font-semibold">Autor</th>
              <th className="py-3 px-4 font-semibold">Categoria</th>
              <th className="py-3 px-4 font-semibold">Ano</th>
            </tr>
          </thead>
          <tbody>
            {LIVROS_MOCK.map((l, i) => (
              <tr key={l.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="py-3 px-4 text-slate-700">{l.titulo}</td>
                <td className="py-3 px-4 text-slate-700">{l.autor}</td>
                <td className="py-3 px-4 text-slate-700">{l.categoria}</td>
                <td className="py-3 px-4 text-slate-700">{l.ano}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}