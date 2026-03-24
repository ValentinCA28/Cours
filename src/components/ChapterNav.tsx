import Link from "next/link";

interface ChapterLink {
  slug: string;
  title: string;
}

interface ChapterNavProps {
  prevChapter?: ChapterLink;
  nextChapter?: ChapterLink;
  courseSlug: string;
}

export default function ChapterNav({
  prevChapter,
  nextChapter,
  courseSlug,
}: ChapterNavProps) {
  return (
    <div className="flex items-center justify-between border-t border-border pt-8 mt-12">
      {/* Previous */}
      {prevChapter ? (
        <Link
          href={`/${courseSlug}/${prevChapter.slug}`}
          className="group flex items-center gap-2 text-muted hover:text-accent transition-colors"
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
            className="transition-transform group-hover:-translate-x-0.5"
          >
            <path d="M10 3L5 8l5 5" />
          </svg>
          <span className="text-sm">{prevChapter.title}</span>
        </Link>
      ) : (
        <span />
      )}

      {/* Next */}
      {nextChapter ? (
        <Link
          href={`/${courseSlug}/${nextChapter.slug}`}
          className="group flex items-center gap-2 text-muted hover:text-accent transition-colors"
        >
          <span className="text-sm">{nextChapter.title}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
