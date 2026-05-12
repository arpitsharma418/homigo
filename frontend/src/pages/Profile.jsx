import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api/api.js";
import ListingCard from "../components/ListingCard.jsx";
import { UserRound, Mail, PhoneCall, MapPin, BookUser } from "lucide-react";

function Profile() {
  const { user, logout } = useAuth();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const displayName = user.fullName || user.username;
  const listingOwnerName = user.fullName || user.username.split(" ")[0];
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    api
      .get(`/listings/owner/${user._id}`)
      .then(({ data }) => {
        setListings(data.listings);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Profile Section */}
        <section className="p-5 md:p-10">
          <div className="flex justify-center items-center flex-col">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-slate-300 bg-slate-100 mt-4">
              {user.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt={`${displayName} avatar`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-slate-500">
                  <UserRound className="h-10 w-10" />
                </div>
              )}
            </div>
            <div className="text-center leading-2">
              <h1 className="text-lg font-semibold mt-2">{user.fullName}</h1>
              <p className="text-sm opacity-70">@{user.username}</p>
              <p className="text-xs opacity-60">Joined on {joinedDate}</p>
            </div>
            <div className="flex gap-2 w-[80%] mt-10">
              <button className="btn-dark flex-1" onClick={() => navigate("/profile/edit")}>Edit Profile</button>
              <button className="btn-primary flex-1" onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <div className="md:grid grid-cols-4 mt-10 gap-2 space-y-2 md:space-y-0">
            <div className="bg-white border p-5 rounded-xl">
              <h1 className="font-semibold">Email Address</h1>
              <div className="flex items-center gap-1 opacity-70 ">
                <Mail className="size-4 opacity-60" />
                <p>{user.email}</p>
              </div>
            </div>
            <div className="bg-white border p-5 rounded-xl">
              <h1 className="font-semibold">Phone No.</h1>
              <div className="flex items-center gap-1 opacity-70 ">
                <PhoneCall className="size-4 opacity-60" />
                <p>{user.phone}</p>
              </div>
            </div>
            <div className="bg-white border p-5 rounded-xl">
              <h1 className="font-semibold">Location</h1>
              <div className="flex items-center gap-1 opacity-70 ">
                <MapPin className="size-4 opacity-60" />
                <p>{user.location}</p>
              </div>
            </div>
            {user.bio && (
              <div className="bg-white border p-5 rounded-xl">
                <h1 className="font-semibold">About Me</h1>
                <div className="flex items-center gap-1 opacity-70 ">
                  <BookUser className="size-4 opacity-60" />
                  <p>{user.bio ? user.bio : ""}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6">
            <p className="text-xs uppercase text-slate-500">Portfolio</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              {listingOwnerName}&apos;s Listings{" "}
              <span className="text-slate-500">({listings.length})</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Curated stays and spaces presented through your Homigo profile.
            </p>
          </div>

          {loading && (
            <p className="text-sm text-slate-600">Loading homes...</p>
          )}
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          {!loading && !error && listings.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
              <p className="text-lg font-medium text-slate-900">
                No homes found.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Add your first listing to start building your profile showcase.
              </p>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;

//  <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
//           <div className="px-6 py-6 border-b border-slate-200">
//             <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
//               <div className="flex items-center gap-5">
//                 <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-slate-300 bg-slate-100">
//                   {user.avatar?.url ? (
//                     <img
//                       src={user.avatar.url}
//                       alt={`${displayName} avatar`}
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <div className="text-slate-500">
//                       <UserRound className="h-10 w-10" />
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <p className="text-xs font-semibold uppercase text-slate-500">
//                     Homigo Profile
//                   </p>
//                   <h1 className="mt-2 text-3xl font-semibold">{displayName}</h1>
//                   <p className="text-sm text-slate-600">@{user.username}</p>
//                   <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">
//                     {user.bio || "Build a stronger first impression by adding a short bio, location, and profile photo."}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 <button
//                   onClick={handleEdit}
//                   className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
//                 >
//                   Edit Profile
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleLogout}
//                   className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
