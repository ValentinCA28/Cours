"use client";

import { useState, useRef, useCallback } from "react";

const SAMPLE_HTML = `<div id="content">
  <p>Un paragraphe normal</p>
  <p class="rouge">Paragraphe rouge</p>
  <ul>
    <li>Élément 1</li>
    <li class="rouge">Élément 2 (rouge)</li>
    <li>Élément 3</li>
  </ul>
  <p>Texte avec <span>un span</span></p>
</div>`;

export default function SelectorDemo() {
  const [selector, setSelector] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const containerRef = useRef<HTMLDivElement>(null);

  const clearHighlights = useCallback(() => {
    if (!containerRef.current) return;
    const all = containerRef.current.querySelectorAll("[data-demo-el]");
    all.forEach((el) => {
      (el as HTMLElement).style.backgroundColor = "";
    });
  }, []);

  const handleApply = useCallback(() => {
    if (!containerRef.current || !selector.trim()) return;

    clearHighlights();

    try {
      const matches = containerRef.current.querySelectorAll(selector.trim());
      if (matches.length === 0) {
        setMessage("Aucun élément trouvé");
        setMessageType("error");
      } else {
        matches.forEach((el) => {
          (el as HTMLElement).style.backgroundColor = "rgba(249, 115, 22, 0.25)";
        });
        setMessage(`${matches.length} élément(s) trouvé(s)`);
        setMessageType("success");
      }
    } catch {
      setMessage("Sélecteur invalide");
      setMessageType("error");
    }
  }, [selector, clearHighlights]);

  const handleReset = useCallback(() => {
    clearHighlights();
    setSelector("");
    setMessage(null);
  }, [clearHighlights]);

  return (
    <div className="space-y-4">
      {/* Input row */}
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleApply()}
          placeholder='Ex: .rouge, ul li, p span…'
          className="flex-1 min-w-[200px] bg-code-bg border border-border rounded-lg px-3 py-2 text-sm font-mono text-text placeholder:text-muted/50 outline-none focus:border-accent transition-colors"
        />
        <button
          onClick={handleApply}
          className="bg-accent hover:bg-accent2 text-bg font-semibold text-sm rounded-lg px-4 py-2 transition-colors"
        >
          Appliquer
        </button>
        <button
          onClick={handleReset}
          className="bg-surface2 hover:bg-border border border-border text-text text-sm rounded-lg px-4 py-2 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Result message */}
      {message && (
        <p
          className={`text-sm font-mono ${
            messageType === "success" ? "text-green" : "text-pink"
          }`}
        >
          {message}
        </p>
      )}

      {/* Sample HTML */}
      <div
        ref={containerRef}
        className="bg-code-bg border border-border rounded-lg p-4 font-mono text-sm space-y-2"
      >
        <p data-demo-el>Un paragraphe normal</p>
        <p data-demo-el className="rouge" style={{ color: "#f87171" }}>
          Paragraphe rouge
        </p>
        <ul data-demo-el className="list-disc pl-5 space-y-1">
          <li data-demo-el>Élément 1</li>
          <li data-demo-el className="rouge" style={{ color: "#f87171" }}>
            Élément 2 (rouge)
          </li>
          <li data-demo-el>Élément 3</li>
        </ul>
        <p data-demo-el>
          Texte avec <span data-demo-el className="text-blue">un span</span>
        </p>
      </div>

      {/* Source hint */}
      <pre className="bg-code-bg border border-border rounded-lg p-3 text-xs text-muted overflow-x-auto">
        <code>{SAMPLE_HTML}</code>
      </pre>
    </div>
  );
}
