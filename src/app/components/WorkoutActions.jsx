"use client";

import {
  Bookmark,
  Check,
  ClipboardPlus,
} from "lucide-react";

import { useFitlog } from "../context/FitlogContext";

export default function WorkoutActions({
  workout,
}) {
  const {
    plan,
    saved,
    addToPlan,
    saveForLater,
  } = useFitlog();

  const alreadyInPlan =
    plan.some(
      (item) =>
        String(item.id) ===
        String(workout.id)
    );

  const alreadySaved =
    saved.some(
      (item) =>
        String(item.id) ===
        String(workout.id)
    );

  const planFull =
    plan.length >= 5;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">

      <button
        onClick={() =>
          addToPlan(workout)
        }
        disabled={
          alreadyInPlan || planFull
        }
        className="btn h-11 min-h-11 flex-1 rounded bg-[#ccff00] text-[10px] font-black uppercase text-black hover:bg-[#ccff00] disabled:bg-gray-700 disabled:text-gray-400"
      >
        {alreadyInPlan ? (
          <Check size={16} />
        ) : (
          <ClipboardPlus size={16} />
        )}

        {alreadyInPlan
          ? "Already in plan"
          : planFull
          ? "Plan is full"
          : "Add to today's plan"}
      </button>

      <button
        onClick={() =>
          saveForLater(workout)
        }
        disabled={alreadySaved}
        className="btn btn-outline h-11 min-h-11 flex-1 rounded border-white/15 text-[10px] font-black uppercase text-white hover:border-[#ccff00] hover:bg-[#ccff00] hover:text-black disabled:border-white/10 disabled:text-gray-600"
      >
        {alreadySaved ? (
          <Check size={16} />
        ) : (
          <Bookmark size={16} />
        )}

        {alreadySaved
          ? "Saved"
          : "Save for later"}
      </button>

    </div>
  );
}