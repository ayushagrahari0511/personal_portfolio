import { apiClient } from "./apiClient";

export async function getPublishedPortfolio() {
  try {
    const res = await apiClient.get("/portfolio/public");
    return res?.data?.data ?? [];
  } catch {
    return [];
  }
}
