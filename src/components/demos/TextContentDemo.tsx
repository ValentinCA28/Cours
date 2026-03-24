"use client";

import { useState, useRef, useCallback } from "react";

const DEFAULT_TEXT = "Contenu original — modifie-moi !";

export default function TextContentDemo() {
  const [input, setInput] = useState("");
  const [method, setMethod] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleTextContent = useCallback(() => {
    if (!outputRef.current) return;
    outputRef.current.textContent = input || DEFAULT_TEXT;
    setMethod("textContent");
  }, [input]);

  const handleInnerHTML = useCallback(() => {
    if (!outputRef.current) return;
    outputRef.current.innerHTML = `<b>${input || DEFAULT_TEXT}</b>`;
    setMethod("innerHTML");
  }, [input]);

  const handleReset = useCallback(() => {
    if (!outputRef.current) return;
    outputRef.current.textContent = DEFAULT_TEXT;
    setInput("");
    setMethod(null);
  }, []);

  return (
    <div className="space-y-4">
      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tape du texte ou du HTML (ex: <b>gras</b>)…"
        className="w-full bg-code-bg border border-border rounded-lg px-3 py-2 text-sm font-mono text-text placeholder:text-muted/50 outline-none focus:border-accent transition-colors"
      />

      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleTextContent}
          className="bg-accent hover:bg-accent2 text-bg font-semibold text-sm rounded-lg px-4 py-2 transition-colors"
        >
          textContent
        </button>
        <button
          onClick={handleInnerHTML}
          className="bg-surface2 hover:bg-border border border-border text-text text-sm rounded-lg px-4 py-2 transition-colors"
        >
          innerHTML (avec &lt;b&gt;)
        </button>
        <button
          onClick={handleReset}
          className="bg-surface2 hover:bg-border border border-border text-text text-sm rounded-lg px-4 py-2 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Output */}
      <div
        ref={outputRef}
        className="bg-code-bg border border-border rounded-lg p-4 text-sm min-h-[48px]"
      >
        {DEFAULT_TEXT}
      </div>

      {/* Method indicator */}
      {method && (
        <p className="text-xs font-mono text-muted">
          Méthode utilisée :{" "}
          <span className="text-accent">{method}</span>
        </p>
      )}
    </div>
  );
}
