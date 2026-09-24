"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import WorkoutCard from "./WorkoutCard";

const WorkoutLibrary = ({ workouts }) => {
  const [sortBy, setSortBy] = useState("duration");
  const [search, setSearch] = useState("");

  const filteredWorkouts = useMemo(() => {
    const result = workouts.filter((workout) => {
      const keyword = search.toLowerCase();

      return (
        workout.name.toLowerCase().includes(keyword) ||
        workout.muscleGroups.some((group) =>
          group.toLowerCase().includes(keyword)
        )
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });
  }, [workouts, search, sortBy]);

  return (
    <section id="library" className="section-padding">
      <div className="container-fit">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-black tracking-[0.25em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h2 className="display-font text-5xl uppercase sm:text-6xl">
              THE LIBRARY
            </h2>

            <p className="mt-3 text-gray-500">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="flex items-center gap-2 rounded-full border border-[#333] bg-[#111] px-4 py-2">
              <Search size={16} className="text-gray-500" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search workout..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-600 sm:w-44"
              />
            </div>

            {/* Sort */}
            <div className="relative flex items-center rounded-full border border-[#333] bg-[#111]">
              <span className="pl-4 text-xs font-bold text-gray-500">
                Sort By
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent px-4 py-2 pr-9 text-sm font-bold outline-none"
              >
                <option value="duration" className="bg-[#111]">
                  Duration
                </option>

                <option value="calories" className="bg-[#111]">
                  Calories
                </option>

                <option value="rating" className="bg-[#111]">
                  Rating
                </option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3"
              />
            </div>
          </div>
        </div>

        {filteredWorkouts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#333] py-20 text-center">
            <p className="font-black uppercase">No workouts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkoutLibrary;