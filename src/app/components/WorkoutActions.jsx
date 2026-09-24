"use client";

import { Bookmark, Check, ClipboardPlus } from "lucide-react";
import { useFitlog } from "../context/FitlogContext";

const WorkoutActions = ({ workout }) => {
  const { plan, saved, addToPlan, saveForLater } = useFitlog();

  const alreadyInPlan = plan.some((item) => item.id === workout.id);
  const alreadySaved = saved.some((item) => item.id === workout.id);

  const planFull = plan.length >= 5;

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      <button
        onClick={() => addToPlan(workout)}
        disabled={alreadyInPlan || planFull}
        className={`flex items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-black uppercase ${
          alreadyInPlan || planFull
            ? "cursor-not-allowed bg-[#292929] text-gray-500"
            : "bg-[#ccff00] text-black hover:scale-[1.02]"
        }`}
      >
        {alreadyInPlan ? <Check size={18} /> : <ClipboardPlus size={18} />}

        {alreadyInPlan
          ? "Already in plan"
          : planFull
          ? "Plan is full"
          : "Add to today's plan"}
      </button>

      <button
        onClick={() => saveForLater(workout)}
        disabled={alreadySaved}
        className={`flex items-center justify-center gap-2 rounded-full border px-5 py-4 text-sm font-black uppercase ${
          alreadySaved
            ? "cursor-not-allowed border-[#292929] text-gray-500"
            : "border-white/30 hover:border-[#ccff00] hover:text-[#ccff00]"
        }`}
      >
        {alreadySaved ? <Check size={18} /> : <Bookmark size={18} />}

        {alreadySaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;