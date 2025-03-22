import React from "react";
import {
  FaChurch,
  FaUsers,
  FaHandHoldingHeart,
  FaGlobe,
  FaHome,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  // Array de eventos da linha do tempo
  const timelineEvents = [
    {
      year: "2005",
      title: "Fundação da Igreja",
      description:
        "A Igreja Evangélica Restitui foi fundada com apenas 15 membros, reunindo-se inicialmente em uma pequena sala alugada no centro da cidade.",
      icon: <FaChurch />,
      image: "/images/timeline/fundacao.jpg",
    },
    {
      year: "2010",
      title: "Primeiro Templo",
      description:
        "Após anos de dedicação e contribuições da comunidade, conseguimos construir nosso primeiro templo próprio, um marco importante em nossa história.",
      icon: <FaHome />,
      image: "/images/timeline/templo.jpg",
    },
    {
      year: "2015",
      title: "Início do Trabalho Comunitário",
      description:
        "Começamos nossos projetos sociais voltados para a comunidade local, oferecendo alimentos, roupas e auxílio para famílias em situação de vulnerabilidade.",
      icon: <FaHandHoldingHeart />,
      image: "/images/timeline/comunidade.jpg",
    },
    {
      year: "2018",
      title: "Crescimento da Congregação",
      description:
        "Nossa comunidade cresceu para mais de 200 membros ativos, permitindo expandir nossos ministérios e aumentar nosso impacto na sociedade.",
      icon: <FaUsers />,
      image: "/images/timeline/congregacao.jpg",
    },
    {
      year: "2022",
      title: "Início das Missões Internacionais",
      description:
        "Começamos a enviar missionários para outros países, levando ajuda humanitária e compartilhando nossa fé com comunidades internacionais.",
      icon: <FaGlobe />,
      image: "/images/timeline/missoes.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Header da página */}
      <div
        className="w-full py-20 px-4 bg-cover bg-center text-white"
        style={{
          backgroundColor: "var(--main-color)",
          backgroundImage: "url('/images/about-header.jpg')",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nossa História
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Conheça a jornada de fé, dedicação e serviço da Igreja Evangélica
            Restitui
          </p>
        </div>
      </div>

      {/* Introdução */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--main-dark-color)" }}
          >
            Servindo a Deus e à Comunidade
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-justify">
            Desde nossa fundação, temos sido guiados pela missão de restaurar
            vidas através do evangelho e do serviço ao próximo. Nossa história é
            marcada por momentos de fé, superação e crescimento espiritual.
          </p>
          <p className="text-lg text-gray-700 text-justify">
            Abaixo, compartilhamos os principais marcos de nossa trajetória,
            celebrando a fidelidade de Deus e o compromisso de nossa comunidade
            ao longo dos anos.
          </p>
        </div>

        {/* Linha do tempo */}
        <div className="max-w-5xl mx-auto">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } mb-16`}
            >
              {/* Ano */}
              <div
                className="md:w-1/6 flex justify-center"
                style={{ color: "var(--gold-color)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 md:mb-0"
                  style={{ backgroundColor: "var(--main-color)" }}
                >
                  {event.year}
                </div>
              </div>

              {/* Linha vertical */}
              <div className="hidden md:block md:w-1/12 relative">
                <div
                  className="absolute left-1/2 top-8 transform -translate-x-1/2 h-full w-1"
                  style={{ backgroundColor: "var(--gold-color)" }}
                ></div>
              </div>

              {/* Conteúdo */}
              <div className="md:w-5/6 flex flex-col md:flex-row items-center p-4 rounded-lg shadow-md bg-white">
                <div className="w-full md:w-2/5 mb-4 md:mb-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="w-full md:w-3/5 md:pl-6">
                  <div
                    className="text-3xl mb-4 flex  justify-center md:justify-start"
                    style={{ color: "var(--gold-color)" }}
                  >
                    {event.icon}
                  </div>
                  <h3
                    className="text-2xl font-bold mb-2 text-center md:text-left"
                    style={{ color: "var(--main-dark-color)" }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-gray-700 text-justify">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seção final */}
      <div
        className="py-16 px-4 text-white mb-3"
        style={{ backgroundColor: "var(--main-dark-color)" }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Nossa Missão Continua</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-justify">
            Hoje, continuamos comprometidos com nossa missão original,
            adaptando-nos às necessidades atuais e expandindo nosso alcance. Com
            a graça de Deus, seguimos construindo uma história de fé e serviço.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
