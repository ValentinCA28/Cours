"use client";

import { useState, useRef, useCallback } from "react";

const COLORS = ["#f97316", "#60a5fa", "#4ade80", "#c084fc", "#f472b6", "#fbbf24"];

export default function StyleDemo() {
  const [colorIndex, setColorIndex] = useState(0);
  const [hasBorder, setHasBorder] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((entry: string) => {
    setLogs((prev) => [entry, ...prev].slice(0, 8));
  }, []);

  const handleColor = useCallback(() => {
    const next = (colorIndex + 1) % COLORS.length;
    setColorIndex(next);
    if (boxRef.current) {
      boxRef.current.style.color = COLORS[next];
    }
    addLog(`style.color = "${COLORS[next]}"`);
  }, [colorIndex, addLog]);

  const handleSize = useCallback(() => {
    const size = Math.floor(Math.random() * 9) + 14; // 14-22
    if (boxRef.current) {
      boxRef.current.style.fontSize = `${size}px`;
    }
    addLog(`style.fontSize = "${size}px"`);
  }, [addLog]);

  const handleBorder = useCallback(() => {
    const next = !hasBorder;
    setHasBorder(next);
    if (boxRef.current) {
      boxRef.current.style.outline = next ? "2px solid #f97316" : "none";
    }
    addLog(`style.outline = "${next ? "2px solid #f97316" : "none"}"`);
  }, [hasBorder, addLog]);

  const handleReset = useCallback(() => {
    setColorIndex(0);
    setHasBorder(false);
    setLogs([]);
    if (boxRef.current) {
      boxRef.current.style.color = "";
      boxRef.current.style.fontSize = "";
      boxRef.current.style.outline = "";
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleColor}
          className="bg-accent hover:bg-accent2 text-bg font-semibold text-sm rounded-lg px-4 py-2 transition-colors"
        >
          Changer couleur
        </button>
        <button
          onClick={handleSize}
          className="bg-accent hover:bg-accent2 text-bg font-semibold text-sm rounded-lg px-4 py-2 transition-colors"
        >
          Changer taille
        </button>
        <button
          onClick={handleBorder}
          className="bg-surface2 hover:bg-border border border-border text-text text-sm rounded-lg px-4 py-2 transition-colors"
        >
          Border toggle
        </button>
        <button
          onClick={handleReset}
          className="bg-surface2 hover:bg-border border border-border text-text text-sm rounded-lg px-4 py-2 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Target box */}
      <div
        ref={boxRef}
        className="bg-code-bg border border-border rounded-lg p-6 text-center transition-all duration-300"
      >
        Je suis un élément stylisé dynamiquement !
      </div>

      {/* Log */}
      {logs.length > 0 && (
        <div className="bg-code-bg border border-border rounded-lg p-3 space-y-1">
          <p className="text-xs font-mono uppercase tracking-wider text-muted mb-2">
            Journal CSS
          </p>
          {logs.map((log, i) => (
            <p key={i} className="text-xs font-mono text-accent">
              {log}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
