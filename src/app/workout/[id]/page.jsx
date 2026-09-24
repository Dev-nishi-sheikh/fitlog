import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  Flame,
  Star,
  Dumbbell,
  BarChart3,
} from "lucide-react";
import WorkoutActions from "../../components/WorkoutActions";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const getWorkout = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
};

export default async function WorkoutDetails({ params }) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <section className="section-padding">
      <div className="container-fit">
        <Link
          href="/#library"
          className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#ccff00]"
        >
          <ArrowLeft size={17} />
          Back to library
        </Link>

        <div className="grid overflow-hidden rounded-3xl border border-[#292929] bg-[#111] lg:grid-cols-2">
          {/* Image */}
          <div className="min-h-[450px] bg-[#181818] lg:min-h-[700px]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full min-h-[450px] w-full object-cover lg:min-h-[700px]"
            />
          </div>

          {/* Content */}
          <div className="p-7 sm:p-10 lg:p-12">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-black uppercase text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="display-font mt-5 text-5xl uppercase leading-none sm:text-6xl">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Specs */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-[#292929]">
              <div className="border-b border-[#292929] bg-[#171717] p-4">
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-[#ccff00]" />
                  <span className="font-black uppercase tracking-wide">
                    Key Specs
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2">
                <Spec label="Equipment" value={workout.equipment} />
                <Spec label="Difficulty" value={workout.difficulty} />
                <Spec label="Sets" value={workout.sets} />
                <Spec label="Reps" value={workout.reps} />
                <Spec label="Duration" value={`${workout.duration} min`} />
                <Spec
                  label="Calories"
                  value={`${workout.caloriesBurned} kcal`}
                />
                <Spec label="Rating" value={workout.rating} />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Clock3 size={16} className="text-[#ccff00]" />
                {workout.duration} min
              </span>

              <span className="flex items-center gap-2">
                <Flame size={16} className="text-[#ccff00]" />
                {workout.caloriesBurned} kcal
              </span>

              <span className="flex items-center gap-2">
                <Star
                  size={16}
                  className="text-[#ccff00]"
                  fill="currentColor"
                />
                {workout.rating}
              </span>

              <span className="flex items-center gap-2">
                <Dumbbell size={16} className="text-[#ccff00]" />
                {workout.equipment}
              </span>
            </div>

            {/* Instructions */}
            <div className="mt-10">
              <h2 className="text-lg font-black uppercase">Instructions</h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                      {index + 1}
                    </span>

                    <p className="pt-1 text-sm leading-6 text-gray-400">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </section>
  );
}

const Spec = ({ label, value }) => {
  return (
    <div className="flex justify-between gap-4 border-b border-[#292929] p-4 text-sm">
      <span className="font-bold text-gray-500 uppercase">{label}</span>

      <span className="text-right font-bold">{value}</span>
    </div>
  );
};
