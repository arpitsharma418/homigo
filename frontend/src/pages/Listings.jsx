import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import ListingCard from "../components/ListingCard";
import { useAuth } from "../context/AuthContext";

function Listings() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalListings, setTotalListings] = useState(0);

  useEffect(() => {
    api
      .get(`/listings?page=${page}&limit=12`)
      .then(({ data }) => {
        setListings(data.listings);

        setTotalPages(data.totalPages);
        setTotalListings(data.totalListings);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  const filteredListings = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return listings;
    }

    return listings.filter((listing) => {
      const text =
        `${listing.title} ${listing.location} ${listing.country}`.toLowerCase();
      return text.includes(value);
    });
  }, [listings, search]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-rose-600">
            Beyond Bookings
          </p>
          <h1 className="mt-1 text-3xl font-bold text-zinc-950">
            Designed for the way you travel.
          </h1>
        </div>
        {user && (
          <Link to="/listings/new" className="btn-primary w-full sm:w-auto">
            Add a home
          </Link>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="search"
          className="mb-2 block text-sm font-medium text-zinc-700"
        >
          Search by title or place
        </label>
        <input
          id="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="form-input max-w-xl"
          placeholder="Mumbai, cabin, villa..."
        />
      </div>

      {loading && <p className="text-sm text-zinc-600">Loading homes...</p>}
      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {!loading && !error && filteredListings.length === 0 && (
        <p className="text-sm text-zinc-600">No homes found.</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>

      {!loading && (
        <div className="flex gap-4 mt-10 justify-center items-center flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="btn-primary"
          >
            Prev
          </button>

          {Array.from({ length: totalPages || 0 }).map((_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-3 py-1 border rounded-full ${
                  page === pageNumber
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="btn-primary"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default Listings;
