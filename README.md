# GitHub Profile Viewer — Next.js + TypeScript

Search any GitHub username, view their profile and public repos, click into
a repo for details.

## Getting it running

```bash
npm install
npm run dev
```

Then open http://localhost:3000. No API key/auth needed — GitHub's public
API allows a reasonable number of unauthenticated requests per hour, plenty
for local development.

## Folder structure

```
app/
├── page.tsx                     # "/" — search form (Server Component)
├── layout.tsx
├── globals.css
└── user/
    └── [username]/
        ├── page.tsx              # "/user/:username" — profile + repos
        ├── loading.tsx           # shown while page.tsx's fetch is in flight
        ├── error.tsx             # shown if fetching throws
        ├── not-found.tsx         # shown if the username doesn't exist
        └── [repo]/
            ├── page.tsx           # "/user/:username/:repo" — repo detail
            └── not-found.tsx
components/
├── SearchForm.tsx                # Client Component — the only interactive UI
└── RepoCard.tsx
lib/
└── github.ts                     # fetchUser / fetchRepos / fetchRepo helpers
types/
└── github.ts                     # GithubUser, GithubRepo types
```

## The concepts this project is built to teach

### 1. Dynamic routes — `[username]` and `[repo]`

A folder name in square brackets becomes a **URL parameter**. Visiting
`/user/octocat` or `/user/torvalds` both match `app/user/[username]/page.tsx`
— Next.js extracts whatever's in that URL segment and passes it to your
component as `params.username`. Nest another bracketed folder
(`[username]/[repo]/`) and you get a second parameter — no manual URL
parsing, no router config, just folder names.

### 2. Server Components fetching data directly

Look at `app/user/[username]/page.tsx` — it's an `async function` that
`await`s `fetchUser()` and `fetchRepos()` right in the component body.
**No `useState`, no `useEffect`, no loading flag you manage yourself.**
This only works because it's a Server Component (no `"use client"` at the
top) — this pattern is illegal in a Client Component. This is the single
biggest difference from how your todo app fetched/held data, and the main
reason this project exists.

### 3. `loading.tsx` — automatic loading UI

`app/user/[username]/loading.tsx` is a special filename. You never import
or render it — just by existing next to `page.tsx`, Next.js wraps that
route in a React Suspense boundary and shows this file's contents while
the async work in `page.tsx` is still running. GitHub's real API is slow
enough that you'll actually see this skeleton on a slow connection.

### 4. `notFound()` and `not-found.tsx`

`lib/github.ts`'s `fetchUser()` returns `null` on a 404 instead of
throwing. `page.tsx` checks for that and calls Next.js's `notFound()`
function, which immediately stops rendering and shows the nearest
`not-found.tsx` up the folder tree. This is the idiomatic way to handle
"this specific thing doesn't exist" in the App Router — cleaner than
manually rendering a fallback UI in your own JSX.

### 5. `error.tsx` — an error boundary per route

If `fetchUser()`/`fetchRepo()` throws (rate limiting, network failure —
anything that ISN'T a clean 404), Next.js catches it and renders
`error.tsx` instead of crashing the whole app. Note it needs `"use client"`
— error boundaries rely on React features only available client-side, even
though the error itself originated on the server.

### 6. Extended `fetch()` caching — `next: { revalidate }`

See `lib/github.ts`'s `FETCH_OPTIONS`. Next.js extends the native `fetch()`
API with a `next` option. `{ revalidate: 300 }` tells Next.js "cache this
response, treat it as fresh for 300 seconds, then refetch in the
background on the next request." Without this, Next.js's default caching
behavior can be more aggressive than you want for data that changes.

### 7. `next/image` with `remotePatterns`

GitHub avatars come from `avatars.githubusercontent.com` — an external
domain. `next/image` refuses to load/optimize images from domains you
haven't explicitly allowed, as a security measure. See
`next.config.js` → `images.remotePatterns`.

### 8. `next/link` and `useRouter` — client-side navigation

Every link between pages uses `<Link href="...">` (from `next/link`)
instead of a plain `<a>` — this gives you client-side transitions (no
full page reload) between routes. `SearchForm.tsx` uses `useRouter()`
for *programmatic* navigation (redirecting after a form submit), which is
the hook-based equivalent for cases where you're not clicking a literal
link.

## Tech used

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- GitHub REST API (public, unauthenticated)
