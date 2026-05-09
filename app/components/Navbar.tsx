import Link from "next/link";
import { Music } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#f8f7f4]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f1923]">
            <Music size={14} className="stroke-[#d4a85a]" />
          </div>
          <span className="font-sans text-sm font-medium tracking-wide text-slate-900 sm:text-base">
            Music Academy
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-500 md:flex">
          <Link href="/" className="transition hover:text-slate-900">Accueil</Link>
          <Link href="/event" className="transition hover:text-slate-900">Événements</Link>
          <Link href="/contact" className="transition hover:text-slate-900">Contact</Link>
          <Link href="/inscription" className="transition hover:text-slate-900">Inscription</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 sm:px-4 sm:py-2 sm:text-sm"
          >
            Se connecter
          </Link>
          <Link
            href="/event"
            className="rounded-xl bg-[#0f1923] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#1a2a38] sm:px-4 sm:py-2 sm:text-sm"
          >
            Événements
          </Link>
        </div>
      </div>
    </header>
  );
}