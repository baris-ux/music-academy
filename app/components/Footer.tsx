import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
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
              <a href="mailto:contact@musicacademy.com">
                contact@musicacademy.com
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <a href="tel:+32123456789">
                +32 123 45 67 89
              </a>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Bruxelles, Belgique</span>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux (placeholder) */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Suivez-nous
          </h3>
          <p className="text-sm text-gray-400">
            Bientôt disponible
          </p>
        </div>
      </div>

      <div className="text-center text-sm py-4 text-gray-400">
        © {new Date().getFullYear()} Music Academy — Tous droits réservés
      </div>
    </footer>
  );
}