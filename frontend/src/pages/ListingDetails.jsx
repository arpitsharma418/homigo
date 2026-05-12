import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { Star, BadgeCheck, UserRound } from "lucide-react";

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
    return (
      <p className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-600">
        Loading home...
      </p>
    );
  }

  if (error && !listing) {
    return (
      <p className="mx-auto max-w-6xl px-4 py-10 text-sm text-red-700">
        {error}
      </p>
    );
  }

  // Avg rating
  const averageRating =
    listing.reviews.length > 0
      ? (
          listing.reviews.reduce((sum, review) => sum + review.rating, 0) /
          listing.reviews.length
        ).toFixed(1)
      : 0;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {error && (
        <p className="mb-5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <img
            src={listing.image?.url}
            alt={listing.title}
            className="h-[320px] w-full rounded-xl object-cover sm:h-[480px]"
          />
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase text-rose-600">
              {listing.location}, {listing.country}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-zinc-950">
              {listing.title}
            </h1>
            <p className="mt-3 text-lg font-semibold text-zinc-900">
              Rs {Number(listing.price).toLocaleString("en-IN")} / night
            </p>
          </div>

          <p className="text-zinc-700">{listing.description}</p>

          <div className=" p-2 flex leading-4 items-center gap-2 border-b border-t">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-zinc-100 text-lg text-white font-semibold">
              {listing.owner?.avatar?.url ? (
                <img
                  src={listing.owner.avatar.url}
                  alt={`${listing.owner?.username || "Host"} profile`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound className="h-5 w-5 text-zinc-500" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                Hosted by {listing.owner?.fullName || listing.owner?.username}
              </span>
              <span className="text-xs text-black/60 font-semibold">
                Listed on{" "}
                {new Date(listing.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div>
            <button
              disabled
              className="w-full p-2 font-semibold bg-red-500 text-white rounded-full hover:bg-red-600 transition disabled:cursor-not-allowed hover:opacity-40"
            >
              Reserve <span className="text-xs ">(Comming Soon)</span>
            </button>
          </div>

          {isOwner && (
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/listings/${listing._id}/edit`}
                className="btn-secondary"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={handleDeleteListing}
                className="btn-danger"
              >
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
                <label
                  htmlFor="rating"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Rating
                </label>
                {Array.from({ length: 5 }, (_, index) => {
                  const starValue = index + 1;

                  return (
                    <button
                      type="button"
                      key={starValue}
                      onClick={() => setRating(starValue)}
                    >
                      <Star
                        className={`h-7 w-7 transition ${
                          starValue <= rating
                            ? "fill-yellow-400 text-yellow-400 mr-1"
                            : "text-zinc-300 mr-1"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
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
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500 h-3 w-3 fill-yellow-500" />
            {listing.reviews.length > 0
              ? `${averageRating} (${listing.reviews.length} reviews)`
              : `${listing.reviews.length} reviews`}
          </div>

          <div className="mt-5 space-y-5">
            {listing.reviews?.length ? (
              listing.reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-black/10 p-5 rounded-2xl hover:shadow transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-lg font-semibold text-zinc-700">
                      {review.author?.avatar?.url ? (
                        <img
                          src={review.author.avatar.url}
                          alt={`${review.author?.username || "Homigo user"} profile`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound className="h-5 w-5 text-zinc-500" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className=" font-semibold text-zinc-950">
                          {review.author?.fullName || review.author?.username || "Homigo user"}
                        </h4>

                        <BadgeCheck className="h-4 w-4 fill-red-500 text-white" />
                      </div>

                      <p className="text-xs text-zinc-500">Homigo guest</p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs text-zinc-700">
                    <div className="flex items-center gap-[2px]">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-zinc-300"
                          }`}
                        />
                      ))}
                    </div>

                    <span className="h-1 w-1 bg-black/50 rounded-full"></span>

                    <span>
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="mt-3 max-w-3xl text-[14px] text-zinc-800">
                    {review.comment}
                  </p>

                  <div className="mt-2">
                    {user?._id === review.author?._id && (
                      <button
                        type="button"
                        onClick={() => handleDeleteReview(review._id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center">
                <p className="text-sm text-zinc-600">
                  No reviews yet. Be the first to share your experience.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListingDetails;
