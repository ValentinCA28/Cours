import Link from "next/link";
import { getAllCourses } from "@/lib/courses";

export default function HomePage() {
  const courses = getAllCourses();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
          Mes Cours
        </h1>
        <p className="mt-3 text-lg text-muted">
          Supports de cours interactifs — Holberton School
        </p>
      </header>

      {/* Course grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const firstChapter = course.chapters[0];
          const href = firstChapter
            ? `/${course.slug}/${firstChapter.slug}`
            : `/${course.slug}`;

          return (
            <Link key={course.slug} href={href} className="group">
              <article className="flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_24px_rgba(249,115,22,0.12)]">
                {/* Icon */}
                <span className="mb-4 text-4xl">{course.icon}</span>

                {/* Title */}
                <h2 className="mb-2 text-xl font-semibold text-text transition-colors group-hover:text-accent">
                  {course.title}
                </h2>

                {/* Description */}
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                  {course.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {course.chapters.length} chapitre
                    {course.chapters.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-sm font-semibold text-accent transition-transform group-hover:translate-x-1">
                    Commencer →
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
