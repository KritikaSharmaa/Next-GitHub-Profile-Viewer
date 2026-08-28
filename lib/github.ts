import { GithubRepo, GithubUser } from "@/types/github";

const GITHUB_API = "https://api.github.com";

/**
 * Why these functions live here instead of directly inside page.tsx:
 * - Reusable — both the profile page and repo page need `fetchUser`-style
 *   calls, and any future page can import the same helpers.
 * - Testable in isolation, without needing to render a component.
 * - Keeps the fetch/error-handling details out of your JSX.
 *
 * Note there's no "use client" here — these run on the SERVER, inside
 * Server Components. That means this fetch() call never ships to the
 * browser, and GitHub API responses never sit in client-side JS bundles.
 */

/**
 * next: { revalidate: N }
 * ------------------------
 * This is Next.js's extension to the native fetch() API. It tells Next.js
 * to cache this request's response and treat it as fresh for N seconds —
 * after that, the NEXT request triggers a background refetch (this is
 * called "stale-while-revalidate"). Without this option, Next.js defaults
 * to fully caching fetches indefinitely, which is often too aggressive
 * for data that changes (like follower counts or repo stars).
 *
 * 300 = 5 minutes. Reasonable for GitHub data that changes slowly.
 */
const FETCH_OPTIONS = {
  next: { revalidate: 300 },
};

/**
 * Fetches a GitHub user's public profile.
 * Returns `null` if the user doesn't exist (404) — callers use this to
 * decide when to call Next.js's notFound().
 */
export async function fetchUser(username: string): Promise<GithubUser | null> {
  const res = await fetch(`${GITHUB_API}/users/${username}`, FETCH_OPTIONS);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    // Covers rate limiting (403) and any other unexpected failure.
    // Throwing here lets Next.js's error.tsx boundary catch it, instead
    // of silently rendering a broken page.
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetches a user's public repos, sorted by most recently updated.
 * Returns an empty array on failure rather than throwing — a profile
 * page with zero repos shown is a better fallback than a full page crash
 * just because the repos call happened to fail.
 */
export async function fetchRepos(username: string): Promise<GithubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=12`,
    FETCH_OPTIONS
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

/**
 * Fetches a single repo's details.
 * Returns `null` on 404 (repo doesn't exist, or is private/renamed).
 */
export async function fetchRepo(
  username: string,
  repo: string
): Promise<GithubRepo | null> {
  const res = await fetch(
    `${GITHUB_API}/repos/${username}/${repo}`,
    FETCH_OPTIONS
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  return res.json();
}
