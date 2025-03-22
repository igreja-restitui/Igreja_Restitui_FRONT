import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
  // Simulação de usuário logado - isso viria do seu contexto de autenticação
  const usuario = {
    nome: "João Silva",
    role: "Administrador",
  };

  const endereco = "Avenida Vereador José Aleixo, 605 - Jardim Ferri";
  const mapsUrl = "https://maps.app.goo.gl/SjUQoyAJCkWR5Q6T9";

  const [membrosDropdownOpen, setMembrosDropdownOpen] = useState(false);
  const [gruposDropdownOpen, setGruposDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se está em dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleMembrosDropdown = () => {
    setMembrosDropdownOpen(!membrosDropdownOpen);
    if (gruposDropdownOpen) setGruposDropdownOpen(false);
    if (userDropdownOpen) setUserDropdownOpen(false);
  };

  const toggleGruposDropdown = () => {
    setGruposDropdownOpen(!gruposDropdownOpen);
    if (membrosDropdownOpen) setMembrosDropdownOpen(false);
    if (userDropdownOpen) setUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    if (membrosDropdownOpen) setMembrosDropdownOpen(false);
    if (gruposDropdownOpen) setGruposDropdownOpen(false);
  };

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const closeSideMenu = () => {
    setSideMenuOpen(false);
  };

  return (
    <div className="navbar-container">
      <nav className="bg-slate-800 shadow-md py-6 px-6 flex items-center justify-between relative">
        {/* Menu para desktop */}
        {!isMobile && (
          <div className="flex items-center space-x-8">
            {/* Dropdown Membros */}
            <div className="relative">
              <button
                onClick={toggleMembrosDropdown}
                className="flex items-center text-white hover:text-[var(--gold-color)] transition font-medium"
              >
                MEMBROS <FaChevronDown className="ml-1" size={12} />
              </button>

              {membrosDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-36 bg-white shadow-lg rounded-md py-2 z-10">
                  <Link
                    to="/admin/membros/listar"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Listar
                  </Link>
                  <Link
                    to="/admin/membros/cadastrar"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>

            {/* Dropdown Grupos */}
            <div className="relative">
              <button
                onClick={toggleGruposDropdown}
                className="flex items-center text-white hover:text-[var(--gold-color)] transition font-medium"
              >
                GRUPOS <FaChevronDown className="ml-1" size={12} />
              </button>

              {gruposDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-36 bg-white shadow-lg rounded-md py-2 z-10">
                  <Link
                    to="/admin/grupos/listar"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Listar
                  </Link>
                  <Link
                    to="/admin/grupos/cadastrar"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ícone de menu hambúrguer para mobile */}
        {isMobile && (
          <button
            onClick={toggleSideMenu}
            className="text-white hover:text-[var(--gold-color)] transition"
          >
            <FaBars size={24} />
          </button>
        )}

        {/* Informação de usuário com dropdown */}
        <div className="relative">
          <button
            onClick={toggleUserDropdown}
            className="flex items-center gap-2 text-white hover:text-[var(--gold-color)] transition"
          >
            <FaUserCircle size={isMobile ? 24 : 30} />
            <div className="flex flex-col items-start">
              <span
                className={`${isMobile ? "text-sm" : "text-base"} font-medium`}
              >
                {usuario.nome}
              </span>
              <span
                className={`${isMobile ? "text-xs" : "text-sm"} text-gray-300`}
              >
                {usuario.role}
              </span>
            </div>
            <FaChevronDown className="ml-1" size={12} />
          </button>

          {userDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-36 bg-white shadow-lg rounded-md py-2 z-10">
              <Link
                to="/logout"
                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                <FaSignOutAlt className="mr-2" />
                Sair
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Menu lateral para dispositivos móveis */}
      {isMobile && (
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-slate-800 z-50 transform ${
            sideMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            {/* Cabeçalho com botão de fechar */}
            <div className="p-4 flex justify-end">
              <button
                onClick={closeSideMenu}
                className="text-white hover:text-[var(--gold-color)] transition"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Informações do usuário no topo */}
            <div className="p-6 pt-0 pb-6 border-b border-gray-700">
              <div className="flex items-center">
                <FaUserCircle size={48} className="text-white mr-4" />
                <div>
                  <h3 className="text-white font-medium text-lg">
                    {usuario.nome}
                  </h3>
                  <p className="text-gray-300">{usuario.role}</p>
                </div>
              </div>

              {/* Botão de sair */}
              <Link
                to="/logout"
                className="flex items-center gap-2 text-white hover:text-[var(--gold-color)] transition mt-4 bg-slate-700 p-2 rounded"
                onClick={closeSideMenu}
              >
                <FaSignOutAlt size={16} />
                <span>Sair</span>
              </Link>
            </div>

            {/* Itens do menu lateral */}
            <div className="p-6 space-y-6 overflow-y-auto flex-grow">
              {/* Membros */}
              <div>
                <button
                  onClick={toggleMembrosDropdown}
                  className="flex items-center text-white hover:text-[var(--gold-color)] transition font-medium w-full justify-between"
                >
                  <span>MEMBROS</span>{" "}
                  <FaChevronDown
                    className={`transition-transform ${
                      membrosDropdownOpen ? "rotate-180" : ""
                    }`}
                    size={12}
                  />
                </button>

                {membrosDropdownOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link
                      to="/admin/membros/listar"
                      className="block py-2 text-gray-300 hover:text-[var(--gold-color)]"
                      onClick={closeSideMenu}
                    >
                      Listar
                    </Link>
                    <Link
                      to="/admin/membros/cadastrar"
                      className="block py-2 text-gray-300 hover:text-[var(--gold-color)]"
                      onClick={closeSideMenu}
                    >
                      Cadastrar
                    </Link>
                  </div>
                )}
              </div>

              {/* Grupos */}
              <div>
                <button
                  onClick={toggleGruposDropdown}
                  className="flex items-center text-white hover:text-[var(--gold-color)] transition font-medium w-full justify-between"
                >
                  <span>GRUPOS</span>{" "}
                  <FaChevronDown
                    className={`transition-transform ${
                      gruposDropdownOpen ? "rotate-180" : ""
                    }`}
                    size={12}
                  />
                </button>

                {gruposDropdownOpen && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link
                      to="/admin/grupos/listar"
                      className="block py-2 text-gray-300 hover:text-[var(--gold-color)]"
                      onClick={closeSideMenu}
                    >
                      Listar
                    </Link>
                    <Link
                      to="/admin/grupos/cadastrar"
                      className="block py-2 text-gray-300 hover:text-[var(--gold-color)]"
                      onClick={closeSideMenu}
                    >
                      Cadastrar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay escuro quando o menu lateral está aberto */}
      {sideMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSideMenu}
        ></div>
      )}
    </div>
  );
};

export default NavbarAdmin;
