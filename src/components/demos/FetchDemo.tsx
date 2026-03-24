"use client";

import { useState, useCallback } from "react";

interface FetchResult {
  status: number | null;
  time: number;
  data: string | null;
  error: string | null;
}

export default function FetchDemo() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FetchResult | null>(null);

  const doFetch = useCallback(async (url: string, simulateError = false) => {
    setLoading(true);
    setResult(null);

    const start = performance.now();

    try {
      const res = await fetch(url);
      const elapsed = Math.round(performance.now() - start);
      const data = await res.json();

      // Simulate error for the /posts/99999 endpoint (returns empty-ish object)
      if (simulateError && (!data || Object.keys(data).length === 0 || !res.ok)) {
        setResult({
          status: 404,
          time: elapsed,
          data: null,
          error: "Ressource introuvable (404)",
        });
      } else {
        setResult({
          status: res.status,
          time: elapsed,
          data: JSON.stringify(data, null, 2),
          error: null,
        });
      }
    } catch (err) {
      const elapsed = Math.round(performance.now() - start);
      setResult({
        status: null,
        time: elapsed,
        data: null,
        error: err instanceof Error ? err.message : "Erreur inconnue",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => doFetch("https://jsonplaceholder.typicode.com/users/1")}
          disabled={loading}
          className="bg-accent hover:bg-accent2 text-bg font-semibold text-sm rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
        >
          Charger un user
        </button>
        <button
          onClick={() => doFetch("https://jsonplaceholder.typicode.com/posts/1")}
          disabled={loading}
          className="bg-accent hover:bg-accent2 text-bg font-semibold text-sm rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
        >
          Charger un post
        </button>
        <button
          onClick={() =>
            doFetch("https://jsonplaceholder.typicode.com/posts/99999", true)
          }
          disabled={loading}
          className="bg-surface2 hover:bg-border border border-border text-text text-sm rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
        >
          Simuler une erreur
        </button>
      </div>

      {/* Status line */}
      {loading && (
        <p className="text-sm font-mono text-yellow animate-pulse">
          Chargement…
        </p>
      )}

      {result && (
        <p className="text-sm font-mono">
          <span className={result.error ? "text-pink" : "text-green"}>
            {result.status !== null ? `HTTP ${result.status}` : "Erreur réseau"}
          </span>
          <span className="text-muted"> — {result.time} ms</span>
        </p>
      )}

      {/* Output area */}
      {result && (
        <div className="bg-code-bg border border-border rounded-lg p-4 overflow-x-auto max-h-[320px] overflow-y-auto">
          {result.error ? (
            <p className="text-sm font-mono text-pink">{result.error}</p>
          ) : (
            <pre className="text-xs font-mono text-green whitespace-pre-wrap">
              {result.data}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
