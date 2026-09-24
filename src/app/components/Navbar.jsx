"use client";

import Link from "next/link";
import { ClipboardList, Bookmark } from "lucide-react";
import { useFitlog } from "../context/FitlogContext";

const Navbar = () => {
  const { plan, saved } = useFitlog();

  return (
    <header className="sticky top-0 z-50 border-b border-[#292929] bg-[#0a0a0a]/95 backdrop-blur">
      <div className="container-fit flex min-h-[76px] items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#ccff00] font-black text-black">
            F
          </div>

          <span className="text-xl font-black tracking-tight">FITLOG</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#library"
            className="text-sm font-bold uppercase tracking-wider text-white hover:text-[#ccff00]"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-bold uppercase tracking-wider text-white hover:text-[#ccff00]"
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1 rounded-full bg-[#ccff00] px-3 py-2 text-xs font-black text-black hover:scale-105"
          >
            <ClipboardList size={14} />
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1 rounded-full border border-white/30 px-3 py-2 text-xs font-black text-white hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            <Bookmark size={14} />
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;