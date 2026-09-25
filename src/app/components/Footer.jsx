import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-dotted border-[#ccff00]/40 bg-[#080a0f]">
      <div className="mx-auto flex min-h-[58px] max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">

        {/* LEFT - LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <img
            src="/assets/logo.png"
            alt="FitLog Logo"
            className="h-5 w-5 object-contain"
          />

          <span className="text-[11px] font-black uppercase tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* RIGHT - COPYRIGHT */}
        <p className="text-right text-[9px] font-medium text-gray-600 sm:text-[10px]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}