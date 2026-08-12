import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SistemaPrincipal from "./pages/SistemaPrincipal";
import api from "./api";

export default function App() {
  const [tela, setTela] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [usuario, setUsuario] = useState(() => {
    const saved = localStorage.getItem("usuario");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (token && usuario) {
      setTela("app");
    }
  }, [token, usuario]);

  const handleLogin = (tokenRecebido, usuarioRecebido) => {
    localStorage.setItem("token", tokenRecebido);
    localStorage.setItem("usuario", JSON.stringify(usuarioRecebido));
    setToken(tokenRecebido);
    setUsuario(usuarioRecebido);
    setTela("app");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
    setTela("login");
  };

  if (tela === "login") {
    return <LoginPage onLogin={handleLogin} onIrParaRegistro={() => setTela("registro")} />;
  }

  if (tela === "registro") {
    return <RegisterPage onRegistrar={() => setTela("login")} onIrParaLogin={() => setTela("login")} />;
  }

  return <SistemaPrincipal onSair={handleLogout} usuario={usuario} />;
}