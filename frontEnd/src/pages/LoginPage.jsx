import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import { DEMO_USUARIO } from "../data/mockData";

export default function LoginPage({ onEntrar, onIrParaRegistro }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (email === DEMO_USUARIO.email && senha === DEMO_USUARIO.senha) {
      setErro("");
      onEntrar();
    } else {
      setErro("E-mail ou senha inválidos.");
    }
  }

  return (
    <AuthLayout>
      <h2 className="text-xl font-bold text-slate-800 mb-1">Entrar</h2>
      <p className="text-sm text-slate-500 mb-6">Acesse sua conta para continuar.</p>

      <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs rounded-lg px-3.5 py-2.5 mb-5">
        Usuário de demonstração: <span className="font-semibold">admin</span> / senha{" "}
        <span className="font-semibold">admin</span>
      </div>

      <form onSubmit={handleSubmit}>
        <InputField icon={Mail} label="E-mail" placeholder="admin" value={email} onChange={setEmail} />
        <InputField icon={Lock} label="Senha" type="password" placeholder="admin" value={senha} onChange={setSenha} />

        {erro && <p className="text-red-600 text-xs font-medium -mt-2 mb-4">{erro}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold py-2.5 rounded-xl mt-2 shadow-sm"
        >
          Entrar
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