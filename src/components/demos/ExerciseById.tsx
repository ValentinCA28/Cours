"use client";

import exercises from "@/content/js-dom/exercises";
import CodeExercise from "./CodeExercise";

interface ExerciseByIdProps {
  id: string;
}

export default function ExerciseById({ id }: ExerciseByIdProps) {
  const data = exercises[id];
  if (!data) {
    return (
      <div className="bg-surface border border-pink/30 rounded-xl p-5 my-6 text-pink text-sm">
        Exercice &quot;{id}&quot; introuvable.
      </div>
    );
  }

  return <CodeExercise exerciseData={data} />;
}
