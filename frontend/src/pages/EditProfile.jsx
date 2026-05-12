import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function EditProfile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();

  // Simple state for the form
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // When user data loads, fill the form
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setLocation(user.location || "");
      setBio(user.bio || "");
      setAvatarUrl(user.avatar?.url || "");
    }
  }, [user]);

  // Handle form submit
  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      // Create data to send
      const formData = new FormData();
      formData.append("username", username);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("bio", bio);
      formData.append("avatarUrl", avatarUrl);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      formData.append("removeAvatar", String(removeAvatar));

      // Send to server
      await updateProfile(formData);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  // Handle file upload
  function handleFileChange(event) {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file && file.size > maxSize) {
      setError("File too big! Max 5MB.");
      setAvatarFile(null);
      event.target.value = "";
      return;
    }

    setError("");
    setAvatarFile(file);
    setRemoveAvatar(false);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-950">Edit profile</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Change your profile info here.
      </p>

      {error && (
        <p className="mt-5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="username" className="mb-2 block text-sm font-medium text-zinc-700">
            Username
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-zinc-700">
            Full name
          </label>
          <input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-zinc-700">
            Phone
          </label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="location" className="mb-2 block text-sm font-medium text-zinc-700">
            Location
          </label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="bio" className="mb-2 block text-sm font-medium text-zinc-700">
            Bio
          </label>
          <textarea
            id="bio"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="form-input"
            placeholder="Tell about yourself"
          />
        </div>

        <div>
          <label htmlFor="avatarUrl" className="mb-2 block text-sm font-medium text-zinc-700">
            Avatar URL
          </label>
          <input
            id="avatarUrl"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="form-input"
            placeholder="https://..."
          />
        </div>

        <div>
          <label htmlFor="avatar" className="mb-2 block text-sm font-medium text-zinc-700">
            Upload avatar
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>

        <label className="flex items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3 text-sm text-zinc-600">
          <input
            type="checkbox"
            checked={removeAvatar}
            onChange={(e) => setRemoveAvatar(e.target.checked)}
          />
          Remove current avatar
        </label>

        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary flex-1">
            {saving ? "Saving..." : "Save"}
          </button>
          <Link to="/profile" className="btn-secondary flex-1 text-center">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}

export default EditProfile;
