const rawBase = import.meta.env.VITE_API_BASE_URL || "https://api.lul-ae.com";
const API_BASE = rawBase.replace(/\/+$/, "");

export function apiUrl(path = "") {
  const cleanPath = String(path).replace(/^\/+/, "");
  return `${API_BASE}/${cleanPath}`;
}
