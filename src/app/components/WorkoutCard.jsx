"use client";

import Link from "next/link";
import {
  Clock3,
  Flame,
  Star,
} from "lucide-react";

export default function WorkoutCard({ workout }) {
  if (!workout) {
    return null;
  }

  const image =
    workout.image ||
    "/assets/banner.png";

  const categories =
    workout.categories ||
    workout.muscleGroups ||
    [];

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-lg border border-white/[0.08] bg-[#11151c] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/30"
    >

      {/* IMAGE */}

      <div className="relative aspect-[1.5/1] overflow-hidden bg-[#0d1016]">

        <img
          src={image}
          alt={workout.name || "Workout"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* TAGS */}

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {categories
            .slice(0, 2)
            .map((category) => (
              <span
                key={category}
                className="rounded-sm border border-[#ccff00]/40 bg-black/70 px-2 py-1 text-[11px] font-black uppercase text-[#ccff00]"
              >
                {category}
              </span>
            ))}
        </div>
      </div>

      {/* BODY */}

      <div className="p-4">

        <h3 className="truncate text-[17px] font-black uppercase leading-tight text-white">
          {workout.name || "Workout"}
        </h3>

        <p className="mt-1.5 truncate text-[13px] text-gray-500">
          {workout.equipment || "No equipment"}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-white/[0.07] pt-3 text-[12px] font-bold uppercase text-gray-500">

          <span className="flex items-center gap-1.5">
            <Clock3 size={15} />
            {workout.duration || 0} min
          </span>

          <span className="flex items-center gap-1.5">
            <Flame size={15} />
            {workout.caloriesBurned ||
              workout.calories ||
              0} kcal
          </span>

          <span className="flex items-center gap-1.5">
            <Star
              size={15}
              fill="currentColor"
            />
            {workout.rating || "—"}
          </span>

        </div>
      </div>
    </Link>
  );
}