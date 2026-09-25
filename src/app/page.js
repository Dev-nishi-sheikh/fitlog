import Hero from "./components/Hero";
import WorkoutLibrary from "./components/WorkoutLibrary";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080a0f]">

      <Hero />

      <section
        id="library"
        className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6"
      >

        <div className="mb-6">

          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ccff00]">
            WORKOUTS
          </p>

          <h2 className="mt-2 text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-5xl">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-xs text-gray-600 sm:text-sm">
            Twelve lifts covering every major muscle group.
          </p>

        </div>

        <WorkoutLibrary />

      </section>

    </main>
  );
}