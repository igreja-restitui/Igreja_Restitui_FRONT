import React from "react";
import { Link } from "react-router-dom";

const ImageBackgroundSection = ({
  backgroundImage,
  title,
  buttonText = "Saiba Mais",
  buttonLink = "/about",
  height = "h-96",
  overlayOpacity = "opacity-50",
  textColor = "text-white",
}) => {
  return (
    <section
      className={`relative ${height} w-full flex items-center justify-center mb-3`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay escuro para melhorar legibilidade do texto */}
      <div className={`absolute inset-0 bg-black ${overlayOpacity}`}></div>

      {/* Conteúdo (Título e Botão) */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h2 className={`text-4xl font-bold mb-6 uppercase ${textColor}`}>
          {title}
        </h2>
        {buttonText && buttonLink && (
          <Link
            to="/about"
            className="inline-block bg-[var(--gold-color)] text-white py-3 px-8 rounded-lg hover:bg-[var(--gold-dark-color)] transition-colors duration-300 uppercase font-bold"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
};

// Exemplo de uso
const ExampleUsage = () => {
  return (
    <div>
      <ImageBackgroundSection
        backgroundImage="https://via.placeholder.com/1920x1080"
        title="Descubra Nossos Produtos"
        buttonText="Ver Mais"
        buttonLink="/produtos"
      />

      {/* Exemplo com altura personalizada e overlay mais escuro */}
      <ImageBackgroundSection
        backgroundImage="https://via.placeholder.com/1920x1080"
        title="Conheça Nossa História"
        buttonText="Saiba Mais"
        buttonLink="/sobre"
        height="h-128"
        overlayOpacity="opacity-70"
      />
    </div>
  );
};

export default ImageBackgroundSection;
