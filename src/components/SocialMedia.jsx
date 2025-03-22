import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

// Você pode personalizar esse componente através de props
const SocialMedia = ({
  className = "",
  showLabels = false,
  iconSize = 28,
  iconSpacing = "space-x-8",
  containerClassName = "py-4 bg-gray-50 shadow-inner",
}) => {
  // URLs das redes sociais (substitua pelos seus links reais)
  const socialLinks = {
    whatsapp:
      "https://wa.me/5519997049669?text=Ol%C3%A1%2C%20vim%20pelo%20site!%20", // Substitua pelo seu número
    instagram: "https://www.instagram.com/ie.restituioficial/",
    facebook: "https://www.facebook.com/ierestitui",
    youtube: "https://www.youtube.com/@ierestituioficial",
  };

  return (
    <div
      className={`social-media-component ${containerClassName} ${className}`}
    >
      <div className="container mx-auto">
        <div className={`flex justify-center items-center ${iconSpacing}`}>
          {/* WhatsApp */}
          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link flex flex-col items-center"
            aria-label="WhatsApp"
          >
            <FaWhatsapp
              size={iconSize}
              className="text-green-600 hover:text-green-700 transition-colors"
            />
            {showLabels && (
              <span className="text-xs mt-1 text-gray-600">WhatsApp</span>
            )}
          </a>

          {/* Instagram */}
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link flex flex-col items-center"
            aria-label="Instagram"
          >
            <FaInstagram
              size={iconSize}
              className="text-pink-600 hover:text-pink-700 transition-colors"
            />
            {showLabels && (
              <span className="text-xs mt-1 text-gray-600">Instagram</span>
            )}
          </a>

          {/* Facebook */}
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link flex flex-col items-center"
            aria-label="Facebook"
          >
            <FaFacebook
              size={iconSize}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            />
            {showLabels && (
              <span className="text-xs mt-1 text-gray-600">Facebook</span>
            )}
          </a>

          {/* YouTube */}
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link flex flex-col items-center"
            aria-label="YouTube"
          >
            <FaYoutube
              size={iconSize}
              className="text-red-600 hover:text-red-700 transition-colors"
            />
            {showLabels && (
              <span className="text-xs mt-1 text-gray-600">YouTube</span>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
