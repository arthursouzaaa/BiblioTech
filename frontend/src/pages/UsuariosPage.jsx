import { useState, useEffect, useMemo } from "react";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import ActionButtons from "../components/ActionButtons";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import { User, Mail, Lock } from "lucide-react";
import api from "../api";

export default function UsuariosPage({ usuario }) {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);

  const [itemEditando, setItemEditando] = useState(null);
  const [itemExcluindoId, setItemExcluindoId] = useState(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("comum");

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    setLoading(true);
    try {
      const response = await api.get("/api/usuarios");
      setUsuarios(response.data || []);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  }

  const filtrados = useMemo(
    () => usuarios.filter((u) => u.nome.toLowerCase().includes(busca.toLowerCase())),
    [busca, usuarios]
  );

  function limparFormulario() {
    setNome("");
    setEmail("");
    setSenha("");
    setPerfil("comum");
    setItemEditando(null);
  }

  function handleAbrirCriacao() {
    limparFormulario();
    setModalAberto(true);
  }

  function handleAbrirEdicao(u) {
    setItemEditando(u);
    setNome(u.nome);
    setEmail(u.email);
    setSenha("");
    setPerfil(u.perfil || "comum");
    setModalAberto(true);
  }

  function handleAbrirExclusao(id) {
    setItemExcluindoId(id);
    setModalExcluirAberto(true);
  }

  async function handleSalvar(e) {
    e.preventDefault();
    const dados = { nome, email, perfil };
    if (senha) dados.senha = senha;

    try {
      if (itemEditando) {
        await api.put(`/api/usuario/editar/${itemEditando.id}`, dados);
      } else {
        await api.post("/api/usuario", dados);
      }
      await carregarUsuarios();
      setModalAberto(false);
      limparFormulario();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar. Verifique os dados.");
    }
  }

  async function handleConfirmarExclusao() {
    try {
      await api.delete(`/api/usuario/${itemExcluindoId}`);
      await carregarUsuarios();
      setModalExcluirAberto(false);
      setItemExcluindoId(null);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir.");
    }
  }

  return (
    <div>
      <SectionHeader
        title="Gerenciar Usuários"
        buttonLabel="Novo Usuário"
        onButtonClick={handleAbrirCriacao}
      />
      <SearchBar
        value={busca}
        onChange={setBusca}
        placeholder="Buscar por nome..."
      />

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mt-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white text-left">
              <th className="py-3 px-4 font-semibold">Nome</th>
              <th className="py-3 px-4 font-semibold">E-mail</th>
              <th className="py-3 px-4 font-semibold">Perfil</th>
              <th className="py-3 px-4 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-400">
                  Carregando...
                </td>
              </tr>
            ) : (
              filtrados.map((u, i) => (
                <tr key={u.id} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="py-3 px-4 text-slate-700 font-medium">{u.nome}</td>
                  <td className="py-3 px-4 text-slate-700">{u.email}</td>
                  <td className="py-3 px-4 text-slate-700">{u.perfil || "comum"}</td>
                  <td className="py-3 px-4">
                    <ActionButtons
                      onEdit={() => handleAbrirEdicao(u)}
                      onDelete={() => handleAbrirExclusao(u.id)}
                    />
                  </td>
                </tr>
              ))
            )}
            {!loading && filtrados.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-400">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Criação/Edição */}
      <Modal
        title={itemEditando ? "Editar Usuário" : "Novo Usuário"}
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      >
        <form onSubmit={handleSalvar}>
          <InputField
            icon={User}
            label="Nome completo"
            placeholder="Ex: Ana Beatriz"
            value={nome}
            onChange={setNome}
          />
          <InputField
            icon={Mail}
            label="E-mail"
            type="email"
            placeholder="Ex: ana@email.com"
            value={email}
            onChange={setEmail}
          />
          <InputField
            icon={Lock}
            label="Senha"
            type="password"
            placeholder={itemEditando ? "Deixe em branco para manter" : "••••••••"}
            value={senha}
            onChange={setSenha}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Perfil
            </label>
            <select
              value={perfil}
              onChange={(e) => setPerfil(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="comum">Comum</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>

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

      {/* Modal de Exclusão */}
      <Modal
        title="Confirmar Exclusão"
        isOpen={modalExcluirAberto}
        onClose={() => setModalExcluirAberto(false)}
      >
        <p className="text-slate-600 text-sm mb-6">
          Tem certeza que deseja excluir este usuário? Esta ação não poderá ser desfeita.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setModalExcluirAberto(false)}
            className="flex-1 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmarExclusao}
            className="flex-1 bg-red-600 hover:bg-red-500 transition-colors text-white font-semibold py-2.5 rounded-xl"
          >
            Excluir
          </button>
        </div>
      </Modal>
    </div>
  );
}