import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SistemaPrincipal from "./pages/SistemaPrincipal";

export default function App() {
  // "login" | "registro" | "app"
  // A pessoa 3 substitui onEntrar/onRegistrar pela lógica real de JWT.
  const [tela, setTela] = useState("login");

  if (tela === "login") {
    return <LoginPage onEntrar={() => setTela("app")} onIrParaRegistro={() => setTela("registro")} />;
  }

  if (tela === "registro") {
    return <RegisterPage onRegistrar={() => setTela("app")} onIrParaLogin={() => setTela("login")} />;
  }

  return <SistemaPrincipal onSair={() => setTela("login")} />;
}