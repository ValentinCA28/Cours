"use client";

import { useState, useRef, useCallback } from "react";

declare function loadPyodide(): Promise<any>;

// ---------------------------------------------------------------------------
// Global singleton: Pyodide is loaded once and shared across all exercises
// ---------------------------------------------------------------------------
let pyodideInstance: any = null;
let pyodideLoadingPromise: Promise<any> | null = null;

function ensurePyodideScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[data-pyodide]')) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";
    script.setAttribute("data-pyodide", "true");
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Impossible de charger Pyodide depuis le CDN."));
    document.head.appendChild(script);
  });
}

async function getPyodide(): Promise<any> {
  if (pyodideInstance) return pyodideInstance;

  if (!pyodideLoadingPromise) {
    pyodideLoadingPromise = (async () => {
      await ensurePyodideScript();
      const instance = await loadPyodide();
      pyodideInstance = instance;
      return instance;
    })();
  }

  return pyodideLoadingPromise;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface PythonExerciseProps {
  instruction: string;
  starterCode: string;
  solution: string;
  expectedOutput?: string;
}

type LoadState = "not loaded" | "loading" | "ready";

export default function PythonExercise({
  instruction,
  starterCode,
  solution,
  expectedOutput,
}: PythonExerciseProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "fail">("idle");
  const [showSolution, setShowSolution] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>(
    pyodideInstance ? "ready" : "not loaded",
  );
  const [running, setRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ------ Run Python code ------
  const handleRun = useCallback(async () => {
    setOutput(null);
    setError(null);
    setStatus("idle");
    setRunning(true);

    try {
      // Load Pyodide if needed
      if (!pyodideInstance) {
        setLoadState("loading");
      }
      const pyodide = await getPyodide();
      setLoadState("ready");

      // Redirect stdout
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);

      // Run user code
      try {
        pyodide.runPython(code);
      } catch (e: any) {
        // Capture Python exceptions
        const stderr = pyodide.runPython("sys.stderr.getvalue()") as string;
        const msg = stderr || (e.message ?? String(e));
        // Clean up long traceback — keep only the last meaningful line
        const lines = msg.split("\n").filter((l: string) => l.trim());
        const shortMsg = lines.length > 3 ? lines.slice(-3).join("\n") : msg;
        setError(shortMsg);
        setRunning(false);
        // Reset stdout/stderr
        pyodide.runPython("sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__");
        return;
      }

      // Capture output
      const captured = pyodide.runPython("sys.stdout.getvalue()") as string;
      // Reset stdout/stderr
      pyodide.runPython("sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__");

      setOutput(captured);

      // Validate
      if (expectedOutput !== undefined) {
        setStatus(
          captured.trim() === expectedOutput.trim() ? "success" : "fail",
        );
      }
    } catch (e: any) {
      setError(e.message ?? String(e));
    } finally {
      setRunning(false);
    }
  }, [code, expectedOutput]);

  // ------ Reset ------
  const handleReset = useCallback(() => {
    setCode(starterCode);
    setOutput(null);
    setError(null);
    setStatus("idle");
  }, [starterCode]);

  // ------ Tab key support ------
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = textareaRef.current;
        if (!ta) return;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const value = ta.value;
        const newValue = value.substring(0, start) + "    " + value.substring(end);
        setCode(newValue);
        // Restore cursor position after React re-render
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 4;
        });
      }
    },
    [],
  );

  // ------ Button label ------
  const runLabel =
    loadState === "loading" || running
      ? "⏳ Chargement de Python..."
      : "▶ Exécuter";

  return (
    <div className="bg-surface border border-border rounded-xl p-5 my-6">
      {/* Label */}
      <span className="font-mono text-xs uppercase tracking-wider text-blue mb-1 block">
        🐍 Exercice Python
      </span>

      {/* Instruction */}
      <p className="text-sm text-text mb-3">{instruction}</p>

      {/* Code editor */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="bg-code-bg border border-border rounded-lg p-4 font-mono text-[13px] text-text w-full resize-y"
        style={{ minHeight: 120 }}
      />

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 mt-3">
        <button
          onClick={handleRun}
          disabled={running || loadState === "loading"}
          className="px-4 py-1.5 rounded-lg bg-blue text-bg text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60 disabled:cursor-wait"
        >
          {runLabel}
        </button>
        <button
          onClick={() => setShowSolution((s) => !s)}
          className="px-4 py-1.5 rounded-lg bg-surface2 text-text text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          {showSolution ? "Masquer la solution" : "Voir la solution"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-1.5 rounded-lg bg-surface2 text-text text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          Réinitialiser
        </button>
      </div>

      {/* Loading overlay (first load only) */}
      {loadState === "loading" && (
        <div className="mt-3 bg-code-bg rounded-lg p-4 flex items-center gap-3">
          <span className="inline-flex">
            <span className="animate-pulse text-muted text-sm">
              ⏳ Chargement de Python (~5 MB, première fois uniquement)
              <span className="inline-block w-6 text-left animate-[dots_1.4s_steps(4,end)_infinite]">
                ...
              </span>
            </span>
          </span>
          <style>{`
            @keyframes dots {
              0% { content: ""; }
              25% { content: "."; }
              50% { content: ".."; }
              75% { content: "..."; }
            }
          `}</style>
        </div>
      )}

      {/* Output */}
      {(output !== null || error !== null) && loadState !== "loading" && (
        <div className="mt-3 space-y-3">
          {error ? (
            <div className="bg-code-bg rounded-lg p-3 font-mono text-[13px]">
              <p className="text-pink whitespace-pre-wrap">❌ Erreur : {error}</p>
            </div>
          ) : (
            <>
              {/* Python output */}
              {output !== null && (
                <div className="bg-code-bg rounded-lg p-3 font-mono text-[13px]">
                  <span className="text-xs text-muted uppercase tracking-wider block mb-2">
                    🐍 Sortie Python
                  </span>
                  <pre className="text-green whitespace-pre-wrap m-0 p-0 bg-transparent border-0">
                    {output || "(aucune sortie)"}
                  </pre>
                </div>
              )}

              {/* Validation */}
              {status === "success" && (
                <div className="bg-green/10 border border-green/20 rounded-lg px-3 py-2">
                  <p className="text-green text-sm font-medium">✅ Correct !</p>
                </div>
              )}
              {status === "fail" && (
                <div className="bg-pink/10 border border-pink/20 rounded-lg px-3 py-2 space-y-1">
                  <p className="text-pink text-sm font-medium">❌ Pas tout à fait...</p>
                  <p className="text-sm text-muted">
                    Attendu : <code className="text-text">{expectedOutput}</code>
                  </p>
                  <p className="text-sm text-muted">
                    Obtenu : <code className="text-text">{output?.trim()}</code>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Solution */}
      {showSolution && (
        <div className="bg-code-bg border border-border rounded-lg p-4 mt-3">
          <span className="text-xs text-muted font-mono uppercase tracking-wider block mb-2">
            Solution
          </span>
          <pre className="whitespace-pre-wrap font-mono text-[13px] text-green m-0 p-0 bg-transparent border-0">
            {solution}
          </pre>
        </div>
      )}
    </div>
  );
}
