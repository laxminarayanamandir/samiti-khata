export default function getBaseUrl() {
  const baseURL =
    import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/v2";

  return baseURL;
}
