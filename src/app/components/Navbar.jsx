"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ClipboardList,
  Bookmark,
} from "lucide-react";
import { useState } from "react";
import { useFitlog } from "../context/FitlogContext";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { plan, saved } = useFitlog();

  const workoutActive = pathname === "/";
  const planActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080a0f]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <img
            src="/assets/logo.png"
            alt="FitLog Logo"
            className="h-6 w-6 object-contain"
          />

          <span className="text-lg font-black tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-1 md:flex">

          <Link
            href="/"
            className={`rounded px-5 py-2.5 text-[14px] font-black uppercase tracking-wider transition ${
              workoutActive
                ? "bg-white/10 text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded px-5 py-2.5 text-[14px] font-black uppercase tracking-wider transition ${
              planActive
                ? "bg-white/10 text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
            }`}
          >
            My Plan
          </Link>

        </nav>

        {/* COUNTERS */}
        <div className="hidden items-center gap-2 md:flex">

          <Link
            href="/my-plan"
            className="flex h-9 items-center gap-2 rounded bg-[#ccff00] px-4 text-[13px] font-black uppercase text-black transition hover:opacity-90"
          >
            <ClipboardList size={16} />
            PLAN {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="flex h-9 items-center gap-2 rounded border border-white/15 px-4 text-[13px] font-black uppercase text-gray-300 transition hover:border-white/30 hover:text-white"
          >
            <Bookmark size={16} />
            SAVED {saved.length}
          </Link>

        </div>

        {/* MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="btn btn-square btn-ghost md:hidden"
        >
          <Menu size={22} />
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-white/[0.08] bg-[#0d1016] p-4 md:hidden">

          <div className="flex flex-col gap-2">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded px-3 py-3 text-[15px] font-black uppercase text-gray-300 hover:bg-white/5"
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setOpen(false)}
              className="rounded px-3 py-3 text-[15px] font-black uppercase text-gray-300 hover:bg-white/5"
            >
              My Plan
            </Link>

            <div className="mt-2 flex gap-2 border-t border-white/10 pt-4">

              <Link
                href="/my-plan"
                className="rounded bg-[#ccff00] px-4 py-2.5 text-[13px] font-black text-black"
              >
                PLAN {plan.length}
              </Link>

              <Link
                href="/my-plan"
                className="rounded border border-white/15 px-4 py-2.5 text-[13px] font-black text-white"
              >
                SAVED {saved.length}
              </Link>

            </div>

          </div>

        </div>
      )}
    </header>
  );
}