import React, { useState, useEffect } from "react";

const EventosCarrossel = ({
  eventos = [
    {
      id: 1,
      titulo: "Culto de Adoração",
      imagem: "../../images/sobre-nos.jpg",
      descricao: "Venha participar do nosso culto dominical",
      botaoTexto: "Saiba mais",
      botaoLink: "/eventos/culto",
    },
    {
      id: 2,
      titulo: "Encontro de Jovens",
      imagem: "../../images/sobre-nos.jpg",
      descricao: "Um tempo especial para os jovens da igreja",
      botaoTexto: "Inscreva-se",
      botaoLink: "/eventos/jovens",
    },
    {
      id: 3,
      titulo: "Batismo",
      imagem: "../../images/batismo.png",
      descricao: "Assista ao vídeo do batismo",
      botaoTexto: "Assistir",
      botaoLink: "https://youtu.be/dxl_RTbugyY?si=Zt_qiQg7CiU2haua",
    },
  ],
  titulo = "Próximos Eventos",
  textColor = "text-white",
  itemsVisivelDesktop = 3,
  autoPlay = true,
  intervalo = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar no carregamento inicial
    checkIfMobile();

    // Adicionar listener para mudanças de tamanho da tela
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Calcular itemsVisivel com base no dispositivo
  const itemsVisivel = isMobile ? 1 : itemsVisivelDesktop;

  const totalSlides = Math.ceil(eventos.length / itemsVisivel);

  // Função para navegar para o próximo slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Função para navegar para o slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  // Auto play effect
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, intervalo);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, intervalo]);

  // Calcula os eventos visíveis no momento
  const eventosVisiveis = eventos.slice(
    currentIndex * itemsVisivel,
    currentIndex * itemsVisivel + itemsVisivel
  );

  return (
    <section className="py-12 bg-[var(--main-color)] mb-3">
      <div className="container mx-auto px-4">
        <h2
          className={`text-4xl font-bold mb-10 text-center uppercase ${textColor}`}
        >
          {titulo}
        </h2>

        <div className="relative">
          {/* Botões de navegação - Visíveis apenas em desktop */}
          {!isMobile && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 p-2 rounded-full shadow-lg hover:bg-opacity-70 hidden md:block cursor-pointer"
                aria-label="Anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 p-2 rounded-full shadow-lg hover:bg-opacity-70 hidden md:block cursor-pointer"
                aria-label="Próximo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Cards de eventos */}
          <div className="flex gap-6 justify-center transition-all duration-500 px-8">
            {eventosVisiveis.map((evento) => (
              <div
                key={evento.id}
                className="w-full md:w-1/3 bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 max-w-sm mx-auto"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={evento.imagem}
                    alt={evento.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {evento.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4">{evento.descricao}</p>

                  <a
                    href={evento.botaoLink}
                    className="inline-block bg-[var(--gold-color)] text-white py-2 px-6 rounded-lg hover:bg-[var(--gold-dark-color)] transition-colors duration-300 uppercase font-bold text-sm"
                    target="_blank"
                  >
                    {evento.botaoTexto}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores de slide */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-[var(--gold-color)] w-6"
                    : "bg-gray-300"
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventosCarrossel;
