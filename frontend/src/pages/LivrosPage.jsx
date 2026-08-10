import { useState, useMemo } from "react";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import { BookOpen, User, Tag, Calendar } from "lucide-react";
import { LIVROS_MOCK } from "../data/mockData";

const CATEGORIAS = [
  "Romance",
  "Ficção Científica",
  "Ensaio",
  "Fantasia",
  "Biografia",
  "História",
  "Tecnologia",
  "Aventura",
  "Poesia"
];

export default function LivrosPage() {
  const [livros, setLivros] = useState(LIVROS_MOCK);
  const [busca, setBusca] = useState("");
  
  const [modalAberto, setModalAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  
  const [itemEditando, setItemEditando] = useState(null);
  const [itemExcluindoId, setItemExcluindoId] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ano, setAno] = useState("");

  const filtrados = useMemo(
    () => livros.filter((l) => l.titulo.toLowerCase().includes(busca.toLowerCase())),
    [busca, livros]
  );

  function limparFormulario() {
    setTitulo("");
    setAutor("");
    setCategoria("");
    setAno("");
    setItemEditando(null);
  }

  function handleAbrirCriacao() {
    limparFormulario();
    setModalAberto(true);
  }

  function handleAbrirEdicao(livro) {
    setItemEditando(livro);
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setCategoria(livro.categoria);
    setAno(livro.ano);
    setModalAberto(true);
  }

  function handleAbrirExclusao(id) {
    setItemExcluindoId(id);
    setModalExcluirAberto(true);
  }

  function handleSalvar(e) {
    e.preventDefault();

    if (itemEditando) {
      setLivros((prev) =>
        prev.map((l) =>
          l.id === itemEditando.id
            ? { ...l, titulo, autor, categoria, ano: Number(ano) }
            : l
        )
      );
    } else {
      const novoLivro = {
        id: Date.now(),
        titulo,
        autor,
        categoria,
        ano: Number(ano),
        status: "Disponível",
      };
      setLivros((prev) => [...prev, novoLivro]);
    }

    setModalAberto(false);
    limparFormulario();
  }

  function handleConfirmarExclusao() {
    setLivros((prev) => prev.filter((l) => l.id !== itemExcluindoId));
    setModalExcluirAberto(false);
    setItemExcluindoId(null);
  }

  return (
    <div>
      <SectionHeader title="Gerenciar Livros" buttonLabel="Novo Livro" onButtonClick={handleAbrirCriacao} />
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
                <td className="py-3 px-4">
                  <ActionButtons 
                    onEdit={() => handleAbrirEdicao(l)} 
                    onDelete={() => handleAbrirExclusao(l.id)} 
                  />
                </td>
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

      <Modal 
        title={itemEditando ? "Editar Livro" : "Novo Livro"} 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)}
      >
        <form onSubmit={handleSalvar}>
          <InputField icon={BookOpen} label="Título" placeholder="Ex: Dom Casmurro" value={titulo} onChange={setTitulo} />
          <InputField icon={User} label="Autor" placeholder="Ex: Machado de Assis" value={autor} onChange={setAutor} />

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Categoria</label>
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow bg-white">
              <Tag size={16} className="text-slate-400" />
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
                className="w-full outline-none text-sm text-slate-700 bg-transparent cursor-pointer"
              >
                <option value="" disabled>Selecione uma categoria...</option>
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <InputField icon={Calendar} label="Ano" type="number" placeholder="Ex: 2024" value={ano} onChange={setAno} />

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

      <Modal 
        title="Confirmar Exclusão" 
        isOpen={modalExcluirAberto} 
        onClose={() => setModalExcluirAberto(false)}
      >
        <p className="text-slate-600 text-sm mb-6">
          Tem certeza que deseja excluir este registro? Esta ação não poderá ser desfeita.
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