// GitHub's real API responses have 30+ fields per object. We only type the
// ones we actually use — there's no need (and no benefit) to model fields
// your app never touches. If you need more later, just add them here.

export interface GithubUser {
  login: string; // the username, e.g. "octocat"
  avatar_url: string;
  name: string | null; // GitHub allows an empty display name
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string; // link to their github.com profile
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string; // ISO date string
}

// GitHub returns this shape on 404s / rate-limit errors instead of the
// object you asked for — useful to type so we can detect it.
export interface GithubErrorResponse {
  message: string;
  documentation_url?: string;
}
