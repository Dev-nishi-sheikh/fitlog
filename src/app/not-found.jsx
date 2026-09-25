import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#080a0f] px-4">

      <div className="text-center">

        <p className="text-7xl font-black text-[#ccff00]">
          404
        </p>

        <h1 className="mt-4 text-3xl font-black uppercase text-white">
          Page Not Found
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          The workout or page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="btn mt-7 h-10 min-h-10 rounded bg-[#ccff00] px-5 text-[10px] font-black uppercase text-black hover:bg-[#ccff00]"
        >
          <ArrowLeft size={14} />
          Back Home
        </Link>

      </div>

    </main>
  );
}