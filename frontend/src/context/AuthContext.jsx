
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged-in user
  const checkUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  // Login
  const login = async (credentials) => {
    const { data } = await api.post(
      "/auth/login",
      credentials
    );

    setUser(data.user);
    return data;
  };

  // Register
  const register = async (userData) => {
    const { data } = await api.post(
      "/auth/register",
      userData
    );

    setUser(data.user);
    return data;
  };

  // Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
