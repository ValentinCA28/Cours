import { redirect, notFound } from "next/navigation";
import { getCourse } from "@/lib/courses";

interface Props {
  params: { courseSlug: string };
}

export default function CourseIndexPage({ params }: Props) {
  const course = getCourse(params.courseSlug);

  if (!course || course.chapters.length === 0) {
    notFound();
  }

  redirect(`/${course.slug}/${course.chapters[0].slug}`);
}
