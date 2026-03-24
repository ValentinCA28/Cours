import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCourses, getCourse } from "@/lib/courses";
import TopBar from "@/components/TopBar";
import type { SearchItem } from "@/components/TopBar";

interface Props {
  params: { courseSlug: string };
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((c) => ({ courseSlug: c.slug }));
}

export default function CourseIndexPage({ params }: Props) {
  const course = getCourse(params.courseSlug);
  if (!course) notFound();

  const searchItems: SearchItem[] = course.chapters.map((ch) => ({
    title: ch.title,
    courseSlug: course.slug,
    chapterSlug: ch.slug,
    type: "chapter" as const,
  }));

  return (
    <div className="pt-[52px]">
      <TopBar
        courseTitle={course.title}
        courseSlug={course.slug}
        searchItems={searchItems}
      />

      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <span className="text-4xl">{course.icon}</span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-2 text-lg text-muted">{course.description}</p>
          <p className="mt-4 text-sm text-muted">
            {course.chapters.length} chapitre{course.chapters.length > 1 ? "s" : ""}
          </p>
        </header>

        {/* Chapter list */}
        <div className="flex flex-col gap-3">
          {course.chapters.map((chapter, i) => (
            <Link
              key={chapter.slug}
              href={`/${course.slug}/${chapter.slug}`}
              className="group flex items-center gap-5 rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.08)]"
            >
              {/* Number */}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-sm font-semibold text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                {chapter.number}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-text group-hover:text-accent transition-colors">
                  {chapter.title}
                </h2>
                {chapter.subtitle && (
                  <p className="mt-0.5 text-sm text-muted truncate">
                    {chapter.subtitle}
                  </p>
                )}
              </div>

              {/* Arrow */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-muted transition-all group-hover:text-accent group-hover:translate-x-0.5"
              >
                <path d="M6 3l5 5-5 5" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Start button */}
        {course.chapters.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              href={`/${course.slug}/${course.chapters[0].slug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Commencer le cours →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
