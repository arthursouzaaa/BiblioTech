import { useState, useEffect } from "react";
import { BookOpen, Users, RefreshCcw } from "lucide-react";
import SummaryCard from "../components/SummaryCard";
import api from "../api";

export default function DashboardPage({ usuario }) {
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = usuario?.perfil === "administrador";

  async function carregarDados() {
    setLoading(true);
    try {
      const promises = [api.get("/api/livros"), api.get("/api/emprestimos")];
      
      if (isAdmin) {
        promises.push(api.get("/api/usuarios"));
      }

      const results = await Promise.all(promises);
      
      setLivros(results[0].data || []);
      setEmprestimos(results[1].data || []);
      
      if (isAdmin) {
        setUsuarios(results[2].data || []);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (usuario) {
      carregarDados();
    }
  }, [usuario, isAdmin]);

  const emprestimosAtivos = Array.isArray(emprestimos) 
    ? emprestimos.filter((e) => e.status === "Ativo" || e.status === "Em atraso")
    : [];

  // Rótulo dinâmico para o card
  const labelEmprestimos = isAdmin ? "Empréstimos Ativos (Total)" : "Meus Empréstimos Ativos";

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      <p className="text-slate-500 mt-1 mb-6">Bem-vindo ao sistema de gerenciamento da biblioteca!</p>

      <div className="flex flex-wrap gap-5">
        <SummaryCard icon={BookOpen} label="Livros Disponíveis" value={loading ? "..." : livros.length} />
        
        {isAdmin && (
          <SummaryCard icon={Users} label="Total de Usuários" value={loading ? "..." : usuarios.length} />
        )}
        
        <SummaryCard icon={RefreshCcw} label={labelEmprestimos} value={loading ? "..." : emprestimosAtivos.length} />
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
            {loading ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-400">Carregando...</td>
              </tr>
            ) : livros.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-400">Nenhum livro disponível no momento.</td>
              </tr>
            ) : (
              livros.slice(0, 5).map((l, i) => (
                <tr key={l.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="py-3 px-4 text-slate-700">{l.titulo}</td>
                  <td className="py-3 px-4 text-slate-700">{l.autor}</td>
                  <td className="py-3 px-4 text-slate-700">{l.categoria}</td>
                  <td className="py-3 px-4 text-slate-700">{l.ano}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}