import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import {
  SelectorDemo,
  TextContentDemo,
  StyleDemo,
  EventLogDemo,
  TodoDemo,
  FetchDemo,
  CodeExercise,
} from "@/components/demos";

/* ── Callout ─────────────────────────────────────────────── */
interface CalloutProps {
  variant?: "info" | "warn" | "success";
  title?: string;
  children: ReactNode;
}

const calloutStyles = {
  info: "border-blue bg-blue/[0.06]",
  warn: "border-yellow bg-yellow/[0.06]",
  success: "border-green bg-green/[0.06]",
} as const;

const calloutTitleColor = {
  info: "text-blue",
  warn: "text-yellow",
  success: "text-green",
} as const;

function Callout({ variant = "info", title, children }: CalloutProps) {
  return (
    <div
      className={`border-l-4 rounded-r-lg px-4 py-3 my-5 ${calloutStyles[variant]}`}
    >
      {title && (
        <p className={`text-sm font-semibold mb-1 ${calloutTitleColor[variant]}`}>
          {title}
        </p>
      )}
      <div className="text-sm text-muted [&>p]:m-0">{children}</div>
    </div>
  );
}

/* ── InlineCode (ic tag) ─────────────────────────────────── */
function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[13px] text-accent2 bg-accent/[0.08] rounded px-1.5 py-0.5">
      {children}
    </code>
  );
}

/* ── DemoBlock ───────────────────────────────────────────── */
function DemoBlock({ children }: { children: ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 my-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-green" />
        <span className="text-xs font-mono uppercase tracking-wider text-muted">
          demo live
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

/* ── Badge ───────────────────────────────────────────────── */
function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block font-mono text-xs text-blue bg-blue/[0.1] rounded px-2 py-0.5">
      {children}
    </span>
  );
}

/* ── MDX component map ───────────────────────────────────── */
export const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="flex items-center gap-3 text-xl font-bold text-text mt-10 mb-4"
      {...props}
    >
      <span className="w-1 h-[18px] rounded-full bg-accent shrink-0" />
      {children}
    </h2>
  ),

  p: ({ children, ...props }) => (
    <p className="text-muted leading-relaxed my-3" {...props}>
      {children}
    </p>
  ),

  strong: ({ children, ...props }) => (
    <strong className="text-text font-semibold" {...props}>
      {children}
    </strong>
  ),

  pre: ({ children, ...props }) => (
    <pre
      className="relative bg-code-bg border border-border rounded-lg p-4 overflow-x-auto my-5"
      {...props}
    >
      {children}
    </pre>
  ),

  code: ({ children, ...props }) => (
    <code className="font-mono text-[13px]" {...props}>
      {children}
    </code>
  ),

  // Custom components
  Callout,
  InlineCode,
  ic: InlineCode,
  DemoBlock,
  Badge,
  // Interactive demos
  SelectorDemo,
  TextContentDemo,
  StyleDemo,
  EventLogDemo,
  TodoDemo,
  FetchDemo,
  CodeExercise,
};
