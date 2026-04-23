import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-sm font-semibold uppercase text-rose-600">404</p>
      <h1 className="mt-1 text-3xl font-bold text-zinc-950">Page not found</h1>
      <p className="mt-3 text-zinc-600">This stay is not available.</p>
      <Link to="/" className="btn-primary mt-6">
        Back to homes
      </Link>
    </section>
  );
}

export default NotFound;
