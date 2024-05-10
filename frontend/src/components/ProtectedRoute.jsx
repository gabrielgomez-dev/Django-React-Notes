import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { jwtDecode } from "jwt-decode";
import api from "../../api";

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  // As soon as the component is up, check if the user is authorized
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Refresh the token if it is expired.
   * If the token is expired, send a request to the backend to refresh the token.
   * If the response status is not 200, throw an error.
   * Save the new access token in the local storage.
   * If the refresh token is invalid, the user is not authorized.
   */
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

  /**
   * Check if the user is authorized to access the route.
   * Look at the access token in the local storage.
   * If there is an access token in the local storage, check if it is valid.
   * If it is valid, check if it is expired.
   * If not valid, try to refresh the token.
   */
  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decodedToken = jwtDecode(token);

    const tokenExpiration = decodedToken.exp;

    const currentTime = Date.now() / 1000; // To get the current time in seconds

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

  if (isAuthorized === null) <div>Loading...</div>;

  return isAuthorized ? children : <Navigate to="/login" />;
}
