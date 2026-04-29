import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

export interface CourseMeta {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  chapters: ChapterMeta[];
}

export interface ChapterMeta {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  keywords: string[];
}

export interface ChapterData extends ChapterMeta {
  content: string;
}

function extractKeywords(content: string, frontmatterKeywords?: string[]): string[] {
  const headings = Array.from(content.matchAll(/^##+\s+(.+)$/gm))
    .map((m) => m[1].replace(/<[^>]+>/g, "").replace(/`/g, "").trim())
    .filter(Boolean);

  const manual = Array.isArray(frontmatterKeywords) ? frontmatterKeywords : [];

  const seen = new Set<string>();
  const result: string[] = [];
  for (const kw of [...manual, ...headings]) {
    const norm = kw.toLowerCase();
    if (!seen.has(norm)) {
      seen.add(norm);
      result.push(kw);
    }
  }
  return result;
}

export function getAllCourses(): CourseMeta[] {
  const dirs = fs.readdirSync(contentDir).filter((d) => {
    return fs.statSync(path.join(contentDir, d)).isDirectory();
  });

  return dirs
    .map((dir) => {
      const metaPath = path.join(contentDir, dir, "meta.json");
      if (!fs.existsSync(metaPath)) return null;
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      const chapters = getChapters(dir);
      return { slug: dir, ...meta, chapters };
    })
    .filter(Boolean) as CourseMeta[];
}

export function getCourse(slug: string): CourseMeta | null {
  const metaPath = path.join(contentDir, slug, "meta.json");
  if (!fs.existsSync(metaPath)) return null;
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  const chapters = getChapters(slug);
  return { slug, ...meta, chapters };
}

function getChapters(courseSlug: string): ChapterMeta[] {
  const chapDir = path.join(contentDir, courseSlug, "chapters");
  if (!fs.existsSync(chapDir)) return [];

  return fs
    .readdirSync(chapDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(chapDir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(".mdx", ""),
        number: data.number || "00",
        title: data.title || "Sans titre",
        subtitle: data.subtitle || "",
        keywords: extractKeywords(content, data.keywords),
      };
    });
}

export function getChapter(
  courseSlug: string,
  chapterSlug: string
): ChapterData | null {
  const filePath = path.join(
    contentDir,
    courseSlug,
    "chapters",
    `${chapterSlug}.mdx`
  );
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug: chapterSlug,
    number: data.number || "00",
    title: data.title || "Sans titre",
    subtitle: data.subtitle || "",
    keywords: extractKeywords(content, data.keywords),
    content,
  };
}
