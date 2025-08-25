const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const originalFetch = window.fetch;
window.fetch = async (input, init) => {
  if (typeof input === "string" && input.startsWith("/api")) {
    input = API_BASE_URL + input; // keep /api
  }
  return originalFetch(input, init);
};
