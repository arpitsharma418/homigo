import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/api";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("homigoUser"));
  } catch (error) {
    return null;
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem("homigoUser", JSON.stringify(data.user));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("homigoUser");
      })
      .finally(() => setLoading(false));
  }, []);

  function saveSession(data) {
    setUser(data.user);
    localStorage.setItem("homigoUser", JSON.stringify(data.user));
  }

  async function signup(formData) {
    const { data } = await api.post("/auth/signup", formData);
    saveSession(data);
  }

  async function login(formData) {
    const { data } = await api.post("/auth/login", formData);
    saveSession(data);
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Local cleanup should still happen even if the session is already gone.
    }

    setUser(null);
    localStorage.removeItem("homigoUser");
  }

  const value = useMemo(
    () => ({ user, loading, signup, login, logout, isLoggedIn: Boolean(user) }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}

export { AuthProvider, useAuth };
