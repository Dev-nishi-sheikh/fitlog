"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  Flame,
  Star,
  X,
} from "lucide-react";
import { useFitlog } from "../context/FitlogContext";

const MyPlan = () => {
  const {
    plan,
    saved,
    hydrated,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useFitlog();

  const [activeTab, setActiveTab] = useState("plan");

  const currentList = activeTab === "plan" ? plan : saved;

  const metrics = useMemo(() => {
    return plan.reduce(
      (total, workout) => ({
        exercises: total.exercises + 1,
        minutes: total.minutes + workout.duration,
        calories: total.calories + workout.caloriesBurned,
      }),
      {
        exercises: 0,
        minutes: 0,
        calories: 0,
      }
    );
  }, [plan]);

  if (!hydrated) {
    return (
      <section className="section-padding">
        <div className="container-fit">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#333] border-t-[#ccff00]" />

              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                Loading workouts…
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container-fit">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-black tracking-[0.25em] text-[#ccff00]">
              TODAY'S WORK
            </p>

            <h1 className="display-font text-6xl uppercase">
              MY PLAN
            </h1>

            <p className="mt-3 text-gray-500">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <Link
            href="/#library"
            className="inline-flex items-center gap-2 text-sm font-black uppercase text-[#ccff00]"
          >
            Browse workouts
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Metrics */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Metric title="Exercises" value={metrics.exercises} />
          <Metric title="Minutes" value={metrics.minutes} />
          <Metric title="Calories" value={metrics.calories} />
        </div>

        {/* Tabs */}
        <div className="mt-10 flex border-b border-[#292929]">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-4 text-sm font-black uppercase ${
              activeTab === "plan"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-gray-500"
            }`}
          >
            Today's Plan ({plan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-4 text-sm font-black uppercase ${
              activeTab === "saved"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-gray-500"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        {/* Empty */}
        {currentList.length === 0 ? (
          <EmptyState activeTab={activeTab} />
        ) : (
          <div className="mt-7 space-y-4">
            {currentList.map((workout) => (
              <PlanCard
                key={workout.id}
                workout={workout}
                isPlan={activeTab === "plan"}
                onRemove={
                  activeTab === "plan"
                    ? removeFromPlan
                    : removeFromSaved
                }
                onDone={markAsDone}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Metric = ({ title, value }) => {
  return (
    <div className="rounded-2xl border border-[#292929] bg-[#111] p-6">
      <p className="text-xs font-black uppercase tracking-widest text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-4xl font-black">{value}</p>
    </div>
  );
};

const PlanCard = ({ workout, isPlan, onRemove, onDone }) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-[#111] ${
        workout.done
          ? "border-[#ccff00]/50"
          : "border-[#292929]"
      }`}
    >
      <div className="flex flex-col md:flex-row">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-52 w-full object-cover md:h-auto md:w-56"
        />

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#222] px-2 py-1 text-[10px] font-bold text-[#ccff00]"
                >
                  {group}
                </span>
              ))}
            </div>

            <h2 className="mt-3 text-2xl font-black uppercase">
              {workout.name}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {workout.equipment}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Clock3 size={14} />
                {workout.duration} min
              </span>

              <span className="flex items-center gap-1">
                <Flame size={14} />
                {workout.caloriesBurned} kcal
              </span>

              <span className="flex items-center gap-1 text-[#ccff00]">
                <Star size={14} fill="currentColor" />
                {workout.rating}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={`/workout/${workout.id}`}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-black uppercase hover:border-[#ccff00] hover:text-[#ccff00]"
            >
              View Details
            </Link>

            {isPlan && (
              <button
                onClick={() => onDone(workout.id)}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-xs font-black uppercase ${
                  workout.done
                    ? "bg-[#ccff00] text-black"
                    : "border border-[#ccff00] text-[#ccff00]"
                }`}
              >
                <Check size={14} />
                {workout.done ? "Done" : "Mark as Done"}
              </button>
            )}

            <button
              onClick={() => onRemove(workout.id)}
              className="flex items-center gap-1 rounded-full border border-red-500/30 px-4 py-2 text-xs font-black uppercase text-red-400 hover:bg-red-500 hover:text-white"
            >
              <X size={14} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ activeTab }) => {
  return (
    <div className="mt-8 rounded-3xl border border-dashed border-[#333] px-5 py-20 text-center">
      <p className="display-font text-4xl uppercase">
        NOTHING HERE YET
      </p>

      <p className="mx-auto mt-3 max-w-md text-gray-500">
        {activeTab === "plan"
          ? "Browse the library and add a lift to get today moving."
          : "Save a workout from the library and find it here later."}
      </p>

      <Link
        href="/#library"
        className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black"
      >
        Go to workouts
      </Link>
    </div>
  );
};

export default MyPlan;