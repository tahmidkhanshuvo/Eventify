// src/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Patch global fetch to always prepend base URL for relative `/api/...` calls
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
  if (typeof input === "string" && input.startsWith("/api")) {
    input = API_BASE_URL + input.replace(/^\/api/, "");
  }
  return originalFetch(input, init);
};

export { API_BASE_URL };
