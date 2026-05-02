"use client";

type Props = {
  url: string;
};

export default function CopyButton({ url }: Props) {
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(url)}
      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 cursor-pointer"
    >
      Copier le lien
    </button>
  );
}