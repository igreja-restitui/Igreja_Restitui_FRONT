import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {
  FaPhone,
  FaUser,
  FaSearch,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaFilter,
  FaEllipsisH,
  FaEnvelope,
  FaUserFriends,
} from "react-icons/fa";

const ListMembro = () => {
  // Estado para armazenar a lista de membros
  const [membros, setMembros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados para busca, filtro e ordenação
  const [busca, setBusca] = useState("");
  const [ordenacaoAsc, setOrdenacaoAsc] = useState(true);
  const [filtroGrupo, setFiltroGrupo] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [expandirMembro, setExpandirMembro] = useState(null);
  const [visualizacao, setVisualizacao] = useState("compacta"); // compacta ou detalhada

  // Função para buscar dados da API usando axios
  useEffect(() => {
    const fetchMembros = async () => {
      setCarregando(true);
      try {
        const response = await axios.get("http://localhost:3000/member");

        // Se a resposta for um único objeto, transformamos em array
        const data = response.data;
        const membrosData = Array.isArray(data) ? data : [data];

        // Mapeando os dados da API para o formato usado em nosso componente
        const membrosFormatados = membrosData.map((membro) => ({
          id: membro._id,
          nome: membro.name || "Nome não informado",
          telefone: membro.telefone || "Telefone não informado",
          email: membro.email || "Email não informado",
          grupo: membro.tipo || "Não categorizado",
          status: "Ativo", // Presumindo que todos estão ativos, ajuste conforme necessário
          endereco: membro.endereco,
          data_nascimento: membro.data_nascimento,
        }));

        setMembros(membrosFormatados);
        setErro(null);
      } catch (error) {
        console.error("Erro ao buscar membros:", error);
        setErro(
          "Não foi possível carregar os membros. Por favor, tente novamente mais tarde."
        );
        Navigate("/");
      } finally {
        setCarregando(false);
      }
    };

    fetchMembros();
  }, []);

  // Lista de grupos únicos para o filtro (extraídos dos dados)
  const grupos = [...new Set(membros.map((membro) => membro.grupo))];

  // Função para filtrar os membros
  const membrosFiltrados = membros
    .filter((membro) => {
      // Filtro por busca (nome, telefone ou email)
      const termoBusca = busca.toLowerCase();
      const matchBusca =
        busca === "" ||
        membro.nome.toLowerCase().includes(termoBusca) ||
        membro.telefone.includes(busca) ||
        membro.email.toLowerCase().includes(termoBusca);

      // Filtro por grupo
      const matchGrupo = filtroGrupo === "" || membro.grupo === filtroGrupo;

      // Filtro por status
      const matchStatus = filtroStatus === "" || membro.status === filtroStatus;

      return matchBusca && matchGrupo && matchStatus;
    })
    // Ordenação pelo nome
    .sort((a, b) => {
      if (ordenacaoAsc) {
        return a.nome.localeCompare(b.nome);
      } else {
        return b.nome.localeCompare(a.nome);
      }
    });

  // Função para alternar ordenação
  const alternarOrdenacao = () => {
    setOrdenacaoAsc(!ordenacaoAsc);
  };

  // Função para limpar filtros
  const limparFiltros = () => {
    setBusca("");
    setFiltroGrupo("");
    setFiltroStatus("");
  };

  // Função para alternar visualização do membro
  const toggleExpandirMembro = (id) => {
    if (expandirMembro === id) {
      setExpandirMembro(null);
    } else {
      setExpandirMembro(id);
    }
  };

  // Função para alternar modo de visualização
  const toggleVisualizacao = () => {
    setVisualizacao(visualizacao === "compacta" ? "detalhada" : "compacta");
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 bg-slate-800 text-white">
          <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
            Lista de Membros
          </h1>
          <p className="text-sm sm:text-base text-gray-300">
            Gerenciamento completo dos membros
          </p>
        </div>

        {/* Barra de busca e filtros */}
        <div className="p-3 sm:p-4 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
                placeholder="Buscar por nome, telefone..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={alternarOrdenacao}
                className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                title={ordenacaoAsc ? "Ordenar A-Z" : "Ordenar Z-A"}
              >
                {ordenacaoAsc ? (
                  <FaSortAlphaDown size={18} />
                ) : (
                  <FaSortAlphaUp size={18} />
                )}
              </button>

              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className={`p-2 rounded-lg hover:bg-gray-200 ${
                  mostrarFiltros
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
                title="Filtros"
              >
                <FaFilter size={18} />
              </button>

              <button
                onClick={toggleVisualizacao}
                className={`p-2 rounded-lg hover:bg-gray-200 hidden sm:block ${
                  visualizacao === "detalhada"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
                title={
                  visualizacao === "compacta"
                    ? "Visualização detalhada"
                    : "Visualização compacta"
                }
              >
                <FaEllipsisH size={18} />
              </button>
            </div>
          </div>

          {/* Painel de filtros avançados */}
          {mostrarFiltros && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
                <div className="flex-1 min-w-0 sm:min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filtrar por Grupo
                  </label>
                  <select
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={filtroGrupo}
                    onChange={(e) => setFiltroGrupo(e.target.value)}
                  >
                    <option value="">Todos os grupos</option>
                    {grupos.map((grupo) => (
                      <option key={grupo} value={grupo}>
                        {grupo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-0 sm:min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filtrar por Status
                  </label>
                  <select
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                  >
                    <option value="">Todos os status</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 flex justify-end">
                <button
                  onClick={limparFiltros}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lista de membros */}
        <div className="divide-y divide-gray-200">
          {carregando ? (
            // Estado de carregamento
            <div className="flex justify-center items-center p-6 sm:p-8">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-700"></div>
              <span className="ml-3 text-sm sm:text-base">
                Carregando membros...
              </span>
            </div>
          ) : erro ? (
            // Estado de erro
            <div className="p-6 sm:p-8 text-center text-red-500">
              <p className="mb-2">{erro}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tentar novamente
              </button>
            </div>
          ) : membrosFiltrados.length === 0 ? (
            // Nenhum resultado encontrado
            <div className="p-6 sm:p-8 text-center text-gray-500">
              <FaUser className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mb-2 sm:mb-3" />
              <h3 className="font-medium text-sm sm:text-base">
                Nenhum membro encontrado
              </h3>
              <p className="mt-1 text-xs sm:text-sm">
                Tente ajustar os filtros ou adicione novos membros.
              </p>
              <button
                onClick={limparFiltros}
                className="mt-2 sm:mt-3 text-sm text-blue-600 hover:text-blue-800"
              >
                Limpar todos os filtros
              </button>
            </div>
          ) : (
            // Lista de membros
            membrosFiltrados.map((membro) => (
              <div key={membro.id} className="relative">
                {/* Versão para dispositivos móveis */}
                <div className="sm:hidden">
                  <div
                    className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                    onClick={() => toggleExpandirMembro(membro.id)}
                  >
                    <div className="h-10 w-10 bg-slate-700 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-sm font-medium">
                        {membro.nome.substring(0, 2).toUpperCase()}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 truncate">
                            {membro.nome}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {membro.grupo}
                          </p>
                        </div>
                        <span
                          className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            membro.status === "Ativo"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {membro.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Detalhes expandidos para mobile */}
                  {expandirMembro === membro.id && (
                    <div className="bg-gray-50 p-3 px-4 pl-14">
                      <div className="space-y-2">
                        <a
                          href={`tel:${membro.telefone.replace(/\D/g, "")}`}
                          className="flex items-center text-sm"
                        >
                          <FaPhone className="text-blue-600 mr-2" />
                          <span>{membro.telefone}</span>
                        </a>
                        <a
                          href={`mailto:${membro.email}`}
                          className="flex items-center text-sm"
                        >
                          <FaEnvelope className="text-blue-600 mr-2" />
                          <span className="truncate">{membro.email}</span>
                        </a>
                        <div className="pt-2 flex justify-end">
                          <Link
                            to={`/admin/membros/${membro.id}`}
                            className="px-3 py-1 bg-slate-800 text-white rounded text-xs"
                          >
                            Ver detalhes
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Versão para desktop - Visualização compacta */}
                <Link
                  to={`/admin/membros/${membro.id}`}
                  className={`hidden sm:flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    visualizacao === "compacta" ? "" : "hidden"
                  }`}
                >
                  <div className="h-12 w-12 bg-slate-700 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-lg font-medium">
                      {membro.nome.substring(0, 2).toUpperCase()}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {membro.nome}
                        </h3>
                        <p className="text-sm text-gray-500">{membro.grupo}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          membro.status === "Ativo"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {membro.status}
                      </span>
                    </div>
                  </div>

                  <div className="ml-4 flex items-center text-blue-600">
                    <FaPhone className="mr-2" />
                    <span className="text-sm">{membro.telefone}</span>
                  </div>
                </Link>

                {/* Versão para desktop - Visualização detalhada */}
                <Link
                  to={`/admin/membros/${membro.id}`}
                  className={`hidden ${
                    visualizacao === "detalhada" ? "sm:block" : "sm:hidden"
                  } p-4 hover:bg-gray-50 transition-colors cursor-pointer`}
                >
                  <div className="flex items-center mb-2">
                    <div className="h-12 w-12 bg-slate-700 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-lg font-medium">
                        {membro.nome.substring(0, 2).toUpperCase()}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {membro.nome}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            membro.status === "Ativo"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {membro.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pl-16 grid grid-cols-2 gap-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <FaUserFriends className="text-gray-500 mr-2" />
                      <span>{membro.grupo}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <FaPhone className="text-gray-500 mr-2" />
                      <span>{membro.telefone}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700 col-span-2">
                      <FaEnvelope className="text-gray-500 mr-2" />
                      <span className="truncate">{membro.email}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Rodapé com contagem e botão de adicionar */}
        <div className="p-3 sm:p-4 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <span className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
            Exibindo {membrosFiltrados.length} de {membros.length} membros
          </span>

          <Link
            to="/admin/membros/cadastrar"
            className="w-full sm:w-auto px-4 py-2 bg-slate-800 text-white text-center rounded-lg hover:bg-slate-700 transition-colors order-1 sm:order-2"
          >
            Adicionar Novo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListMembro;
