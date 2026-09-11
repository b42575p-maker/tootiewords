import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-storybook relative overflow-hidden text-[#fff8ef]">
      <div className="footer-glow footer-glow-left" />
      <div className="footer-glow footer-glow-right" />

      <div className="mx-auto grid min-h-[390px] max-w-[1380px] items-center gap-8 px-6 pb-8 pt-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        {/* LEFT FOOTER CONTENT */}
        <div className="relative z-20">
          <Link
            href="/"
            aria-label="TootieWords home"
            className="inline-block"
          >
            <Image
              src="/tootiewords-logo.png"
              alt="TootieWords"
              width={340}
              height={170}
              sizes="235px"
              className="footer-logo h-auto w-[210px] sm:w-[235px]"
            />
          </Link>

          <p className="footer-tagline">
            Find More Words. More Fun. 🐾
          </p>

          <nav className="footer-links">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <nav className="footer-tool-links">
            <Link href="/word-unscrambler">
              Word Unscrambler
            </Link>

            <Link href="/anagram-solver">
              Anagram Solver
            </Link>

            <Link href="/words-from-letters">
              Words From Letters
            </Link>
          </nav>

          <p className="footer-copyright">
            © {new Date().getFullYear()} TootieWords. All rights reserved.
          </p>
        </div>

        {/* TOOTIE */}
        <div className="relative z-10 min-h-[250px]">
          <div className="footer-note">
            Thanks for
            <br />
            Exploring!
            <span>♡</span>

            <div className="footer-note-line" />
          </div>

          <Paw className="left-[8%] top-[50%] rotate-[-12deg]" />
          <Paw className="left-[21%] bottom-[15%] rotate-[9deg]" />

          <Image
            src="/tootie-footer-optimized.webp"
            alt="Tootie peeking over the bottom of the page"
            width={1200}
            height={400}
            sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 100vw, 780px"
            className="footer-tootie pointer-events-none absolute bottom-[-74px] right-[-9%] h-auto w-[112%] max-w-[780px]"
          />
        </div>
      </div>

      <div className="footer-cream-wave" />
    </footer>
  );
}

function Paw({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`pointer-events-none absolute text-5xl opacity-[0.2] ${className}`}
      aria-hidden="true"
    >
      🐾
    </span>
  );
}