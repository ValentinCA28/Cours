"use client";

import jsDomExercises from "@/content/js-dom/exercises";
import jsEs6Exercises from "@/content/js-es6/exercises";
import jsClassesMetaExercises from "@/content/js-classes-meta/exercises";
import pythonSsrExercises from "@/content/python-server-side-rendering/exercises";
import CodeExercise from "./CodeExercise";
import PythonExercise from "./PythonExercise";

const allExercises: Record<string, Record<string, any>> = {
  "js-dom": jsDomExercises,
  "js-es6": jsEs6Exercises,
  "js-classes-meta": jsClassesMetaExercises,
  "python-server-side-rendering": pythonSsrExercises,
};

interface ExerciseByIdProps {
  id: string;
  course?: string;
}

export default function ExerciseById({ id, course }: ExerciseByIdProps) {
  let data = null;
  if (course && allExercises[course]) {
    data = allExercises[course][id];
  } else {
    for (const exercises of Object.values(allExercises)) {
      if (exercises[id]) {
        data = exercises[id];
        break;
      }
    }
  }

  if (!data) {
    return (
      <div className="bg-surface border border-pink/30 rounded-xl p-5 my-6 text-pink text-sm">
        Exercice &quot;{id}&quot; introuvable.
      </div>
    );
  }

  // Route to PythonExercise for Python exercises
  if (data.language === "python") {
    return (
      <PythonExercise
        instruction={data.instruction}
        starterCode={data.starterCode}
        solution={data.solution}
        expectedOutput={data.expectedOutput}
      />
    );
  }

  return <CodeExercise exerciseData={data} />;
}
