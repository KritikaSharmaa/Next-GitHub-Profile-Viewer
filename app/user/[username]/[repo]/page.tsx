import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchRepo } from "@/lib/github";

/**
 * TWO dynamic segments deep: /user/[username]/[repo]. Next.js gives you
 * BOTH values in `params` — you don't do any manual URL parsing yourself,
 * the folder structure `[username]/[repo]/page.tsx` is what tells Next.js
 * to extract two segments instead of one.
 */

export default async function RepoDetailPage({
  params,
}: {
  params: { username: string; repo: string };
}) {
  const { username, repo: repoName } = params;

  const repo = await fetchRepo(username, repoName);

  if (!repo) {
    notFound();
  }

  const updatedDate = new Date(repo.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href={`/user/${username}`}
        className="text-sm text-brand-600 hover:underline"
      >
        &larr; Back to {username}&apos;s profile
      </Link>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">{repo.name}</h1>

        {repo.description && (
          <p className="mt-2 text-sm text-slate-700">{repo.description}</p>
        )}

        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-slate-400">Language</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {repo.language ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">Stars</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {repo.stargazers_count}
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">Forks</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {repo.forks_count}
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">Updated</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {updatedDate}
            </dd>
          </div>
        </dl>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-sm text-brand-600 hover:underline"
        >
          View on GitHub &rarr;
        </a>
      </div>
    </main>
  );
}
