import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <Link
      to={`/listings/${listing._id}`}
      className="group overflow-hidden rounded-lg border border-zinc-200 bg-white transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-zinc-200">
        <img
          src={listing.image?.url}
          alt={listing.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-4">
        <div>
          <h2 className="line-clamp-1 text-base font-semibold text-zinc-950">{listing.title}</h2>
          <p className="line-clamp-1 text-sm text-zinc-600">
            {listing.location}, {listing.country}
          </p>
        </div>
        <p className="text-sm text-zinc-800">
          <span className="font-semibold">Rs {Number(listing.price).toLocaleString("en-IN")}</span>{" "}
          night
        </p>
      </div>
    </Link>
  );
}

export default ListingCard;
