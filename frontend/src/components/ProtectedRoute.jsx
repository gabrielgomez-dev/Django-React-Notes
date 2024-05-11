import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { jwtDecode } from "jwt-decode";
import api from "../../api";

/**
 * Component that checks if the user is authorized to access the route.
 * If the user is authorized, render the children.
 * If the user is not authorized, redirect the user to the login page.
 * @param {Object} children - The children to render if the user is authorized.
 * @returns {JSX.Element} - The children if the user is authorized, or the login page if the user is not authorized.
 * @example
 * return <ProtectedRoute>Home</ProtectedRoute>;
 * @example
 * return <ProtectedRoute>Profile</ProtectedRoute>;
 */
export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  // As soon as the component is up, check if the user is authorized
  useEffect(() => {
    checkAuth();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      // Send a request to the backend to refresh the token
      const response = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      // If the response status is not 200, throw an error
      if (response.status !== 200) {
        setIsAuthorized(false);
        throw new Error("Cannot refresh the token");
      }

      // Save the new access token in the local storage
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      setIsAuthorized(true);
    } catch (error) {
      // If the refresh token is invalid, the user is not authorized
      setIsAuthorized(false);
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decodedToken = jwtDecode(token);

    const tokenExpiration = decodedToken.exp;

    const currentTime = Date.now() / 1000; 

    // If the token is expired, refresh the token
    if (tokenExpiration < currentTime) {
      try {
        // Try to refresh the token if it is expired
        await refreshToken();
      } catch (error) {
        // If the token cannot be refreshed, the user is not authorized
        setIsAuthorized(false);
      }
    } else {
      // If the token is not expired, the user is authorized
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) return <div>Loading...</div>;

  return isAuthorized ? children : <Navigate to="/login" />;
}
