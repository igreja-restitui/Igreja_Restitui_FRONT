import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Importando o hook useNavigate
import api from "../../services/api";
import {
  FaEnvelope,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const FormCadMembro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Inicializando o hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      console.log("Enviando dados:", data);

      // Recuperando o token de autenticação do localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("Você precisa estar autenticado. Redirecionando para o login...");
        navigate("/login"); // Redirecionar para a página de login se não houver token
        return;
      }

      // Configurando o cabeçalho de autorização com o token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Formato comum para tokens JWT
        },
      };

      // Usando a instância api centralizada para fazer POST para /member com o token
      const response = await api.post("/member", data, config);

      console.log("Resposta do servidor:", response.data);

      // Exibir mensagem de sucesso
      alert("Cadastro realizado com sucesso!");

      // Redirecionar após o cadastro
      navigate("/admin/membros/listar");
    } catch (error) {
      // Verificar se o erro é de autenticação (401 Unauthorized)
      if (error.response && error.response.status === 401) {
        alert("Sessão expirada ou inválida. Por favor, faça login novamente.");
        navigate("/login");
        return;
      }

      const errorMessage =
        error.response?.data?.message || "Erro ao realizar cadastro";
      alert(errorMessage);
      console.error("Erro no cadastro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--main-color)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          {/* Logo - substitua pelo seu próprio componente ou imagem */}
          <div className="flex justify-center mb-4">
            <img
              src="/images/logo-cor.png"
              alt="Logo Igreja Evangélica Restitui"
              className="h-24 w-auto"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Cadastro de Membro
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md -space-y-px">
            {/* Campo Nome */}
            <div className="mb-4">
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Nome é obrigatório",
                    minLength: {
                      value: 3,
                      message: "Nome deve ter pelo menos 3 caracteres",
                    },
                  })}
                  className={`appearance-none rounded-lg relative block w-full pl-10 py-3 px-4 border ${
                    errors.nome ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-[var(--main-color)]`}
                  placeholder="João da Silva"
                />
              </div>
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.nome.message}
                </p>
              )}
            </div>

            {/* Campo Telefone */}
            <div className="mb-4">
              <label
                htmlFor="telefone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Telefone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="telefone"
                  type="tel"
                  {...register("telefone", {
                    required: "Telefone é obrigatório",
                  })}
                  className={`appearance-none rounded-lg relative block w-full pl-10 py-3 px-4 border ${
                    errors.telefone ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-[var(--main-color)]`}
                  placeholder="(99) 99999-9999"
                />
              </div>
              {errors.telefone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.telefone.message}
                </p>
              )}
            </div>

            {/* Campo Data de Nascimento */}
            <div className="mb-4">
              <label
                htmlFor="dataNascimento"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Data de Nascimento
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="data_nascimento"
                  type="date"
                  {...register("data_nascimento", {
                    required: "Data de nascimento é obrigatória",
                  })}
                  className={`appearance-none rounded-lg relative block w-full pl-10 py-3 px-4 border ${
                    errors.dataNascimento ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-[var(--main-color)]`}
                />
              </div>
              {errors.dataNascimento && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dataNascimento.message}
                </p>
              )}
            </div>

            {/* Campo Endereço */}
            <div className="mb-4">
              <label
                htmlFor="endereco"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Endereço
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="endereco"
                  type="text"
                  {...register("endereco", {
                    required: "Endereço é obrigatório",
                  })}
                  className={`appearance-none rounded-lg relative block w-full pl-10 py-3 px-4 border ${
                    errors.endereco ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-[var(--main-color)]`}
                  placeholder="Rua Exemplo, 123 - Bairro"
                />
              </div>
              {errors.endereco && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.endereco.message}
                </p>
              )}
            </div>

            {/* Campo Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Endereço de e-mail inválido",
                    },
                  })}
                  className={`appearance-none rounded-lg relative block w-full pl-10 py-3 px-4 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-[var(--main-color)]`}
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo Gênero (Select) */}
            {/* <div className="mb-4">
              <label
                htmlFor="genero"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gênero
              </label>
              <select
                id="genero"
                {...register("genero", {
                  required: "Selecione o gênero",
                })}
                className={`appearance-none rounded-lg relative block w-full py-3 px-4 border ${
                  errors.genero ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-[var(--main-color)]`}
              >
                <option value="">Selecione...</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
              {errors.genero && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.genero.message}
                </p>
              )}
            </div> */}

            {/* Campo Tipo (Membro/Visitante) */}
            <div className="mb-4">
              <label
                htmlFor="tipo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Categoria
              </label>
              <select
                id="tipo"
                {...register("tipo", {
                  required: "Selecione a categoria",
                })}
                className={`appearance-none rounded-lg relative block w-full py-3 px-4 border ${
                  errors.tipo ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--main-color)] focus:border-[var(--main-color)]`}
              >
                <option value="">Selecione...</option>
                <option value="membro">Membro</option>
                <option value="visitante">Visitante</option>
              </select>
              {errors.tipo && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.tipo.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isLoading
                  ? "bg-gray-400"
                  : "bg-[var(--main-color)] hover:bg-[var(--main-dark-color)]"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--main-color)] transition-colors duration-300`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Cadastrando...
                </span>
              ) : (
                "Cadastrar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCadMembro;
