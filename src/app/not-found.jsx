import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="text-center">
        <p className="text-sm font-black tracking-[0.3em] text-[#ccff00]">
          ERROR 404
        </p>

        <h1 className="display-font mt-4 text-7xl uppercase sm:text-9xl">
          NOT FOUND
        </h1>

        <p className="mx-auto mt-5 max-w-md text-gray-500">
          The workout or page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black"
        >
          <ArrowLeft size={17} />
          Back Home
        </Link>
      </div>
    </section>
  );
}