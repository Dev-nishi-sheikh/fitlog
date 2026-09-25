import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Clock3,
  Flame,
  Star,
} from "lucide-react";

import WorkoutActions from "../../components/WorkoutActions";

const API_URL =
  "https://api.api-store.workers.dev/api/fitlog";

async function getWorkout(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data?.data || data?.workout || data;
  } catch (error) {
    console.error("Single workout API error:", error);

    return null;
  }
}

export default async function WorkoutDetails({ params }) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  const groups =
    workout.muscleGroups ||
    workout.categories ||
    [];

  const instructions = Array.isArray(workout.instructions)
    ? workout.instructions
    : [];

  const calories =
    workout.caloriesBurned ??
    workout.calories ??
    0;

  return (
    <section className="bg-[#080a0f] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1180px]">

        {/* BACK */}
        <Link
          href="/#library"
          className="mb-7 inline-flex items-center gap-2 text-[14px] font-black uppercase tracking-wider text-gray-500 transition hover:text-[#ccff00]"
        >
          <ArrowLeft size={17} />
          Back to library
        </Link>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">

          {/* IMAGE */}
          <div className="h-fit overflow-hidden rounded-xl border border-white/[0.08] bg-[#11151c] lg:sticky lg:top-24">
            <img
              src={
                workout.image ||
                "/assets/banner.png"
              }
              alt={workout.name}
              className="aspect-[0.9/1] w-full object-cover lg:aspect-[0.85/1]"
            />
          </div>

          {/* CONTENT */}
          <div>
            <p className="text-[14px] font-black uppercase tracking-[0.25em] text-[#ccff00]">
              WORKOUT DETAIL
            </p>

            <h1 className="font-display mt-3 text-4xl uppercase leading-[0.95] text-white sm:text-5xl lg:text-6xl">
              {workout.name}
            </h1>

            <p className="mt-5 max-w-2xl text-[17px] leading-7 text-gray-500">
              {workout.description ||
                "A focused workout designed to build strength, consistency, and performance."}
            </p>

            {/* TAGS */}
            <div className="mt-5 flex flex-wrap gap-2">
              {groups.map((group) => (
                <span
                  key={group}
                  className="rounded-md border border-[#ccff00]/20 bg-[#ccff00]/5 px-3 py-1.5 text-[12px] font-black uppercase tracking-wide text-[#ccff00]"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* SPECS */}
            <div className="mt-8 overflow-hidden rounded-lg border border-white/[0.08] bg-[#11151c]">
              <Spec
                label="Equipment"
                value={workout.equipment}
              />

              <Spec
                label="Difficulty"
                value={workout.difficulty}
              />

              <Spec
                label="Sets"
                value={workout.sets}
              />

              <Spec
                label="Reps"
                value={workout.reps}
              />

              <Spec
                label="Duration"
                value={`${workout.duration || 0} min`}
              />

              <Spec
                label="Calories"
                value={`${calories} kcal`}
              />

              <Spec
                label="Rating"
                value={
                  <span className="flex items-center gap-1 text-[#ccff00]">
                    <Star
                      size={16}
                      fill="currentColor"
                    />
                    {workout.rating || "—"}
                  </span>
                }
                last
              />
            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-9">
              <p className="text-[14px] font-black uppercase tracking-[0.25em] text-[#ccff00]">
                INSTRUCTIONS
              </p>

              <ol className="mt-5 space-y-4">
                {instructions.length > 0 ? (
                  instructions.map((step, index) => (
                    <li
                      key={`${index}-${step}`}
                      className="flex gap-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.05] text-[12px] font-black text-[#ccff00]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="pt-1 text-[15px] leading-6 text-gray-500">
                        {step}
                      </p>
                    </li>
                  ))
                ) : (
                  <li className="text-[15px] text-gray-600">
                    Follow proper form and controlled
                    movement throughout the exercise.
                  </li>
                )}
              </ol>
            </div>

            {/* ACTIONS */}
            <div className="mt-9">
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({
  label,
  value,
  last = false,
}) {
  return (
    <div
      className={`flex items-center justify-between gap-5 px-4 py-3.5 sm:px-5 ${
        !last
          ? "border-b border-white/[0.06]"
          : ""
      }`}
    >
      <span className="text-[12px] font-black uppercase tracking-wider text-gray-600">
        {label}
      </span>

      <strong className="text-right text-[15px] font-bold text-gray-300">
        {value || "—"}
      </strong>
    </div>
  );
}