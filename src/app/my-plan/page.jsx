"use client";

import Link from "next/link";

import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Star,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";

import { useFitlog } from "../context/FitlogContext";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    hydrated,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useFitlog();

  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("default");

  const list = tab === "plan" ? plan : saved;

  /* =========================
     METRICS
  ========================= */

  const metrics = useMemo(() => {
    return plan.reduce(
      (acc, item) => {
        acc.exercises += 1;

        acc.minutes += Number(
          item.duration || 0
        );

        acc.calories += Number(
          item.caloriesBurned ||
            item.calories ||
            0
        );

        return acc;
      },
      {
        exercises: 0,
        minutes: 0,
        calories: 0,
      }
    );
  }, [plan]);

  /* =========================
     SORT
  ========================= */

  const sortedList = useMemo(() => {
    const items = [...list];

    if (sortBy === "duration") {
      items.sort(
        (a, b) =>
          Number(a.duration || 0) -
          Number(b.duration || 0)
      );
    }

    if (sortBy === "calories") {
      items.sort(
        (a, b) =>
          Number(
            a.caloriesBurned ||
              a.calories ||
              0
          ) -
          Number(
            b.caloriesBurned ||
              b.calories ||
              0
          )
      );
    }

    if (sortBy === "rating") {
      items.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return items;
  }, [list, sortBy]);

  /* =========================
     LOADING
  ========================= */

  if (!hydrated) {
    return (
      <main className="min-h-screen bg-[#080a0f]">
        <div className="flex min-h-[450px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">

            <span className="loading loading-spinner loading-md text-[#ccff00]" />

            <p className="text-[14px] font-black uppercase tracking-widest text-gray-600">
              Loading workouts…
            </p>

          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080a0f]">

      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:py-11">

        {/* =========================
            HEADER
        ========================= */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h1 className="text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-[42px]">
              MY PLAN
            </h1>

            <p className="mt-3 text-[14px] leading-6 text-gray-500 sm:text-[15px]">
              Cap of five lifts for today. Finish them, then load more.
            </p>

          </div>

          <Link
            href="/#library"
            className="flex items-center gap-2 text-[13px] font-black uppercase text-gray-500 transition hover:text-[#ccff00]"
          >
            Browse workouts
            <ArrowRight size={18} />
          </Link>

        </div>


        {/* =========================
            METRICS
        ========================= */}

        <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.08] bg-[#11151c]">

          <div className="grid grid-cols-3">

            <Metric
              title="Exercises"
              value={metrics.exercises}
              highlight
            />

            <Metric
              title="Minutes"
              value={metrics.minutes}
            />

            <Metric
              title="Calories"
              value={metrics.calories}
            />

          </div>

        </div>


        {/* =========================
            TABS + SORT
        ========================= */}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* TABS */}

          <div className="flex w-fit rounded-lg border border-white/[0.08] bg-[#11151c] p-1">

            <button
              onClick={() => setTab("plan")}
              className={`flex items-center gap-2 rounded-md px-5 py-2.5 text-[12px] font-black uppercase transition ${
                tab === "plan"
                  ? "bg-[#1c2028] text-white"
                  : "text-gray-600 hover:text-gray-400"
              }`}
            >
              Today's Plan

              <b
                className={
                  tab === "plan"
                    ? "text-[#ccff00]"
                    : "text-gray-600"
                }
              >
                {plan.length}
              </b>

            </button>

            <button
              onClick={() => setTab("saved")}
              className={`flex items-center gap-2 rounded-md px-5 py-2.5 text-[12px] font-black uppercase transition ${
                tab === "saved"
                  ? "bg-[#1c2028] text-white"
                  : "text-gray-600 hover:text-gray-400"
              }`}
            >
              Saved

              <b
                className={
                  tab === "saved"
                    ? "text-[#ccff00]"
                    : "text-gray-600"
                }
              >
                {saved.length}
              </b>

            </button>

          </div>


          {/* SORT */}

          <div className="flex items-center gap-2">

            <span className="text-[11px] font-medium text-gray-500">
              Sort By
            </span>

            <div className="relative">

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="appearance-none rounded-lg border border-white/[0.08] bg-[#11151c] py-2.5 pl-3.5 pr-9 text-[11px] font-bold text-gray-400 outline-none focus:border-[#ccff00]/30"
              >

                <option value="default">
                  Default
                </option>

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

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600"
              />

            </div>

          </div>

        </div>


        {/* =========================
            EMPTY STATE
        ========================= */}

        {sortedList.length === 0 ? (

          <div className="mt-6 flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.08] px-5 text-center">

            <div className="grid h-14 w-14 place-items-center rounded-lg bg-[#ccff00] text-3xl font-black text-black">
              +
            </div>

            <p className="mt-6 text-[19px] font-black uppercase tracking-[0.15em] text-white">
              NOTHING HERE YET
            </p>

            <p className="mt-2 max-w-sm text-[13px] leading-6 text-gray-600">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/#library"
              className="btn mt-6 h-10 min-h-10 rounded-full bg-[#ccff00] px-6 text-[12px] font-black uppercase text-black hover:bg-[#ccff00]"
            >
              Go to workouts
              <ArrowRight size={15} />
            </Link>

          </div>

        ) : (

          /* =========================
             WORKOUT LIST
          ========================= */

          <div className="mt-6 space-y-3.5">

            {sortedList.map((workout) => (

              <PlanCard
                key={workout.id}
                workout={workout}
                isPlan={tab === "plan"}
                onRemove={
                  tab === "plan"
                    ? removeFromPlan
                    : removeFromSaved
                }
                onDone={markAsDone}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}


/* =========================================================
   METRIC
========================================================= */

function Metric({
  title,
  value,
  highlight = false,
}) {
  return (
    <div className="border-r border-white/[0.06] px-6 py-6 last:border-r-0 sm:px-8 sm:py-7">

      <span className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
        {title}
      </span>

      <strong
        className={`mt-2.5 block text-4xl font-black leading-none sm:text-[40px] ${
          highlight
            ? "text-[#ccff00]"
            : "text-white"
        }`}
      >
        {value}
      </strong>

    </div>
  );
}


/* =========================================================
   PLAN CARD
========================================================= */

function PlanCard({
  workout,
  isPlan,
  onRemove,
  onDone,
}) {
  return (
    <article
      className={`overflow-hidden rounded-xl border bg-[#11151c] transition ${
        workout.done
          ? "border-[#ccff00]/30 opacity-70"
          : "border-white/[0.08] hover:border-white/[0.14]"
      }`}
    >

      <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:p-5">

        {/* =========================
            IMAGE
        ========================= */}

        <div className="h-32 w-full shrink-0 overflow-hidden rounded-lg bg-[#0d1016] sm:h-[92px] sm:w-[145px]">

          <img
            src={
              workout.image ||
              "/assets/banner.png"
            }
            alt={workout.name}
            className="h-full w-full object-cover"
          />

        </div>


        {/* =========================
            WORKOUT CONTENT
        ========================= */}

        <div className="min-w-0 flex-1">

          {/* CATEGORY */}

          <div className="mb-2 flex flex-wrap gap-1.5">

            {(
              workout.muscleGroups ||
              workout.categories ||
              []
            )
              .slice(0, 2)
              .map((group) => (

                <span
                  key={group}
                  className="rounded border border-[#ccff00]/20 px-2.5 py-1 text-[10px] font-black uppercase text-[#ccff00]"
                >
                  {group}
                </span>

              ))}

          </div>


          {/* NAME */}

          <h2 className="truncate text-[18px] font-black uppercase leading-tight text-white sm:text-[19px]">
            {workout.name}
          </h2>


          {/* EQUIPMENT */}

          <p className="mt-1.5 truncate text-[12px] text-gray-500 sm:text-[13px]">
            {workout.equipment}
          </p>


          {/* INFO */}

          <div className="mt-3 flex flex-wrap items-center gap-5 text-[11px] font-bold uppercase text-gray-500">

            {/* DURATION */}

            <span className="flex items-center gap-1.5">

              <Clock3
                size={15}
                className="text-[#ccff00]"
              />

              {workout.duration || 0} min

            </span>


            {/* CALORIES */}

            <span className="flex items-center gap-1.5">

              <Flame
                size={15}
                className="text-[#ccff00]"
              />

              {workout.caloriesBurned ||
                workout.calories ||
                0}{" "}
              kcal

            </span>


            {/* RATING */}

            <span className="flex items-center gap-1.5">

              <Star
                size={15}
                fill="currentColor"
                className="text-[#ccff00]"
              />

              {workout.rating || "—"}

            </span>

          </div>

        </div>


        {/* =========================
            ACTION BUTTONS
        ========================= */}

        <div className="flex shrink-0 items-center gap-2.5">

          {/* VIEW DETAILS */}

          <Link
            href={`/workout/${workout.id}`}
            className="flex h-9 items-center rounded-full border border-white/15 px-4 text-[11px] font-bold text-gray-300 transition hover:border-white/30 hover:text-white"
          >
            View Details
          </Link>


          {/* MARK DONE */}

          {isPlan && (

            <button
              onClick={() =>
                onDone(workout.id)
              }
              className="flex h-9 items-center gap-1.5 rounded-full bg-[#ccff00] px-4 text-[11px] font-black uppercase text-black"
            >

              <Check size={13} />

              <span className="hidden md:inline">
                {workout.done
                  ? "Done"
                  : "Mark as Done"}
              </span>

            </button>

          )}


          {/* REMOVE */}

          <button
            onClick={() =>
              onRemove(workout.id)
            }
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-white/5 hover:text-red-400"
          >

            <X size={16} />

          </button>

        </div>

      </div>

    </article>
  );
}