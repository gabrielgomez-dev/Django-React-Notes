import { createContext, useContext, useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { jwtDecode } from "jwt-decode";
import api from "../../api";

const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const decodedToken = jwtDecode(token);

    const tokenExpiration = decodedToken.exp;

    const currentTime = Date.now() / 1000;

    if (tokenExpiration < currentTime) {
      try {
        await refreshToken();
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(true);
    }

  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const response = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (response.status !== 200) {
        setIsAuthenticated(false);
        throw new Error("Cannot refresh the token");
      }

      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
