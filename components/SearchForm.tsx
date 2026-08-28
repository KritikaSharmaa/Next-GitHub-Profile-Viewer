"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

/**
 * Why this needs "use client":
 * - useRouter (for programmatic navigation) only works in Client Components
 * - useState + onSubmit are interactive, browser-only concerns
 *
 * Why navigation happens via router.push instead of a plain <a href>:
 * router.push does a CLIENT-SIDE transition — Next.js swaps in the new
 * route without a full page reload, re-using layouts that don't change.
 * A plain <a href="/user/xyz"> would also work, but router.push lets us
 * validate/trim the input first and keeps this as a proper form submit
 * (so pressing Enter works, not just clicking a link).
 */

export default function SearchForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    router.push(`/user/${trimmed}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter a GitHub username, e.g. octocat"
        aria-label="GitHub username"
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm
                   shadow-sm outline-none transition focus:border-brand-500
                   focus:ring-2 focus:ring-brand-50"
      />
      <button
        type="submit"
        disabled={!username.trim()}
        className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white
                   transition hover:bg-brand-700 active:scale-[0.98]
                   disabled:cursor-not-allowed disabled:opacity-50"
      >
        Search
      </button>
    </form>
  );
}
