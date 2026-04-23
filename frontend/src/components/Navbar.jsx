import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) =>
  `text-sm font-medium ${isActive ? "text-rose-600" : "text-zinc-700 hover:text-zinc-950"}`;

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link to="/" className="text-xl font-bold text-rose-600">
          Homigo
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <NavLink to="/" className={linkClass}>
            Explore
          </NavLink>
          {user && (
            <NavLink to="/listings/new" className={linkClass}>
              Add home
            </NavLink>
          )}

          {user ? (
            <>
              <span className="text-sm text-zinc-600">Hi, {user.username}</span>
              <button type="button" onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <Link to="/signup" className="btn-primary">
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
