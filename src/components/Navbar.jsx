import React from "react";
import { FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const endereco = "Avenida Vereador José Aleixo, 605 - Jardim Ferri";
  const mapsUrl = "https://maps.app.goo.gl/SjUQoyAJCkWR5Q6T9";

  return (
    <div className="navbar-container">
      <nav className="bg-[var(--main-color)] shadow-md py-6 px-6 flex items-center justify-between relative">
        {/* Logo Centralizada */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link to="/">
            <img src="/icon-white.png" alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Espaço esquerdo para evitar desalinhamento */}
        <div className="w-10"></div>

        {/* Login à direita */}
        <Link
          to="/login"
          className="flex items-center gap-2 text-white hover:text-[var(--gold-color)] transition"
        >
          <FaUserCircle size={30} />
          <span className="text-lg font-medium">Login</span>
        </Link>
      </nav>

      {/* Apêndice para o endereço com link para o Google Maps */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-100 py-2 px-6 text-center text-gray-700 text-sm flex items-center justify-center shadow-sm hover:bg-gray-200 transition-colors "
      >
        <FaMapMarkerAlt className="text-[var(--gold-color)] mr-2" />
        <span>
          {endereco} <br />
        </span>
      </a>
    </div>
  );
};

export default Navbar;
