import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="text-center">
        <p className="font-mono text-6xl font-bold text-accent">404</p>
        <h1 className="mt-4 text-2xl font-bold text-text">Page introuvable</h1>
        <p className="mt-2 text-muted">
          Ce cours ou chapitre n&apos;existe pas.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
