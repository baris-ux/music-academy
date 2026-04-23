import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* Académie */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Music Academy
          </h2>
          <p className="text-sm">
            Académie de musique moderne offrant des cours, événements et concerts.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <a
                href="mailto:contact@musicacademy.com"
                className="hover:text-white transition"
              >
                contact@musicacademy.com
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <a
                href="tel:+32123456789"
                className="hover:text-white transition"
              >
                +32 123 45 67 89
              </a>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Bruxelles, Belgique</span>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Suivez-nous
          </h3>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/gitarsazkursbruksel/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 hover:text-white transition"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://www.facebook.com/metin.gumus.7106670?locale=fr_FR"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 hover:text-white transition"
            >
              <FaFacebook size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm py-4 text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} Music Academy — Tous droits réservés
      </div>
    </footer>
  );
}