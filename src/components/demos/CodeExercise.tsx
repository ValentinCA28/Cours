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
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.__codeExercise) {
        const d = event.data as IframeResult & { __codeExercise: true };
        setResult({ logs: d.logs, dom: d.dom, error: d.error });

        // Show DOM preview for any exercise that has htmlSetup
        if (htmlSetup && !d.error) {
          setPreviewHtml(d.dom);
        }

        if (expectedOutput) {
          const actual =
            validate === "console" ? d.logs.join("\n") : d.dom.trim();
          setStatus(actual.trim() === expectedOutput.trim() ? "success" : "fail");
        } else if (!d.error) {
          // For DOM exercises without expectedOutput, show success if no error
          setStatus(validate === "dom" ? "success" : "idle");
        }
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [expectedOutput, validate, htmlSetup]);

  const handleRun = useCallback(() => {
    setResult(null);
    setStatus("idle");
    setPreviewHtml(null);

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
    var __dom = document.body.innerHTML.replace(/<script[\\s\\S]*?<\\/script>/gi, '').trim();
    parent.postMessage({
      __codeExercise: true,
      logs: __logs,
      dom: __dom,
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
    setPreviewHtml(null);
  }, [starterCode]);

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

      {/* Hidden iframe for code execution */}
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        style={{ display: "none" }}
        title="code-exercise-sandbox"
      />

      {/* Results */}
      {result && (
        <div className="mt-3 space-y-3">
          {result.error ? (
            <div className="bg-code-bg rounded-lg p-3 font-mono text-[13px]">
              <p className="text-pink">❌ Erreur : {result.error}</p>
            </div>
          ) : (
            <>
              {/* Console output */}
              {validate === "console" && result.logs.length > 0 && (
                <div className="bg-code-bg rounded-lg p-3 font-mono text-[13px]">
                  <span className="text-xs text-muted uppercase tracking-wider block mb-2">
                    Console
                  </span>
                  {result.logs.map((log, i) => (
                    <div key={i} className="text-text">
                      <span className="text-muted mr-2">›</span>
                      {log}
                    </div>
                  ))}
                </div>
              )}

              {/* DOM visual preview — shown for any exercise with htmlSetup */}
              {previewHtml && (
                <div className="rounded-lg border border-border overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-surface2 border-b border-border">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-pink/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green/60" />
                    </div>
                    <span className="text-[10px] text-muted font-mono uppercase tracking-wider">
                      Résultat DOM
                    </span>
                  </div>
                  <iframe
                    srcDoc={`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: system-ui, sans-serif; font-size: 14px; color: #e2e8f0; background: #0d0f17; padding: 16px; margin: 0; line-height: 1.5; }
  * { box-sizing: border-box; transition: all 0.2s ease; }
  div, p, span, h1, h2, h3, h4, h5, h6 { margin: 4px 0; }
  ul, ol { padding-left: 20px; margin: 4px 0; }
  li { padding: 2px 0; }
  a { color: #60a5fa; text-decoration: underline; }
  button { background: #f97316; color: white; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 13px; }
  input, textarea, select { background: #1c2030; border: 1px solid #252a3d; border-radius: 6px; padding: 6px 10px; color: #e2e8f0; font-size: 13px; }
  form { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .card, .box, .container, .menu, .target, .inner, .parent, .post, article {
    border: 1px dashed #252a3d; border-radius: 8px; padding: 10px; margin: 6px 0;
  }
  .active { border-color: #f97316; background: rgba(249,115,22,0.1); }
  .visible { opacity: 1; }
  .hidden { opacity: 0.3; }
  .selected { border-color: #60a5fa; background: rgba(96,165,250,0.1); }
  .open { border-color: #4ade80; background: rgba(74,222,128,0.1); }
  .highlighted { background: rgba(251,191,36,0.15); }
  .rouge { color: #f472b6; }
  strong, b { color: #fff; font-weight: 600; }
  em, i { color: #c084fc; }
  h1 { font-size: 22px; font-weight: 700; }
  h2 { font-size: 18px; font-weight: 600; }
  h3 { font-size: 16px; font-weight: 600; }
</style>
</head>
<body>${previewHtml}</body>
</html>`}
                    sandbox=""
                    className="w-full bg-bg"
                    style={{ height: 120, border: "none" }}
                    title="dom-preview"
                  />
                </div>
              )}

              {/* Validation status */}
              {status === "success" && (
                <div className="bg-green/10 border border-green/20 rounded-lg px-3 py-2">
                  <p className="text-green text-sm font-medium">✅ Correct !</p>
                </div>
              )}
              {status === "fail" && (
                <div className="bg-pink/10 border border-pink/20 rounded-lg px-3 py-2">
                  <p className="text-pink text-sm">
                    ❌ Pas tout à fait... Résultat attendu :{" "}
                    <code className="text-muted">{expectedOutput}</code>
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
          <pre className="whitespace-pre-wrap font-mono text-[13px] text-green m-0 p-0 bg-transparent border-0">{solution}</pre>
        </div>
      )}
    </div>
  );
}
