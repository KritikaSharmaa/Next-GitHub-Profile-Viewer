import Link from "next/link";

/**
 * not-found.tsx is another special filename. It's rendered automatically
 * whenever `notFound()` is called anywhere in this route segment (see
 * page.tsx, where we call it if fetchUser returns null) — or when someone
 * visits a URL that genuinely doesn't match any route.
 */
export default function UserNotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">
        User not found
      </h1>
      <p className="text-sm text-slate-500">
        We couldn&apos;t find a GitHub user with that username.
      </p>
      <Link
        href="/"
        className="mt-2 text-sm text-brand-600 hover:underline"
      >
        &larr; Try another search
      </Link>
    </main>
  );
}
