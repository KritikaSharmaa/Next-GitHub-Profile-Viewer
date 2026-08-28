import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchRepos, fetchUser } from "@/lib/github";
import RepoCard from "@/components/RepoCard";

/**
 * The folder name `[username]` (square brackets) is what makes this a
 * DYNAMIC route. Visiting /user/octocat or /user/torvalds both match
 * this same file — Next.js extracts whatever's in that URL segment and
 * hands it to this component via the `params` prop.
 *
 * This component is `async` — something you CANNOT do in a Client
 * Component. Only Server Components can be async functions that `await`
 * directly in their body. This is the core new pattern this project is
 * meant to teach: no useEffect, no loading state you manage yourself —
 * you just `await` the data and return JSX with it already in hand.
 */
export default async function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  // Fetch profile and repos in parallel rather than one after another —
  // Promise.all runs both requests at the same time instead of waiting
  // for the first to finish before starting the second.
  const [user, repos] = await Promise.all([
    fetchUser(username),
    fetchRepos(username),
  ]);

  // notFound() is a Next.js function that immediately stops rendering
  // this page and renders the nearest not-found.tsx instead (see the
  // not-found.tsx file in this same folder). It effectively triggers a
  // 404 response, without you having to manually build that UI here.
  if (!user) {
    notFound();
  }


  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/" className="text-sm text-brand-600 hover:underline">
        &larr; Search another user
      </Link>

      <div className="mt-6 flex items-start gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Image
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width={88}
          height={88}
          className="rounded-full"
        />

        <div className="flex-1">
          <h1 className="text-xl font-semibold text-slate-900">
            {user.name ?? user.login}
          </h1>
          <p className="text-sm text-slate-500">@{user.login}</p>

          {user.bio && (
            <p className="mt-2 text-sm text-slate-700">{user.bio}</p>
          )}

          <div className="mt-4 flex gap-4 text-sm text-slate-500">
            <span>
              <strong className="text-slate-900">{user.public_repos}</strong>{" "}
              repos
            </span>
            <span>
              <strong className="text-slate-900">{user.followers}</strong>{" "}
              followers
            </span>
            <span>
              <strong className="text-slate-900">{user.following}</strong>{" "}
              following
            </span>
          </div>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-brand-600 hover:underline"
          >
            View on GitHub &rarr;
          </a>
        </div>
      </div>

      <h2 className="mt-10 mb-3 text-lg font-semibold text-slate-900">
        Repositories
      </h2>

      {repos.length === 0 ? (
        <p className="text-sm text-slate-400">No public repositories found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} username={user.login} />
          ))}
        </div>
      )}
    </main>
  );
}
