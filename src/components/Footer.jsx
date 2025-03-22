import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = ({
  logoSrc = "../../images/logo-white.png",
  igreja = "Igreja Restitui",
  endereco = "Av. Vereador José Aleixo, 605, JD. Ferri",
  cidade = "Vargem Grande do Sul - SP",
  telefone = "(19) 99704-9669",
  email = "pastoral@igrejarestitui.com.br",
  facebook = "https://www.facebook.com/ierestitui",
  instagram = "https://www.instagram.com/ie.restituioficial/",
  youtube = "https://www.youtube.com/@ierestituioficial",
  copyright = "© 2025 Igreja Evangélica Restitui. Todos os direitos reservados.",
}) => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1 - Logo e Informações da Igreja */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logoSrc} alt={igreja} className="h-24 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-center md:text-left uppercase">
              {igreja}
            </h3>
            <p className="text-gray-400 text-center md:text-left ">
              Proclamando o amor de Cristo e transformando vidas através da fé e
              comunhão.
            </p>
          </div>

          {/* Coluna 2 - Contato */}
          <div className="mt-6 md:mt-0">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 text-center md:text-left">
              Contato
            </h3>
            <ul className="space-y-3 ">
              <li className="flex items-start justify-center md:justify-start">
                <FaMapMarkerAlt className="text-[var(--gold-color)] mt-1 mr-2 flex-shrink-0" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${endereco}, ${cidade}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--gold-dark-color)] transition-colors"
                >
                  <div className="text-center md:text-left">
                    <p className="mb-0.5">{endereco}</p>
                    <p className="mb-0.5">{cidade}</p>
                  </div>
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaPhone className="text-[var(--gold-color)] mr-2 flex-shrink-0" />{" "}
                / &nbsp;
                <FaWhatsapp
                  size={18}
                  className="text-green-500 mr-2 flex-shrink-0"
                />
                <span>{telefone}</span>
              </li>

              <li className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="text-[var(--gold-color)] mr-2 flex-shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-[var(--gold-dark-color)]"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Horários e Redes Sociais */}
          <div className="mt-6 md:mt-0 text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 text-center md:text-left">
              Horários
            </h3>
            <ul className="mb-6 space-y-1">
              <li className=" px-8 md:px-0">
                <span>Domingo às 9h e às 18h</span>
              </li>
              <li className=" px-8 md:px-0">
                <span>Terça-feira às 20h</span>
              </li>
              <li className=" px-8 md:px-0">
                <span>Quinta-feira às 20h</span>
              </li>
            </ul>

            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 text-center md:text-left">
              Redes Sociais
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href={youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="https://wa.me/5519997049669?text=Ol%C3%A1%2C%20vim%20pelo%20site!%20"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <hr className="my-8 border-gray-700" />

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
