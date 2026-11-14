import Image from "next/image";
import Link from "next/link";

export default function Header({
  showGameBanner = true,
}: {
  showGameBanner?: boolean;
}) {
  return (
    <header className="relative z-50 border-b border-[#efd9c7] bg-[#fffaf4]/95 shadow-[0_4px_18px_rgba(74,46,37,0.06)] backdrop-blur">
      {showGameBanner && (
        <Link
          href="/word-pounce"
          className="font-hand flex items-center justify-center gap-2 bg-gradient-to-r from-[#f4b56b] to-[#ef9b4a] px-4 py-2.5 text-center font-bold text-[#4a2618] transition hover:brightness-105"
        >
          <span className="hidden rounded-full bg-white px-2.5 py-0.5 text-xs text-[#c4621a] sm:inline">
            NEW
          </span>
          <span className="sm:hidden">
            🐾 New daily game: <span className="underline">Play Word Pounce &rarr;</span>
          </span>
          <span className="hidden sm:inline">
            🐾 Tootie&apos;s Word Pounce is here! A free word puzzle every day.{" "}
            <span className="underline">Play now &rarr;</span>
          </span>
        </Link>
      )}

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
          <NavLink href="/">
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

          <NavLink href="/guides">
            Guides
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

      <nav className="font-hand flex gap-2 overflow-x-auto border-t border-[#f4e6db] bg-white/70 px-4 py-2 text-base font-bold text-[#69483d] lg:hidden">
        <Link
          href="/word-pounce"
          className="shrink-0 rounded-full border-2 border-[#d8741e] bg-gradient-to-r from-[#f4b56b] to-[#ef9b4a] px-4 py-2 text-[#4a2618]"
        >
          🐾 Word Pounce
        </Link>
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
        <MobileLink href="/guides">Guides</MobileLink>
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
      className={`font-hand rounded-full border-2 px-5 py-3 text-[0.95rem] font-bold transition duration-200 ${
        active
          ? "border-[#d8741e] bg-[#ffd9ae] text-[#7a3f14]"
          : "border-[#efc9a8] bg-[#fff0df] text-[#9a5221] hover:-translate-y-0.5 hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
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
      className="shrink-0 rounded-full border-2 border-[#efc9a8] bg-[#fff0df] px-4 py-2 text-[#9a5221] hover:border-[#ef9b4a] hover:bg-[#ffe4c4]"
    >
      {children}
    </Link>
  );
}