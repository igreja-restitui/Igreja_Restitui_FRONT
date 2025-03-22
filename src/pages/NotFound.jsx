import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  // Função para voltar à página anterior
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>

          <h2 className="text-3xl font-bold text-gray-800">
            Página não encontrada
          </h2>
        </div>

        <p className="text-gray-600 mb-8 text-lg">
          Desculpe, a página que você está procurando não existe ou pode ter
          sido movida para outro endereço.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={goBack}
            className="px-5 py-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition duration-300 flex items-center justify-center cursor-pointer"
          >
            <FaArrowLeft className="mr-2" />
            Voltar
          </button>

          <Link
            to="/"
            className="px-5 py-3 bg-[var(--main-color)] text-white rounded-lg shadow hover:bg-[var(--main-dark-color)] transition duration-300 flex items-center justify-center"
          >
            <FaHome className="mr-2" />
            Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
