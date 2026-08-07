import { User, Mail, Lock } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";

export default function RegisterPage({ onRegistrar, onIrParaLogin }) {
  return (
    <AuthLayout>
      <h2 className="text-xl font-bold text-slate-800 mb-1">Criar conta</h2>
      <p className="text-sm text-slate-500 mb-6">Preencha os dados para se cadastrar.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onRegistrar();
        }}
      >
        <InputField icon={User} label="Nome completo" placeholder="Seu nome" />
        <InputField icon={Mail} label="E-mail" type="email" placeholder="seuemail@exemplo.com" />
        <InputField icon={Lock} label="Senha" type="password" placeholder="••••••••" />
        <InputField icon={Lock} label="Confirmar senha" type="password" placeholder="••••••••" />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold py-2.5 rounded-xl mt-2 shadow-sm"
        >
          Criar conta
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