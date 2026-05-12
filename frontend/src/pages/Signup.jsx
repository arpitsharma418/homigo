import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signup(form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-950">Create account</h1>
      <p className="mt-2 text-sm text-zinc-600">Start saving and hosting stays.</p>

      {error && <p className="mt-5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="username" className="mb-2 block text-sm font-medium text-zinc-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
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
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="form-input"
            maxLength="60"
            placeholder="This can match another user's name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
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
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="form-input"
            maxLength="20"
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
            maxLength="80"
          />
        </div>
        <div>
          <label htmlFor="bio" className="mb-2 block text-sm font-medium text-zinc-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            value={form.bio}
            onChange={handleChange}
            className="form-input"
            maxLength="300"
            placeholder="Tell guests or hosts a little about yourself."
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength="6"
            value={form.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating..." : "Signup"}
        </button>
      </form>

      <p className="mt-5 text-sm text-zinc-600">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-rose-600">
          Login
        </Link>
      </p>
    </section>
  );
}

export default Signup;
