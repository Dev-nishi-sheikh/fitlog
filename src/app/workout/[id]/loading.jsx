export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#080a0f]">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-md text-[#ccff00]" />

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
          Loading workout…
        </p>
      </div>
    </div>
  );
}