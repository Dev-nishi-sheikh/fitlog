"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";

import WorkoutCard from "./WorkoutCard";
import { useFitlog } from "../context/FitlogContext";

export default function WorkoutLibrary() {
  const {
    workouts,
    loading,
  } = useFitlog();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("duration");

  const filtered = useMemo(() => {

    let result = [...(workouts || [])];

    if (search.trim()) {
      const q =
        search.toLowerCase();

      result = result.filter((workout) => {

        const text = `
          ${workout.name || ""}
          ${workout.equipment || ""}
          ${(workout.categories || []).join(" ")}
          ${(workout.muscleGroups || []).join(" ")}
        `.toLowerCase();

        return text.includes(q);
      });
    }

    if (sort === "duration") {
      result.sort(
        (a, b) =>
          Number(a.duration || 0) -
          Number(b.duration || 0)
      );
    }

    if (sort === "calories") {
      result.sort(
        (a, b) =>
          Number(
            b.caloriesBurned ||
              b.calories ||
              0
          ) -
          Number(
            a.caloriesBurned ||
              a.calories ||
              0
          )
      );
    }

    if (sort === "rating") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return result;
  }, [workouts, search, sort]);

  if (loading) {
    return (
      <div className="flex min-h-[350px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-md text-[#ccff00]" />

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
            Loading workouts…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>

      {/* SEARCH */}

      <div className="mb-6 flex flex-col gap-2 sm:flex-row">

        <label className="input input-sm h-9 w-full rounded border-white/[0.08] bg-[#11151c] sm:max-w-xs">
          <Search
            size={14}
            className="text-gray-600"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search workouts..."
            className="text-[10px]"
          />
        </label>

        <label className="select select-sm h-9 w-full rounded border-white/[0.08] bg-[#11151c] sm:w-44">
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="text-[10px]"
          >
            <option value="duration">
              Duration
            </option>

            <option value="calories">
              Calories
            </option>

            <option value="rating">
              Rating
            </option>
          </select>
        </label>

      </div>

      {/* GRID */}

      {filtered.length > 0 ? (

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {filtered.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}

        </div>

      ) : (

        <div className="rounded-lg border border-dashed border-white/10 py-16 text-center">

          <p className="text-sm font-black uppercase text-gray-400">
            No workouts found
          </p>

          <p className="mt-2 text-[10px] text-gray-600">
            Try another search.
          </p>

        </div>
      )}

    </div>
  );
}