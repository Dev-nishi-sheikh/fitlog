import Link from "next/link";
import { ArrowDownRight, Dumbbell } from "lucide-react";
import WorkoutLibrary from "./components/WorkoutLibrary";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const getWorkouts = async () => {
  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
};

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <>
      {/* HERO */}
      <section className="border-b border-[#292929]">
        <div className="container-fit grid min-h-[650px] items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-2 text-xs font-black tracking-[0.3em] text-[#ccff00]">
              <Dumbbell size={16} />
              WORKOUT LIBRARY
            </div>

            <h1 className="display-font max-w-3xl text-6xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
              TRAIN WITH INTENT.
              <br />
              <span className="text-[#ccff00]">LOG EVERY SET.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-gray-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>

            <Link
              href="#library"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-4 text-sm font-black uppercase tracking-wide text-black hover:scale-105"
            >
              Browse Workouts
              <ArrowDownRight size={18} />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#292929] bg-[#151515]">
            <img
              src={workouts[0]?.image}
              alt="Workout"
              className="h-[480px] w-full object-cover"
            />

            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur">
              <p className="text-xs font-bold tracking-[0.2em] text-[#ccff00]">
                START TODAY
              </p>

              <p className="mt-1 text-2xl font-black uppercase">
                {workouts[0]?.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      <WorkoutLibrary workouts={workouts} />
    </>
  );
}