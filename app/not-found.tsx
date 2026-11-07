import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container-site py-32 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-4 text-4xl font-bold">We couldn&apos;t find that page</h1>
      <p className="mt-4 text-muted">The link may be old or mistyped.</p>
      <Link href="/" className="btn-primary mt-8">Back to home</Link>
    </section>
  );
}
