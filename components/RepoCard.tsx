import Link from "next/link";
import { GithubRepo } from "@/types/github";

interface RepoCardProps {
  repo: GithubRepo;
  username: string;
}

// A plain, non-"use client" component — it has no state or event handlers
// of its own, just renders props and a next/link. Server Component by
// default, same as its parent (app/user/[username]/page.tsx).
export default function RepoCard({ repo, username }: RepoCardProps) {
  return (
    <Link
      href={`/user/${username}/${repo.name}`}
      className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm
                 transition hover:border-brand-300 hover:shadow-md"
    >
      <h3 className="font-medium text-brand-700">{repo.name}</h3>
      {repo.description && (
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {repo.description}
        </p>
      )}
      <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
        {repo.language && <span>{repo.language}</span>}
        <span>★ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
      </div>
    </Link>
  );
}
