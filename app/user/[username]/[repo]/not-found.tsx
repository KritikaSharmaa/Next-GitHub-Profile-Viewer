import Link from "next/link";

export default function RepoNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">
        Repository not found
      </h1>
      <p className="text-sm text-slate-500">
        This repository doesn&apos;t exist, or it&apos;s private.
      </p>
      <Link href="/" className="mt-2 text-sm text-brand-600 hover:underline">
        &larr; Back to search
      </Link>
    </main>
  );
}
