import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

function ListingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [listing, setListing] = useState(null);
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isOwner = user && listing?.owner?._id === user._id;

  async function loadListing() {
    setError("");
    const { data } = await api.get(`/listings/${id}`);
    setListing(data.listing);
  }

  useEffect(() => {
    loadListing()
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDeleteListing() {
    const confirmed = window.confirm("Delete this listing?");
    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/listings/${id}`);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleReviewSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.post(`/listings/${id}/reviews`, { rating, comment });
      setRating("5");
      setComment("");
      await loadListing();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteReview(reviewId) {
    try {
      await api.delete(`/listings/${id}/reviews/${reviewId}`);
      await loadListing();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <p className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-600">Loading home...</p>;
  }

  if (error && !listing) {
    return <p className="mx-auto max-w-6xl px-4 py-10 text-sm text-red-700">{error}</p>;
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {error && <p className="mb-5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <img
            src={listing.image?.url}
            alt={listing.title}
            className="h-[320px] w-full rounded-lg object-cover sm:h-[480px]"
          />
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase text-rose-600">
              {listing.location}, {listing.country}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-zinc-950">{listing.title}</h1>
            <p className="mt-3 text-lg font-semibold text-zinc-900">
              Rs {Number(listing.price).toLocaleString("en-IN")} night
            </p>
          </div>

          <p className="text-zinc-700">{listing.description}</p>

          <div className="border-t border-zinc-200 pt-4 text-sm text-zinc-600">
            Hosted by {listing.owner?.username || "Homigo user"}
          </div>

          {isOwner && (
            <div className="flex flex-wrap gap-3">
              <Link to={`/listings/${listing._id}/edit`} className="btn-secondary">
                Edit
              </Link>
              <button type="button" onClick={handleDeleteListing} className="btn-danger">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-xl font-bold text-zinc-950">Leave a review</h2>
          {user ? (
            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="rating" className="mb-2 block text-sm font-medium text-zinc-700">
                  Rating
                </label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                  className="form-input"
                >
                  <option value="5">5 - Loved it</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Okay</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Bad</option>
                </select>
              </div>
              <div>
                <label htmlFor="comment" className="mb-2 block text-sm font-medium text-zinc-700">
                  Comment
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  className="form-input min-h-28"
                  required
                />
              </div>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving..." : "Post review"}
              </button>
            </form>
          ) : (
            <p className="mt-3 text-sm text-zinc-600">
              <Link to="/login" className="font-semibold text-rose-600">
                Login
              </Link>{" "}
              to write a review.
            </p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-zinc-950">Reviews</h2>
          <div className="mt-4 space-y-3">
            {listing.reviews?.length ? (
              listing.reviews.map((review) => (
                <div key={review._id} className="rounded-lg border border-zinc-200 bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-zinc-950">
                      {review.author?.username || "Homigo user"}
                    </p>
                    <p className="text-sm text-zinc-600">{review.rating}/5</p>
                  </div>
                  <p className="mt-2 text-sm text-zinc-700">{review.comment}</p>
                  {user?._id === review.author?._id && (
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(review._id)}
                      className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      Delete review
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-600">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListingDetails;
