import { useState, useMemo } from "react";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import { BookOpen, User, Calendar } from "lucide-react";
import { EMPRESTIMOS_MOCK } from "../data/mockData";

export default function EmprestimosPage() {
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const filtrados = useMemo(
    () =>
      EMPRESTIMOS_MOCK.filter(
        (e) =>
          e.livro.toLowerCase().includes(busca.toLowerCase()) ||
          e.usuario.toLowerCase().includes(busca.toLowerCase())
      ),            
    [busca]
  );

  // Só visual por enquanto — Paizão troca isso pela chamada real
  // POST /api/emprestimos e fecha o modal quando a API responder com sucesso.
  function handleSalvar(e) {
    e.preventDefault();
    setModalAberto(false);
  }

  return (
    <div>
      <SectionHeader title="Gerenciar Empréstimos" buttonLabel="Novo Empréstimo" onButtonClick={() => setModalAberto(true)} />
      <SearchBar value={busca} onChange={setBusca} placeholder="Buscar por livro ou usuário..." />

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mt-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white text-left">
              <th className="py-3 px-4 font-semibold">Livro</th>
              <th className="py-3 px-4 font-semibold">Usuário</th>
              <th className="py-3 px-4 font-semibold">Data Empréstimo</th>
              <th className="py-3 px-4 font-semibold">Data Devolução</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((e, i) => (
              <tr key={e.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="py-3 px-4 text-slate-700 font-medium">{e.livro}</td>
                <td className="py-3 px-4 text-slate-700">{e.usuario}</td>
                <td className="py-3 px-4 text-slate-700">{e.dataEmprestimo}</td>
                <td className="py-3 px-4 text-slate-700">{e.dataDevolucao}</td>
                <td className="py-3 px-4"><StatusBadge status={e.status} /></td>
                <td className="py-3 px-4"><ActionButtons /></td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-400">Nenhum empréstimo encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal title="Novo Empréstimo" isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <form onSubmit={handleSalvar}>
          <InputField icon={BookOpen} label="Livro" placeholder="Ex: 1984" />
          <InputField icon={User} label="Usuário" placeholder="Ex: Ana Beatriz" />
          <InputField icon={Calendar} label="Data do empréstimo" type="date" />
          <InputField icon={Calendar} label="Data de devolução" type="date" />

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setModalAberto(false)}
              className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold py-2.5 rounded-xl"
            >
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}