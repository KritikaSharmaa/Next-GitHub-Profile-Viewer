/**
 * loading.tsx is a special Next.js filename — put it next to a page.tsx
 * and Next.js AUTOMATICALLY shows it (via a React Suspense boundary it
 * sets up for you) while that page's async work is in flight. You don't
 * import or render this anywhere — Next.js's router wires it up itself,
 * purely based on this file's location in the folder tree.
 *
 * This is genuinely useful here: GitHub's API is real and can take a
 * noticeable moment to respond, unlike local mock data.
 */
export default function LoadingUserProfile() {
  return (
    <main className="mx-auto max-w-3xl animate-pulse px-4 py-12">
      <div className="h-4 w-32 rounded bg-slate-200" />

      <div className="mt-6 flex items-start gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-[88px] w-[88px] shrink-0 rounded-full bg-slate-200" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-40 rounded bg-slate-200" />
          <div className="h-3 w-24 rounded bg-slate-200" />
          <div className="h-3 w-full rounded bg-slate-200" />
        </div>
      </div>

      <div className="mt-10 h-5 w-32 rounded bg-slate-200" />
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl border border-slate-200 bg-white p-4">
            <div className="h-4 w-2/3 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-full rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
