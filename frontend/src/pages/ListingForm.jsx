import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  location: "",
  country: "",
  imageUrl: "",
};

function ListingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(id);
  const maxImageSize = 10 * 1024 * 1024;

  useEffect(() => {
    if (!id) {
      return;
    }

    api
      .get(`/listings/${id}`)
      .then(({ data }) => {
        const listing = data.listing;

        if (listing.owner?._id !== user?._id) {
          navigate(`/listings/${id}`);
          return;
        }

        setForm({
          title: listing.title,
          description: listing.description,
          price: listing.price,
          location: listing.location,
          country: listing.country,
          imageUrl: listing.image?.url || "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, navigate, user?._id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      const { data } = await api({
        url: isEditing ? `/listings/${id}` : "/listings",
        method: isEditing ? "put" : "post",
        data: formData,
      });

      navigate(`/listings/${data.listing._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="mx-auto max-w-3xl px-4 py-10 text-sm text-zinc-600">Loading form...</p>;
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-rose-600">
          {isEditing ? "Update your place" : "Host on Homigo"}
        </p>
        <h1 className="mt-1 text-3xl font-bold text-zinc-950">
          {isEditing ? "Edit home" : "Add a new home"}
        </h1>
      </div>

      {error && <p className="mb-5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-zinc-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-zinc-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-input min-h-32"
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-medium text-zinc-700">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="1"
              value={form.price}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="mb-2 block text-sm font-medium text-zinc-700">
              Location
            </label>
            <input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="mb-2 block text-sm font-medium text-zinc-700">
              Country
            </label>
            <input
              id="country"
              name="country"
              value={form.country}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium text-zinc-700">
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="form-input"
            placeholder="https://..."
          />
          <p className="mt-2 text-xs text-zinc-500">
            Image URL works directly. File upload needs Cloudinary values in Render.
          </p>
        </div>

        <div>
          <label htmlFor="image" className="mb-2 block text-sm font-medium text-zinc-700">
            Upload image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const selectedImage = event.target.files[0];

              if (selectedImage && selectedImage.size > maxImageSize) {
                setImage(null);
                setError("Image must be smaller than 10 MB.");
                event.target.value = "";
                return;
              }

              setError("");
              setImage(selectedImage || null);
            }}
            className="form-input"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving..." : isEditing ? "Update home" : "Create home"}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default ListingForm;
