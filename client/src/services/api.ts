export interface ApiHealth {
  status: string;
  message: string;
  timestamp: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export async function getApiHealth(): Promise<ApiHealth> {
  const response = await fetch(`${API_URL}/api/v1/health`);
  if (!response.ok) {
    throw new Error("DevFlow API is not reachable");
  }
  return response.json() as Promise<ApiHealth>;
}