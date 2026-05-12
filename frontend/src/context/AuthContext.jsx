import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/api";

const AuthContext = createContext(null);

function normalizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    ...user,
    _id: user._id || user.id,
    id: user.id || user._id,
  };
}

function readStoredUser() {
  try {
    return normalizeUser(JSON.parse(localStorage.getItem("homigoUser")));
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
        const normalizedUser = normalizeUser(data.user);
        setUser(normalizedUser);
        localStorage.setItem("homigoUser", JSON.stringify(normalizedUser));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("homigoUser");
      })
      .finally(() => setLoading(false));
  }, []);

  function saveSession(data) {
    const normalizedUser = normalizeUser(data.user);
    setUser(normalizedUser);
    localStorage.setItem("homigoUser", JSON.stringify(normalizedUser));
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

  async function updateProfile(formData) {
    const { data } = await api.put("/auth/profile", formData);
    saveSession(data);
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      signup,
      login,
      logout,
      updateProfile,
      isLoggedIn: Boolean(user),
    }),
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
