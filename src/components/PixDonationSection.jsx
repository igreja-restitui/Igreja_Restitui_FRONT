import React from "react";

const PixDonationSection = ({
  title = "Faça sua Doação via PIX",
  description = "Se você deseja cooperar com o resgate de vidas e ajudar a obra do Senhor a continuar crescendo, clique no botão abaixo",
  buttonText = "Faça sua doação",
  buttonLink = "/pix",
  height = "h-96",
  overlayOpacity = "opacity-50",
  textColor = "text-white",
}) => {
  return (
    <section
      className={`relative ${height} w-full flex items-center justify-center bg-[var(--main-color)] mb-3`}
    >
      {/* Overlay escuro para melhorar legibilidade do texto */}
      <div className={`absolute inset-0 bg-black ${overlayOpacity}`}></div>

      {/* Conteúdo (Título e Botão) */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h2 className={`text-4xl font-bold mb-6 uppercase ${textColor}`}>
          {title}
        </h2>
        <p className={`${textColor} mb-6 text-center `}>{description}</p>

        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="inline-block bg-[var(--gold-color)] text-white py-3 px-8 rounded-lg hover:bg-[var(--gold-dark-color)] transition-colors duration-300 uppercase font-bold"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
};

export default PixDonationSection;
