"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

export interface SearchItem {
  title: string;
  courseSlug: string;
  chapterSlug: string;
  type: "chapter" | "course";
}

interface TopBarProps {
  courseTitle?: string;
  courseSlug?: string;
  searchItems?: SearchItem[];
  progress?: { current: number; total: number };
}

export default function TopBar({
  courseTitle,
  courseSlug,
  searchItems = [],
  progress,
}: TopBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter results
  const results =
    query.trim().length > 0
      ? searchItems
          .filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 8)
      : [];

  const showDropdown = isOpen && query.trim().length > 0;

  // Close on click outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Ctrl+K / Cmd+K to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close on Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[52px] items-center justify-between border-b border-border bg-surface/80 px-4 backdrop-blur-md">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm min-w-0 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-1 text-muted transition-colors hover:text-text whitespace-nowrap"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <path d="M10 12L6 8l4-4" />
          </svg>
          <span>Mes Cours</span>
        </Link>
        {courseTitle && courseSlug && (
          <>
            <span className="text-muted/50">/</span>
            <Link
              href={`/${courseSlug}`}
              className="truncate font-semibold text-accent transition-colors hover:text-accent2"
            >
              {courseTitle}
            </Link>
            <span className="text-muted/50">/</span>
            <Link
              href={`/${courseSlug}`}
              className="text-muted transition-colors hover:text-text whitespace-nowrap"
            >
              Chapitres
            </Link>
          </>
        )}
      </div>

      {/* Right: Search + Progress + Links */}
      <div className="flex items-center gap-3">
        {/* Chapter index link */}
        {courseSlug && (
          <Link
            href={`/${courseSlug}`}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-border bg-surface2 px-3 py-1.5 text-xs font-mono text-muted transition-colors hover:text-text hover:border-accent/30"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M3 4h10M3 8h10M3 12h7" />
            </svg>
            Sommaire
          </Link>
        )}

        {/* Search */}
        <div ref={containerRef} className="relative">
          <div className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            >
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Rechercher..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              className="h-8 w-[200px] sm:w-[250px] rounded-lg border border-border bg-surface2 pl-8 pr-12 font-mono text-sm text-text placeholder:text-muted/60 transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
            />
            {/* Kbd shortcut hint */}
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-muted pointer-events-none">
              ⌘K
            </kbd>
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-1.5 w-[320px] overflow-hidden rounded-lg border border-border bg-surface shadow-lg shadow-black/20">
              {results.length > 0 ? (
                <ul className="py-1">
                  {results.map((item, i) => (
                    <li key={`${item.courseSlug}-${item.chapterSlug}-${i}`}>
                      <Link
                        href={`/${item.courseSlug}/${item.chapterSlug}`}
                        onClick={() => {
                          setIsOpen(false);
                          setQuery("");
                        }}
                        className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-surface2"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-accent/10 font-mono text-[10px] text-accent">
                          {item.type === "chapter" ? "#" : "📚"}
                        </span>
                        <div className="min-w-0">
                          <span className="block text-sm text-text truncate">
                            {item.title}
                          </span>
                          <span className="block text-xs text-muted truncate">
                            {item.courseSlug}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-3 py-4 text-center text-sm text-muted">
                  Aucun résultat
                </div>
              )}
            </div>
          )}
        </div>

        {/* Progress pill */}
        {progress && (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface2 px-2.5 py-1">
            <div className="flex gap-0.5">
              {Array.from({ length: progress.total }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i < progress.current ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-muted">
              {progress.current}/{progress.total}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
