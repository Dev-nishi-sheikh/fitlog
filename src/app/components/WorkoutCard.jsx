import Link from "next/link";
import { Clock3, Flame, Star, Dumbbell } from "lucide-react";

const WorkoutCard = ({ workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-[#292929] bg-[#111] hover:-translate-y-1 hover:border-[#ccff00]"
    >
      <div className="relative h-56 overflow-hidden bg-[#191919]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-black/80 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#ccff00]"
            >
              {group}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-black uppercase">{workout.name}</h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
          <Dumbbell size={15} />
          <span>{workout.equipment}</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#292929] pt-4 text-xs text-gray-400">
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
    </Link>
  );
};

export default WorkoutCard;