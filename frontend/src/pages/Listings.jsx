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

  useEffect(() => {
    api
      .get("/listings")
      .then(({ data }) => setListings(data.listings))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredListings = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return listings;
    }

    return listings.filter((listing) => {
      const text = `${listing.title} ${listing.location} ${listing.country}`.toLowerCase();
      return text.includes(value);
    });
  }, [listings, search]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-rose-600">Stay somewhere good</p>
          <h1 className="mt-1 text-3xl font-bold text-zinc-950">Find your next Homigo stay</h1>
        </div>
        {user && (
          <Link to="/listings/new" className="btn-primary w-full sm:w-auto">
            Add a home
          </Link>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="search" className="mb-2 block text-sm font-medium text-zinc-700">
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
      {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {!loading && !error && filteredListings.length === 0 && (
        <p className="text-sm text-zinc-600">No homes found.</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

export default Listings;
