import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-50 border-b border-[#efd9c7] bg-[#fffaf4]/95 shadow-[0_4px_18px_rgba(74,46,37,0.06)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-6">
        <Link
          href="/"
          aria-label="TootieWords home"
          className="shrink-0 transition hover:scale-[1.02]"
        >
          <Image
            src="/tootiewords-logo.png"
            alt="TootieWords"
            width={310}
            height={150}
            priority
            className="h-auto w-[185px] sm:w-[220px]"
          />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          <NavLink href="/" active>
            Home
          </NavLink>

          <NavLink href="/word-unscrambler">
            Word Unscrambler
          </NavLink>

          <NavLink href="/anagram-solver">
            Anagram Solver
          </NavLink>

          <NavLink href="/words-from-letters">
            Words From Letters
          </NavLink>

          <NavLink href="/about">
            About
          </NavLink>
        </nav>

        <div className="hidden rotate-[-4deg] text-right font-hand text-lg leading-5 text-[#7a4432] xl:block">
          Good words
          <br />
          happen here! ♡
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto border-t border-[#f4e6db] bg-white/70 px-4 py-2 text-sm font-bold text-[#69483d] lg:hidden">
        <MobileLink href="/">Home</MobileLink>
        <MobileLink href="/word-unscrambler">
          Unscrambler
        </MobileLink>
        <MobileLink href="/anagram-solver">
          Anagrams
        </MobileLink>
        <MobileLink href="/words-from-letters">
          Words From Letters
        </MobileLink>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  active = false,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-2xl px-5 py-3 text-sm font-bold transition duration-200 ${
        active
          ? "bg-gradient-to-r from-[#ef799a] to-[#f0527e] text-white shadow-[0_6px_16px_rgba(240,82,126,0.25)]"
          : "bg-[#f9ecdf] text-[#573a31] hover:-translate-y-0.5 hover:bg-[#ffe2c8]"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="shrink-0 rounded-full bg-[#fff1e5] px-4 py-2 hover:bg-[#ffe1c8]"
    >
      {children}
    </Link>
  );
}