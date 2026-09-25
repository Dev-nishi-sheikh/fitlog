import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6">

      <div className="relative min-h-[330px] overflow-hidden rounded-lg border border-white/[0.08] bg-[#11151c] sm:min-h-[390px]">

        {/* CONTENT */}
        <div className="relative z-10 flex min-h-[330px] w-full flex-col justify-center px-6 py-10 sm:min-h-[390px] sm:w-[62%] sm:px-10 lg:px-12">

          {/* SMALL TITLE */}
          <p className="mb-3 text-[15px] font-black uppercase tracking-[0.25em] text-[#ccff00] sm:text-[16px]">
            WORKOUT LIBRARY
          </p>

          {/* MAIN HEADING */}
          <h1 className="max-w-[600px] text-3xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-4xl lg:text-6xl">
            TRAIN WITH
            <br />
            INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-5 max-w-[480px] text-[17px] leading-7 text-gray-500 sm:text-[19px] sm:leading-8">
            FitLog is a dark, no-nonsense gym companion:
            pick a lift, lock it into today's plan, and watch
            the week's work add up. to 
          </p>

          {/* BUTTON */}
          <div className="mt-6">
            <Link
              href="#library"
              className="btn h-11 min-h-11 rounded bg-[#ccff00] px-5 text-[15px] font-black uppercase text-black hover:bg-[#ccff00] hover:opacity-90"
            >
              Browse Workouts
              <ArrowRight size={19} />
            </Link>
          </div>

        </div>

        {/* IMAGE CONTAINER
            Container/div size stays the same
        */}
        <div className="absolute right-0 top-0 h-full w-[48%] sm:w-[45%]">

          {/* Only the image is made slightly smaller */}
          <div className="flex h-full w-full items-center justify-center overflow-hidden">

            <img
              src="/assets/banner.png"
              alt="FitLog workout"
              className="h-70 w-70 scale-[0.90] object-cover object-center"
            />

          </div>

          {/* Gradient stays over the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#11151c] via-[#11151c]/40 to-transparent" />

        </div>

      </div>
    </section>
  );
}