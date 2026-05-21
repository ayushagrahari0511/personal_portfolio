import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://api.tvareet.com/api";

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});
