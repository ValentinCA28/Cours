"use client";

import { useState, useCallback } from "react";

interface LogEntry {
  id: number;
  type: string;
  detail: string;
}

let nextId = 0;

export default function EventLogDemo() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((type: string, detail: string) => {
    setLogs((prev) =>
      [{ id: nextId++, type, detail }, ...prev].slice(0, 10)
    );
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      addLog("click", `clientX: ${e.clientX}, clientY: ${e.clientY}`);
    },
    [addLog]
  );

  const handleDblClick = useCallback(
    (e: React.MouseEvent) => {
      addLog("dblclick", `clientX: ${e.clientX}, clientY: ${e.clientY}`);
    },
    [addLog]
  );

  const handleMouseEnter = useCallback(() => {
    addLog("mouseenter", "→ entré dans la zone");
  }, [addLog]);

  const handleMouseLeave = useCallback(() => {
    addLog("mouseleave", "← sorti de la zone");
  }, [addLog]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      addLog("keydown", `key: "${e.key}", code: "${e.code}"`);
    },
    [addLog]
  );

  return (
    <div className="space-y-4">
      {/* Interactive zone */}
      <div
        onClick={handleClick}
        onDoubleClick={handleDblClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="border-2 border-dashed border-border hover:border-accent rounded-lg p-8 flex items-center justify-center cursor-pointer transition-colors select-none"
      >
        <span className="text-sm text-muted">
          Clique, double-clique ou survole cette zone
        </span>
      </div>

      {/* Keyboard input */}
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Tape ici pour capturer les événements clavier…"
        className="w-full bg-code-bg border border-border rounded-lg px-3 py-2 text-sm font-mono text-text placeholder:text-muted/50 outline-none focus:border-accent transition-colors"
      />

      {/* Controls */}
      <button
        onClick={() => setLogs([])}
        className="bg-surface2 hover:bg-border border border-border text-text text-sm rounded-lg px-4 py-2 transition-colors"
      >
        Effacer log
      </button>

      {/* Log area */}
      <div className="bg-code-bg border border-border rounded-lg p-3 min-h-[80px]">
        {logs.length === 0 ? (
          <p className="text-xs text-muted font-mono">Aucun événement…</p>
        ) : (
          <div className="space-y-1">
            {logs.map((log) => (
              <p key={log.id} className="text-xs font-mono">
                <span className="text-accent font-semibold">{log.type}</span>{" "}
                <span className="text-muted">{log.detail}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
