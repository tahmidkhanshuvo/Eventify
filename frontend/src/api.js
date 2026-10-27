// Strip trailing slashes once at startup
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(
  /\/+$/,
  "",
);

const originalFetch = window.fetch;

window.fetch = async (input, init) => {
  if (typeof input === "string" && input.startsWith("/api")) {
    // input already starts with /api → no need to add extra slash
    input = API_BASE_URL + input;
    const headers = new Headers(init?.headers);
    const token = localStorage.getItem("token");
    if (token && token !== "cookie")
      headers.set("Authorization", `Bearer ${token}`);
    init = {
      ...init,
      headers,
      credentials: "include",
      signal: init?.signal || AbortSignal.timeout(90000),
    };
  }
  return originalFetch(input, init);
};
