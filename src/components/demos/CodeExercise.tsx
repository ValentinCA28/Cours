"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface CodeExerciseProps {
  id?: string;
  instruction?: string;
  starterCode?: string;
  solution?: string;
  expectedOutput?: string;
  htmlSetup?: string;
  validate?: "console" | "dom";
  exerciseData?: {
    instruction: string;
    starterCode: string;
    solution: string;
    htmlSetup: string;
    expectedOutput?: string;
    validate: "console" | "dom";
  };
}

interface IframeResult {
  logs: string[];
  dom: string;
  error: string | null;
}

export default function CodeExercise(props: CodeExerciseProps) {
  // Resolve exercise data: from exerciseData prop (passed by wrapper) or direct props
  const data = props.exerciseData || {
    instruction: props.instruction || "",
    starterCode: props.starterCode || "",
    solution: props.solution || "",
    htmlSetup: props.htmlSetup || "",
    expectedOutput: props.expectedOutput,
    validate: props.validate || "console",
  };

  const { instruction, starterCode, solution, htmlSetup, expectedOutput, validate } = data;

  const [code, setCode] = useState(starterCode);
  const [result, setResult] = useState<IframeResult | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "fail">("idle");
  const [showSolution, setShowSolution] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.__codeExercise) {
        const d = event.data as IframeResult & { __codeExercise: true };
        setResult({ logs: d.logs, dom: d.dom, error: d.error });

        if (expectedOutput) {
          const actual =
            validate === "console" ? d.logs.join("\n") : d.dom.trim();
          setStatus(actual.trim() === expectedOutput.trim() ? "success" : "fail");
        } else {
          setStatus("idle");
        }
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [expectedOutput, validate]);

  const handleRun = useCallback(() => {
    setResult(null);
    setStatus("idle");

    const srcdoc = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
${htmlSetup}
<script>
(function() {
  var __logs = [];
  var __origLog = console.log;
  var __origWarn = console.warn;
  var __origError = console.error;
  console.log = function() {
    var args = Array.prototype.slice.call(arguments);
    __logs.push(args.map(function(a) {
      return typeof a === "object" ? JSON.stringify(a) : String(a);
    }).join(" "));
    __origLog.apply(console, arguments);
  };
  console.warn = function() {
    var args = Array.prototype.slice.call(arguments);
    __logs.push("[warn] " + args.map(function(a) {
      return typeof a === "object" ? JSON.stringify(a) : String(a);
    }).join(" "));
    __origWarn.apply(console, arguments);
  };
  console.error = function() {
    var args = Array.prototype.slice.call(arguments);
    __logs.push("[error] " + args.map(function(a) {
      return typeof a === "object" ? JSON.stringify(a) : String(a);
    }).join(" "));
    __origError.apply(console, arguments);
  };

  var __error = null;
  try {
    ${code}
  } catch(e) {
    __error = e.message || String(e);
  }

  function __sendResults() {
    parent.postMessage({
      __codeExercise: true,
      logs: __logs,
      dom: document.body.innerHTML,
      error: __error
    }, "*");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      setTimeout(__sendResults, 300);
    });
  } else {
    setTimeout(__sendResults, 300);
  }
})();
</script>
</body>
</html>`;

    if (iframeRef.current) {
      iframeRef.current.srcdoc = srcdoc;
    }
  }, [code, htmlSetup]);

  const handleReset = useCallback(() => {
    setCode(starterCode);
    setResult(null);
    setStatus("idle");
  }, [starterCode]);

  const displayOutput = result
    ? validate === "console"
      ? result.logs.join("\n")
      : result.dom.trim()
    : null;

  return (
    <div className="bg-surface border border-border rounded-xl p-5 my-6">
      <span className="font-mono text-xs uppercase tracking-wider text-accent mb-1 block">
        📝 Exercice
      </span>

      <p className="text-sm text-text mb-3">{instruction}</p>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="bg-code-bg border border-border rounded-lg p-4 font-mono text-[13px] text-text w-full resize-y"
        style={{ minHeight: 80 }}
      />

      <div className="flex flex-wrap gap-2 mt-3">
        <button
          onClick={handleRun}
          className="px-4 py-1.5 rounded-lg bg-accent text-bg text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          ▶ Exécuter
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

      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        style={{ display: "none" }}
        title="code-exercise-sandbox"
      />

      {result && (
        <div className="bg-code-bg rounded-lg p-3 font-mono text-[13px] mt-3">
          {result.error ? (
            <p className="text-pink">❌ Erreur : {result.error}</p>
          ) : (
            <>
              {displayOutput && (
                <pre className="whitespace-pre-wrap text-text m-0">
                  {displayOutput}
                </pre>
              )}
              {status === "success" && (
                <p className="text-green mt-2">✅ Correct !</p>
              )}
              {status === "fail" && (
                <p className="text-pink mt-2">
                  ❌ Pas tout à fait... Résultat attendu :{" "}
                  <code className="text-muted">{expectedOutput}</code>
                </p>
              )}
            </>
          )}
        </div>
      )}

      {showSolution && (
        <div className="bg-code-bg border border-border rounded-lg p-4 mt-3">
          <span className="text-xs text-muted font-mono uppercase tracking-wider block mb-2">
            Solution
          </span>
          <pre className="whitespace-pre-wrap font-mono text-[13px] text-green m-0 p-0 bg-transparent border-0">{solution}</pre>
        </div>
      )}
    </div>
  );
}
