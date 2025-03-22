import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaArrowLeft,
  FaPen,
  FaTrash,
  FaEllipsisV,
} from "react-icons/fa";

const DetalheMembro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [membro, setMembro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  // Simulação de busca de dados do membro
  useEffect(() => {
    // Aqui você substituiria por uma chamada à API real
    const buscarMembro = async () => {
      try {
        // Simulando delay de rede
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Dados simulados - substituir pela resposta da API
        const membroEncontrado = {
          id: parseInt(id),
          nome: "Ana Silva",
          telefone: "(11) 98765-4321",
          email: "ana.silva@email.com",
          dataNascimento: "15/04/1992",
          endereco: "Rua das Flores, 123 - São Paulo, SP",
          grupo: "Louvor",
          funcao: "Vocalista",
          status: "Ativo",
          dataBatismo: "23/08/2010",
          observacoes:
            "Participa do grupo de louvor aos domingos. Também apoia nas atividades com jovens quando necessário.",
          fotoPerfil: null, // URL da foto seria aqui
        };

        setMembro(membroEncontrado);
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao buscar dados do membro:", error);
        setCarregando(false);
      }
    };

    buscarMembro();
  }, [id]);

  // Função para confirmar exclusão
  const confirmarExclusao = () => {
    setMostrarConfirmacao(true);
    setMenuAberto(false);
  };

  // Função para excluir membro
  const excluirMembro = () => {
    // Aqui você faria a chamada para excluir na API
    console.log("Excluindo membro de ID:", id);

    // Após excluir, redireciona para a lista
    navigate("/admin/membros/listar");
  };

  // Função para cancelar exclusão
  const cancelarExclusao = () => {
    setMostrarConfirmacao(false);
  };

  // Função para alternar o menu de ações em dispositivos móveis
  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  // Renderização durante o carregamento
  if (carregando) {
    return (
      <div className="container mx-auto p-2 sm:p-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700 mb-3"></div>
          <p className="text-gray-600 text-sm sm:text-base">
            Carregando informações do membro...
          </p>
        </div>
      </div>
    );
  }

  // Renderização quando o membro não é encontrado
  if (!membro) {
    return (
      <div className="container mx-auto p-2 sm:p-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 text-center">
          <FaUser className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Membro não encontrado
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
            O membro que você está procurando não existe ou foi removido.
          </p>
          <Link
            to="/admin/membros/listar"
            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-800 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors"
          >
            <FaArrowLeft className="mr-1 sm:mr-2" /> Voltar para a lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 max-w-3xl">
      {/* Modal de confirmação de exclusão */}
      {mostrarConfirmacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
              Confirmar exclusão
            </h3>
            <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">
              Tem certeza que deseja excluir o membro{" "}
              <strong>{membro.nome}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-2 sm:space-x-3">
              <button
                onClick={cancelarExclusao}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={excluirMembro}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cabeçalho com botões de ação */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <Link
          to="/admin/membros/listar"
          className="flex items-center text-slate-600 hover:text-slate-800 text-sm sm:text-base"
        >
          <FaArrowLeft className="mr-1 sm:mr-2 text-xs sm:text-base" /> Voltar
        </Link>

        {/* Botões de ação para desktop */}
        <div className="hidden sm:flex space-x-2">
          <Link
            to={`/admin/membros/editar/${membro.id}`}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center"
          >
            <FaPen className="mr-1 sm:mr-2" /> Editar
          </Link>
          <button
            onClick={confirmarExclusao}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors flex items-center"
          >
            <FaTrash className="mr-1 sm:mr-2" /> Excluir
          </button>
        </div>

        {/* Menu de ações para mobile */}
        <div className="sm:hidden relative">
          <button
            onClick={toggleMenu}
            className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200"
            aria-label="Menu de ações"
          >
            <FaEllipsisV />
          </button>

          {menuAberto && (
            <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg py-1 w-40 z-10">
              <Link
                to={`/admin/membros/editar/${membro.id}`}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaPen className="mr-2 text-blue-600" /> Editar
              </Link>
              <button
                onClick={confirmarExclusao}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaTrash className="mr-2 text-red-600" /> Excluir
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Card com informações do membro */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Cabeçalho do card */}
        <div className="p-4 sm:p-6 bg-slate-800 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center">
            {/* Foto ou iniciais */}
            <div className="flex justify-center sm:justify-start mb-3 sm:mb-0">
              {membro.fotoPerfil ? (
                <img
                  src={membro.fotoPerfil}
                  alt={membro.nome}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold border-4 border-white">
                  {membro.nome.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Nome e status */}
            <div className="text-center sm:text-left sm:ml-4">
              <h1 className="text-xl sm:text-2xl font-bold">{membro.nome}</h1>
              <div className="flex justify-center sm:justify-start mt-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    membro.status === "Ativo"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {membro.status}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs font-medium ml-2">
                  {membro.grupo}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo do card */}
        <div className="p-3 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {/* Informações de contato */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">
                Informações de Contato
              </h2>

              <div className="space-y-2 sm:space-y-3">
                <a
                  href={`tel:${membro.telefone.replace(/\D/g, "")}`}
                  className="flex items-start"
                >
                  <FaPhone className="text-gray-500 mt-1 mr-2 sm:mr-3 text-sm sm:text-base" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Telefone</p>
                    <p className="font-medium text-sm sm:text-base">
                      {membro.telefone}
                    </p>
                  </div>
                </a>

                <a href={`mailto:${membro.email}`} className="flex items-start">
                  <FaEnvelope className="text-gray-500 mt-1 mr-2 sm:mr-3 text-sm sm:text-base" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Email</p>
                    <p className="font-medium text-sm sm:text-base break-all">
                      {membro.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    membro.endereco
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start"
                >
                  <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2 sm:mr-3 text-sm sm:text-base" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Endereço</p>
                    <p className="font-medium text-sm sm:text-base">
                      {membro.endereco}
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Informações da igreja */}
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">
                Informações da Igreja
              </h2>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start">
                  <FaUserFriends className="text-gray-500 mt-1 mr-2 sm:mr-3 text-sm sm:text-base" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Grupo</p>
                    <p className="font-medium text-sm sm:text-base">
                      {membro.grupo}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUser className="text-gray-500 mt-1 mr-2 sm:mr-3 text-sm sm:text-base" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Função</p>
                    <p className="font-medium text-sm sm:text-base">
                      {membro.funcao}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaCalendarAlt className="text-gray-500 mt-1 mr-2 sm:mr-3 text-sm sm:text-base" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Data de Batismo
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {membro.dataBatismo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações pessoais */}
          <div className="mt-4 sm:mt-6 bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">
              Informações Pessoais
            </h2>

            <div className="flex items-start">
              <FaCalendarAlt className="text-gray-500 mt-1 mr-2 sm:mr-3 text-sm sm:text-base" />
              <div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Data de Nascimento
                </p>
                <p className="font-medium text-sm sm:text-base">
                  {membro.dataNascimento}
                </p>
              </div>
            </div>
          </div>

          {/* Observações */}
          {membro.observacoes && (
            <div className="mt-4 sm:mt-6 bg-gray-50 p-3 sm:p-4 rounded-lg">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 border-b pb-2">
                Observações
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">
                {membro.observacoes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalheMembro;
