// Strip trailing slashes once at startup
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "");

const originalFetch = window.fetch;

window.fetch = async (input, init) => {
  if (typeof input === "string" && input.startsWith("/api")) {
    // input already starts with /api → no need to add extra slash
    input = API_BASE_URL + input;
  }
  return originalFetch(input, init);
};
