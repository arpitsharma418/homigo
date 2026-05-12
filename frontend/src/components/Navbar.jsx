import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserRound } from "lucide-react";

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
        <Link to="/" className="text-xl font-bold text-rose-600 flex items-center gap-2">
          <img src="/public/Gemini_Generated_Image_.png" alt="" className="h-10 w-10 rounded-lg" />
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
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 ${isActive ? "text-rose-600" : "text-zinc-700 hover:text-zinc-950"}`
                }
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-zinc-100" title={user.fullName}>
                  {user.avatar?.url ? (
                    <img
                      src={user.avatar.url}
                      alt={`${user.username} profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound className="h-5 w-5 text-zinc-500" />
                  )}
                </div>
              </NavLink>
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
