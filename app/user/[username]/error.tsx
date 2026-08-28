"use client";

import { useEffect } from "react";

/**
 * error.tsx MUST be a Client Component ("use client" is required here) —
 * Next.js renders this as a React error boundary, and error boundaries
 * rely on React lifecycle features that only exist on the client.
 *
 * It's shown automatically if anything THROWS while rendering this route
 * segment — e.g. our fetchUser()/fetchRepo() throwing on a non-404 failure
 * (rate limiting, network error, GitHub being down). Next.js passes in
 * the error plus a `reset` function that re-attempts rendering the segment.
 */
export default function UserProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real app you'd send this to an error-tracking service
    // (Sentry, etc). For now, just log it so it's visible in dev tools.
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">
        Something went wrong
      </h1>
      <p className="text-sm text-slate-500">
        We couldn&apos;t load this profile right now — GitHub&apos;s API
        might be rate-limiting requests. Try again in a moment.
      </p>
      <button
        onClick={reset}
        className="mt-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        Try again
      </button>
    </main>
  );
}
