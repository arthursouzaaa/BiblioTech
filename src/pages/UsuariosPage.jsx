import { useState, useMemo } from "react";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import ActionButtons from "../components/ActionButtons";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import { User, Mail } from "lucide-react";
import { USUARIOS_MOCK } from "../data/mockData";

export default function UsuariosPage() {
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const filtrados = useMemo(
    () => USUARIOS_MOCK.filter((u) => u.nome.toLowerCase().includes(busca.toLowerCase())),
    [busca]
  );

  // Só visual por enquanto — Paizão troca isso pela chamada real
  // POST /api/usuarios e fecha o modal quando a API responder com sucesso.
  function handleSalvar(e) {
    e.preventDefault();
    setModalAberto(false);
  }

  return (
    <div>
      <SectionHeader title="Gerenciar Usuários" buttonLabel="Novo Usuário" onButtonClick={() => setModalAberto(true)} />
      <SearchBar value={busca} onChange={setBusca} placeholder="Buscar por nome..." />

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mt-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white text-left">
              <th className="py-3 px-4 font-semibold">Nome</th>
              <th className="py-3 px-4 font-semibold">E-mail</th>
              <th className="py-3 px-4 font-semibold">Empréstimos ativos</th>
              <th className="py-3 px-4 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((u, i) => (
              <tr key={u.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="py-3 px-4 text-slate-700 font-medium">{u.nome}</td>
                <td className="py-3 px-4 text-slate-700">{u.email}</td>
                <td className="py-3 px-4 text-slate-700">{u.emprestimosAtivos}</td>
                <td className="py-3 px-4"><ActionButtons /></td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-400">Nenhum usuário encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal title="Novo Usuário" isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <form onSubmit={handleSalvar}>
          <InputField icon={User} label="Nome completo" placeholder="Ex: Ana Beatriz" />
          <InputField icon={Mail} label="E-mail" type="email" placeholder="Ex: ana@email.com" />

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