import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import api from "../api";

export default function LoginPage({ onLogin, onIrParaRegistro }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const response = await api.post("/api/login", { email, senha });
      const { token, usuario } = response.data;
      onLogin(token, usuario);
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <h2 className="text-xl font-bold text-slate-800 mb-1">Entrar</h2>
      <p className="text-sm text-slate-500 mb-6">Acesse sua conta para continuar.</p>

      <form onSubmit={handleSubmit}>
        <InputField
          icon={Mail}
          label="E-mail"
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

        {erro && <p className="text-red-600 text-xs font-medium -mt-2 mb-4">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors text-white font-semibold py-2.5 rounded-xl mt-2 shadow-sm"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Ainda não tem conta?{" "}
        <button onClick={onIrParaRegistro} className="text-indigo-600 font-semibold hover:underline">
          Criar conta
        </button>
      </p>
    </AuthLayout>
  );
}