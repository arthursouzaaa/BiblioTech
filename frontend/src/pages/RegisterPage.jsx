// src/pages/RegisterPage.jsx
import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import api from "../api";

export default function RegisterPage({ onRegistrar, onIrParaLogin }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/registro", { nome, email, senha });
      onRegistrar(); // volta para login
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <h2 className="text-xl font-bold text-slate-800 mb-1">Criar conta</h2>
      <p className="text-sm text-slate-500 mb-6">Preencha os dados para se cadastrar.</p>

      <form onSubmit={handleSubmit}>
        <InputField
          icon={User}
          label="Nome completo"
          placeholder="Seu nome"
          value={nome}
          onChange={setNome}
        />
        <InputField
          icon={Mail}
          label="E-mail"
          type="email"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChange={setEmail}
        />
        <InputField
          icon={Lock}
          label="Senha"
          type="password"
          placeholder="••••••••"
          value={senha}
          onChange={setSenha}
        />
        <InputField
          icon={Lock}
          label="Confirmar senha"
          type="password"
          placeholder="••••••••"
          value={confirmarSenha}
          onChange={setConfirmarSenha}
        />

        {erro && <p className="text-red-600 text-xs font-medium -mt-2 mb-4">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors text-white font-semibold py-2.5 rounded-xl mt-2 shadow-sm"
        >
          {loading ? "Cadastrando..." : "Criar conta"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Já tem conta?{" "}
        <button onClick={onIrParaLogin} className="text-indigo-600 font-semibold hover:underline">
          Fazer login
        </button>
      </p>
    </AuthLayout>
  );
}