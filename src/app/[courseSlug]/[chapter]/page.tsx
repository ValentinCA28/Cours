import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllCourses, getCourse, getChapter } from "@/lib/courses";
import Sidebar from "@/components/Sidebar";
import ChapterNav from "@/components/ChapterNav";
import { components as mdxComponents } from "@/components/mdx-components";

interface Props {
  params: { courseSlug: string; chapter: string };
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  const params: { courseSlug: string; chapter: string }[] = [];

  for (const course of courses) {
    for (const ch of course.chapters) {
      params.push({ courseSlug: course.slug, chapter: ch.slug });
    }
  }

  return params;
}

export default function ChapterPage({ params }: Props) {
  const course = getCourse(params.courseSlug);
  if (!course) notFound();

  const chapter = getChapter(params.courseSlug, params.chapter);
  if (!chapter) notFound();

  // Find current index for prev/next navigation
  const currentIndex = course.chapters.findIndex(
    (ch) => ch.slug === params.chapter
  );
  const prevChapter = currentIndex > 0 ? course.chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < course.chapters.length - 1
      ? course.chapters[currentIndex + 1]
      : null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar courseMeta={course} currentChapter={params.chapter} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-8 py-12">
          {/* Chapter header */}
          <header className="mb-10 border-b border-border pb-8">
            <span className="mb-2 inline-block rounded-md bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
              Chapitre {chapter.number}
            </span>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              {chapter.title}
            </h1>
            {chapter.subtitle && (
              <p className="mt-2 text-lg text-muted">{chapter.subtitle}</p>
            )}
          </header>

          {/* MDX content */}
          <article className="prose prose-invert max-w-none">
            <MDXRemote
              source={chapter.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [rehypePrettyCode, { theme: "github-dark" }],
                  ],
                },
              }}
            />
          </article>

          {/* Prev / Next navigation */}
          <ChapterNav
            courseSlug={params.courseSlug}
            prevChapter={prevChapter ?? undefined}
            nextChapter={nextChapter ?? undefined}
          />
        </div>
      </main>
    </div>
  );
}
