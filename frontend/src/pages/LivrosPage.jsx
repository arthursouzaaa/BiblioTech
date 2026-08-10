import { useState, useMemo } from "react";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import { BookOpen, User, Tag, Calendar } from "lucide-react";
import { LIVROS_MOCK } from "../data/mockData";

export default function LivrosPage() {
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const filtrados = useMemo(
    () => LIVROS_MOCK.filter((l) => l.titulo.toLowerCase().includes(busca.toLowerCase())),
    [busca]
  );

  // Só visual por enquanto — Paizão troca isso pela chamada real
  // POST /api/livros e fecha o modal quando a API responder com sucesso.
  function handleSalvar(e) {
    e.preventDefault();
    setModalAberto(false);
  }

  return (
    <div>
      <SectionHeader title="Gerenciar Livros" buttonLabel="Novo Livro" onButtonClick={() => setModalAberto(true)} />
      <SearchBar value={busca} onChange={setBusca} placeholder="Buscar por título..." />

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mt-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white text-left">
              <th className="py-3 px-4 font-semibold">Título</th>
              <th className="py-3 px-4 font-semibold">Autor</th>
              <th className="py-3 px-4 font-semibold">Categoria</th>
              <th className="py-3 px-4 font-semibold">Ano</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((l, i) => (
              <tr key={l.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="py-3 px-4 text-slate-700 font-medium">{l.titulo}</td>
                <td className="py-3 px-4 text-slate-700">{l.autor}</td>
                <td className="py-3 px-4 text-slate-700">{l.categoria}</td>
                <td className="py-3 px-4 text-slate-700">{l.ano}</td>
                <td className="py-3 px-4"><StatusBadge status={l.status} /></td>
                <td className="py-3 px-4"><ActionButtons /></td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-400">Nenhum livro encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal title="Novo Livro" isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <form onSubmit={handleSalvar}>
          <InputField icon={BookOpen} label="Título" placeholder="Ex: Dom Casmurro" />
          <InputField icon={User} label="Autor" placeholder="Ex: Machado de Assis" />
          <InputField icon={Tag} label="Categoria" placeholder="Ex: Romance" />
          <InputField icon={Calendar} label="Ano" type="number" placeholder="Ex: 2024" />

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