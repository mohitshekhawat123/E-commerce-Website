export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const customFetch = async (endpoint, options = {}) => {
  // If the endpoint is already a full URL, use it directly, else prepend BASE_URL
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  // Default options for fetch
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // This ensures cookies are sent with requests
  };

  try {
    let response = await fetch(url, config);

    // If unauthorized (token expired), try refreshing the token
    if (response.status === 401) {
      const refreshResponse = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshResponse.ok) {
        // Token refreshed successfully, retry original request
        response = await fetch(url, config);
      } else {
        // Refresh failed, logout user
        await fetch(`${BASE_URL}/api/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        window.location.href = "/login"; // Redirect to login
        throw new Error("Session expired. Please log in again.");
      }
    }

    return response;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

export default customFetch;
