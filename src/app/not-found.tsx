import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header forceSolid />
      <main className="flex min-h-[65vh] flex-col items-center justify-center bg-slate-50/70 px-4 py-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
          404 Error
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-md text-base text-navy-600">
          The property or page you are looking for might have been moved, renamed, or is currently unavailable.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Back to Homepage
          </Link>
          <Link href="/projects" className="btn-outline">
            Browse All Projects
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
