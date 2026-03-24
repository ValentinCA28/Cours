"use client";

import { useState } from "react";
import Link from "next/link";
import type { CourseMeta } from "@/lib/courses";

interface SidebarProps {
  courseMeta: CourseMeta;
  currentChapter: string;
}

export default function Sidebar({ courseMeta, currentChapter }: SidebarProps) {
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-border">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">
          Holberton School
        </span>
        <h2 className="mt-1.5 text-lg font-bold leading-snug text-text">
          {courseMeta.title}
        </h2>
      </div>

      {/* Chapter list */}
      <ul className="flex-1 overflow-y-auto py-3">
        {courseMeta.chapters.map((chapter) => {
          const isActive = chapter.slug === currentChapter;
          return (
            <li key={chapter.slug}>
              <Link
                href={`/${courseMeta.slug}/${chapter.slug}`}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-5 py-2.5 text-sm transition-colors
                  ${
                    isActive
                      ? "text-accent border-l-2 border-accent bg-accent/[0.06]"
                      : "text-muted hover:text-text hover:bg-surface2/50 border-l-2 border-transparent"
                  }
                `}
              >
                <span className="font-mono text-xs opacity-60 w-5 shrink-0">
                  {chapter.number}
                </span>
                <span className="truncate">{chapter.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-[62px] left-4 z-40 flex items-center justify-center w-10 h-10 rounded-lg bg-surface border border-border text-muted hover:text-text transition-colors lg:hidden"
        aria-label="Open menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`
          fixed top-[52px] left-0 z-40 h-[calc(100vh-52px)] w-[260px] bg-surface border-r border-border
          transform transition-transform duration-200 ease-out
          lg:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md text-muted hover:text-text transition-colors"
          aria-label="Close menu"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
        {nav}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-0 h-[calc(100vh-52px)] w-[260px] shrink-0 bg-surface border-r border-border">
        {nav}
      </aside>
    </>
  );
}
