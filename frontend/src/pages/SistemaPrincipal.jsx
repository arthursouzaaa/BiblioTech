import { useState } from "react";
import { BookOpen, Users, RefreshCcw, LogOut, LayoutDashboard } from "lucide-react";
import DashboardPage from "./DashboardPage";
import LivrosPage from "./LivrosPage";
import UsuariosPage from "./UsuariosPage";
import EmprestimosPage from "./EmprestimosPage";

export default function SistemaPrincipal({ onSair, usuario }) {
  const [pagina, setPagina] = useState("dashboard");
  const isAdmin = usuario?.perfil === "administrador";

  const NAV_ITEMS = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "livros", label: "Livros", icon: BookOpen },
    ...(isAdmin ? [{ key: "usuarios", label: "Usuários", icon: Users }] : []),
    { key: "emprestimos", label: "Empréstimos", icon: RefreshCcw },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-gradient-to-r from-indigo-700 to-blue-800 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <BookOpen size={22} />
            Biblioteca
          </div>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const ativo = pagina === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setPagina(item.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    ativo ? "bg-white text-indigo-700" : "text-indigo-100 hover:bg-white/10"
                  }`}
                >
                  <item.icon size={15} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-white text-sm">
            <span className="font-medium">{usuario?.nome || "Usuário"}</span>
            <button
              onClick={onSair}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {pagina === "dashboard" && <DashboardPage usuario={usuario} />}
        {pagina === "livros" && <LivrosPage usuario={usuario} />}
        {pagina === "usuarios" && isAdmin && <UsuariosPage usuario={usuario} />}
        {pagina === "emprestimos" && <EmprestimosPage usuario={usuario} />}
      </main>
    </div>
  );
}