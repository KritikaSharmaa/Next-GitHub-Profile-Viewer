import SearchForm from "@/components/SearchForm";

// Notice: no "use client" here, and no useState/useEffect anywhere in
// this file. This page has nothing interactive of its OWN — the only
// interactive piece (the form) is isolated into its own Client Component
// and imported. This is the pattern to default to: keep pages as Server
// Components, and only carve out Client Components for the specific
// pieces that truly need interactivity.
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          GitHub Profile Viewer
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Search any GitHub username to see their profile and repositories.
        </p>
      </div>

      <SearchForm />

      <p className="text-xs text-slate-400">
        Try: octocat, torvalds, gaearon
      </p>
    </main>
  );
}
