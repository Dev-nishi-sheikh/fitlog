import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-[#292929] bg-[#070707]">
      <div className="container-fit flex min-h-[110px] flex-col items-center justify-between gap-5 py-7 sm:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[#ccff00] font-black text-black">
            F
          </div>

          <span className="font-black tracking-widest">FITLOG</span>
        </Link>

        <p className="text-center text-xs text-gray-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;