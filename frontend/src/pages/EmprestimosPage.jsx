import { useState, useEffect, useMemo } from "react";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import { Calendar } from "lucide-react";
import api from "../api";

export default function EmprestimosPage({ usuario }) {
  const [emprestimos, setEmprestimos] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);
  const [itemExcluindoId, setItemExcluindoId] = useState(null);
  const [livroId, setLivroId] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [dataEmprestimo, setDataEmprestimo] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [status, setStatus] = useState("Ativo");
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const isAdmin = usuario?.perfil === "administrador";

  useEffect(() => {
    carregarEmprestimos();
    carregarLivros();
    // Só carrega usuários se for admin, para não dar 403
    if (isAdmin) carregarUsuarios();
  }, [isAdmin]);

  async function carregarEmprestimos() {
    setLoading(true);
    try {
      const response = await api.get("/api/emprestimos"); // ✅ Prefixo /api
      setEmprestimos(response.data || []);
    } catch (error) {
      console.error("Erro ao carregar empréstimos:", error);
    } finally { setLoading(false); }
  }

  async function carregarLivros() {
    try {
      const response = await api.get("/api/livros"); // ✅ Prefixo /api
      setLivros(response.data || []);
    } catch (error) { console.error("Erro ao carregar livros:", error); }
  }

  async function carregarUsuarios() {
    try {
      const response = await api.get("/api/usuarios"); // ✅ Prefixo /api
      setUsuarios(response.data || []);
    } catch (error) { console.error("Erro ao carregar usuários:", error); }
  }

  const filtrados = useMemo(() => emprestimos.filter((e) => e.livro_titulo?.toLowerCase().includes(busca.toLowerCase()) || e.usuario_nome?.toLowerCase().includes(busca.toLowerCase())), [busca, emprestimos]);

  function limparFormulario() {
    setLivroId(""); setUsuarioId(""); setDataEmprestimo(""); setDataDevolucao(""); setStatus("Ativo"); setItemEditando(null);
  }

  function handleAbrirCriacao() { if (!isAdmin) return; limparFormulario(); setModalAberto(true); }
  function handleAbrirEdicao(emprestimo) {
    setItemEditando(emprestimo);
    setLivroId(String(emprestimo.livro_id));
    setUsuarioId(String(emprestimo.usuario_id));
    setDataEmprestimo(emprestimo.data_emprestimo);
    setDataDevolucao(emprestimo.data_devolucao);
    setStatus(emprestimo.status);
    setModalAberto(true);
  }
  function handleAbrirExclusao(id) { setItemExcluindoId(id); setModalExcluirAberto(true); }

  async function handleSalvar(e) {
    e.preventDefault();
    const dados = { livro_id: Number(livroId), usuario_id: Number(usuarioId), data_emprestimo: dataEmprestimo, data_devolucao: dataDevolucao, status };
    try {
      if (itemEditando) {
        await api.put(`/api/emprestimo/editar/${itemEditando.id}`, dados);
      } else {
        await api.post("/api/emprestimo", dados);
      }
      await carregarEmprestimos();
      setModalAberto(false);
      limparFormulario();
    } catch (error) { console.error("Erro ao salvar empréstimo:", error); alert("Erro ao salvar. Verifique os dados."); }
  }

  async function handleConfirmarExclusao() {
    try {
      await api.delete(`/api/emprestimo/${itemExcluindoId}`);
      await carregarEmprestimos();
      setModalExcluirAberto(false);
      setItemExcluindoId(null);
    } catch (error) { console.error("Erro ao excluir empréstimo:", error); alert("Erro ao excluir."); }
  }

  return (
    <div>
      <SectionHeader title="Gerenciar Empréstimos" buttonLabel={isAdmin ? "Novo Empréstimo" : null} onButtonClick={handleAbrirCriacao} />
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
            {loading ? (
              <tr><td colSpan={6} className="py-6 text-center text-slate-400">Carregando...</td></tr>
            ) : (
              filtrados.map((e, i) => (
                <tr key={e.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="py-3 px-4 text-slate-700 font-medium">{e.livro_titulo}</td>
                  <td className="py-3 px-4 text-slate-700">{e.usuario_nome}</td>
                  <td className="py-3 px-4 text-slate-700">{new Date(e.data_emprestimo).toLocaleDateString('pt-BR')}</td>
                  <td className="py-3 px-4 text-slate-700">{new Date(e.data_devolucao).toLocaleDateString('pt-BR')}</td>
                  <td className="py-3 px-4"><StatusBadge status={e.status} /></td>
                  <td className="py-3 px-4">
                    {isAdmin ? (
                      <ActionButtons onEdit={() => handleAbrirEdicao(e)} onDelete={() => handleAbrirExclusao(e.id)} />
                    ) : (
                      <ActionButtons onDelete={() => handleAbrirExclusao(e.id)} />
                    )}
                  </td>
                </tr>
              ))
            )}
            {!loading && filtrados.length === 0 && (<tr><td colSpan={6} className="py-6 text-center text-slate-400">Nenhum empréstimo encontrado.</td></tr>)}
          </tbody>
        </table>
      </div>
      <Modal title={itemEditando ? "Editar Empréstimo" : "Novo Empréstimo"} isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <form onSubmit={handleSalvar}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Livro</label>
            <select value={livroId} onChange={(e) => setLivroId(e.target.value)} required className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white">
              <option value="">Selecione um livro...</option>
              {livros.map((l) => <option key={l.id} value={l.id}>{l.titulo}</option>)}
            </select>
          </div>
          {isAdmin ? (
             <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Usuário</label>
              <select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} required className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white">
                <option value="">Selecione um usuário...</option>
                {usuarios.map((u) => <option key={u.id} value={u.id}>{u.nome}</option>)}
              </select>
            </div>
          ) : null}
          <InputField icon={Calendar} label="Data do empréstimo" type="date" value={dataEmprestimo} onChange={setDataEmprestimo} />
          <InputField icon={Calendar} label="Data de devolução" type="date" value={dataDevolucao} onChange={setDataDevolucao} />
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setModalAberto(false)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors">Cancelar</button>
            <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold py-2.5 rounded-xl">Salvar</button>
          </div>
        </form>
      </Modal>
      <Modal title="Confirmar Devolução/Exclusão" isOpen={modalExcluirAberto} onClose={() => setModalExcluirAberto(false)}>
        <p className="text-slate-600 text-sm mb-6">Tem certeza que deseja devolver este livro?</p>
        <div className="flex gap-3">
          <button type="button" onClick={() => setModalExcluirAberto(false)} className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors">Cancelar</button>
          <button type="button" onClick={handleConfirmarExclusao} className="flex-1 bg-red-600 hover:bg-red-500 transition-colors text-white font-semibold py-2.5 rounded-xl">Devolver</button>
        </div>
      </Modal>
    </div>
  );
}