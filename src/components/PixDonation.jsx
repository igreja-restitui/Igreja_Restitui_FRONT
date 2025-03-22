import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

const PixDonation = ({
  title = "Faça uma doação via PIX",
  cnpj = "23.773.094.0001-37",
  institution = "IGREJA EVANGELICA RESTITUI",
  qrCodeImage = "/images/pix.jpg",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(cnpj);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-8 md:border-1 md:border-[var(--main-color)]">
      <div className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="mt-2 text-gray-600">Sua contribuição faz a diferença</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6 md:w-1/2">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Instituição:</span> {institution}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">CNPJ:</span> {cnpj}
            </p>
            <p className="text-gray-700 mb-4">
              Use o QR Code ao lado ou copie o CNPJ para fazer sua doação pelo
              aplicativo do seu banco.
            </p>

            <button
              onClick={handleCopyClick}
              className="flex items-center justify-center w-full px-4 py-2 bg-[var(--main-color)] text-white font-semibold rounded-lg hover:bg-[var(--main-dark-color)] transition duration-300 ease-in-out cursor-pointer"
            >
              {copied ? (
                <>
                  <FaCheck className="mr-2" />
                  CNPJ Copiado!
                </>
              ) : (
                <>
                  <FaCopy className="mr-2" />
                  Copiar CNPJ
                </>
              )}
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="w-48 h-48 bg-gray-100 flex items-center justify-center border border-gray-300 rounded-lg">
              {qrCodeImage ? (
                <img
                  src={qrCodeImage}
                  alt="QR Code PIX"
                  className="w-40 h-40 object-contain"
                />
              ) : (
                <p className="text-gray-500 text-center px-4">QR Code PIX</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Destino da sua doação
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            Você pode direcionar sua doação para projetos específicos através do
            valor doado:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc">
            <li>
              Valores com <span className="font-medium">final R$ 0,99</span> são
              destinados para{" "}
              <span className="text-blue-600 font-medium">Missões</span>
            </li>
            <li>
              Valores com <span className="font-medium">final R$ 0,95</span> são
              destinados para{" "}
              <span className="text-green-600 font-medium">Crianças</span>
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-3 italic">
            Exemplo: Uma doação de R$ 50,99 será direcionada para missões,
            enquanto uma doação de R$ 50,95 será direcionada para projetos com
            crianças.
          </p>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>O valor será recebido diretamente na conta da instituição.</p>
        </div>
      </div>
    </div>
  );
};

export default PixDonation;
