const Loading = () => {
  return (
    <div className="flex min-h-[350px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#333] border-t-[#ccff00]" />

        <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
          Loading workouts…
        </p>
      </div>
    </div>
  );
};

export default Loading;