import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import { Input } from "./ui/input";
import { Logo } from "./logo";

export type SignUpData = {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
};

const RegisterForm = ({
  onSubmit,
}: {
  onSubmit: (data: SignUpData) => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validação do tamanho da senha
    if (name === "senha" && value.length < 8) {
      setPasswordLengthError("A senha deve ter no mínimo 8 caracteres!");
    } else {
      setPasswordLengthError("");
    }

    // Validação de confirmação de senha
    if (name === "confirmPassword") {
      if (formData.senha !== value) {
        setPasswordError("As senhas não coincidem!");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha.length < 8) {
      setPasswordLengthError("A senha deve ter no mínimo 8 caracteres!");
      return;
    }

    if (formData.senha !== formData.confirmPassword) {
      setPasswordError("As senhas não coincidem!");
      return;
    }

    const { confirmPassword: _, ...dataToSend } = formData;
    setLoading(true);
    onSubmit(dataToSend).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2 bg-gray-100">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 relative md:p-12 pt-0 md:pt-0 w-full max-w-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Logo />
        </div>

        {/* Título */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Criar Conta
        </h2>
        <p className="my-2 text-gray-400 text-center">
          Seja um agente da transformação
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <motion.div className="relative" whileFocus={{ scale: 1.05 }}>
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              disabled={loading}
              type="text"
              name="nome"
              placeholder="Seu Nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
            />
          </motion.div>

          {/* E-mail */}
          <motion.div className="relative" whileFocus={{ scale: 1.05 }}>
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              disabled={loading}
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
            />
          </motion.div>

          {/* Telefone */}
          <motion.div className="relative" whileFocus={{ scale: 1.05 }}>
            <FaPhone className="absolute rotate-90 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              disabled={loading}
              type="tel"
              name="telefone"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
            />
          </motion.div>

          {/* Senha */}
          <motion.div className="relative" whileFocus={{ scale: 1.05 }}>
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              disabled={loading}
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-4 py-3 border ${
                passwordLengthError ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 ${
                passwordLengthError ? "focus:ring-red-500" : "focus:ring-primary"
              } focus:border-primary transition-all outline-none`}
            />
          </motion.div>
          {passwordLengthError && (
            <p className="text-red-500 text-sm -translate-y-3">
              {passwordLengthError}
            </p>
          )}

          {/* Confirmação de senha */}
          <motion.div className="relative" whileFocus={{ scale: 1.05 }}>
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              disabled={loading}
              type="password"
              name="confirmPassword"
              placeholder="Confirme a senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-4 py-3 border ${
                passwordError ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 ${
                passwordError ? "focus:ring-red-500" : "focus:ring-primary"
              } focus:border-primary transition-all outline-none`}
            />
          </motion.div>
          {passwordError && (
            <p className="text-red-500 text-sm -translate-y-3">{passwordError}</p>
          )}

          {/* Botão de Registro */}
          <motion.button
            type="submit"
            disabled={!!passwordError || !!passwordLengthError || loading}
            className={`w-full bg-primary text-white py-3 rounded-lg font-bold text-lg shadow-md transition-all ${
              passwordError || passwordLengthError
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green-400"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            Registrar
          </motion.button>
        </form>

        {/* Link para login */}
        <p className="text-gray-600 text-center mt-4">
          Já tem uma conta?{" "}
          <a href="/login" className="text-primary font-bold hover:underline">
            Faça login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
