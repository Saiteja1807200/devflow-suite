import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export default function App() {
  const [health, setHealth] = useState("Checking API...");

  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("API returned an error");
        }
        return response.json();
      })
      .then((data) => setHealth(data.message))
      .catch(() => setHealth("API is not reachable yet"));
  }, []);

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">MERN Starter</p>
        <h1>Build your full stack app from here.</h1>
        <p className="summary">
          React is ready on the frontend, Express is ready on the backend, and
          MongoDB wiring is in place for your first feature.
        </p>
      </section>

      <section className="status-panel" aria-label="API status">
        <span className="status-dot" />
        <div>
          <p className="status-label">API status</p>
          <p className="status-value">{health}</p>
        </div>
      </section>
    </main>
  );
}
