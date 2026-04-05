import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* 🔹 Académie */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Music Academy
          </h2>
          <p className="text-sm">
            Académie de musique moderne offrant des cours, événements et concerts.
          </p>
        </div>

        {/* 🔹 Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>contact@musicacademy.com</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>+32 123 45 67 89</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Bruxelles, Belgique</span>
            </div>
          </div>
        </div>

        {/* 🔹 Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Suivez-nous
          </h3>

          <div className="flex gap-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-white transition"
            >
              <Instagram />
            </Link>

            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-white transition"
            >
              <Facebook />
            </Link>

            <Link
              href="https://youtube.com"
              target="_blank"
              className="hover:text-white transition"
            >
              <Youtube />
            </Link>
          </div>
        </div>
      </div>

      {/* 🔻 Bottom bar */}
      <div className="border-t border-gray-800 text-center text-sm py-4">
        © {new Date().getFullYear()} Music Academy — Tous droits réservés
      </div>
    </footer>
  );
}