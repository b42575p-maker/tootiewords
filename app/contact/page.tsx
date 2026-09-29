import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact TootieWords with questions, feedback, corrections, or suggestions about our free word tools.",
  alternates: {
    canonical: "https://tootiewords.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fffaf4] text-[#3d2923]">
      <Header />

      <section className="px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-[#efd5be] bg-white p-7 shadow-[0_18px_40px_rgba(86,51,36,0.08)] sm:p-10">
            <p className="font-hand text-lg font-bold text-[#d85b7c]">
              Tootie&apos;s Mailbox
            </p>

            <h1 className="whimsy-title mt-2 text-4xl font-black text-[#4a2118] sm:text-5xl">
              Contact TootieWords
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#6f5549]">
              Have a question, found something that does not look right, or have
              an idea that could make TootieWords more useful? We would be happy
              to hear from you.
            </p>

            <div className="mt-8 rounded-[1.5rem] border-2 border-[#efd3ba] bg-[#fff8ef] p-6">
              <h2 className="text-xl font-black text-[#4a2e25]">
                Email Us
              </h2>

              <p className="mt-3 leading-7 text-[#755d52]">
                The easiest way to reach TootieWords is by email:
              </p>

              <a
                href="mailto:support@tootiewords.com"
                className="mt-4 inline-block break-all text-lg font-black text-[#d85b7c] underline decoration-[#ef9ab2] underline-offset-4 hover:text-[#bd4565]"
              >
                support@tootiewords.com
              </a>
            </div>

            <section className="mt-10">
              <h2 className="text-2xl font-black text-[#4a2e25]">
                What Can You Contact Us About?
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <ContactCard
                  title="Word Results"
                  text="Let us know if you find a result that seems incorrect or if a word behaves unexpectedly."
                />

                <ContactCard
                  title="Site Problems"
                  text="Tell us if a tool is not working correctly or if you encounter a technical problem."
                />

                <ContactCard
                  title="Suggestions"
                  text="Have an idea for a useful word tool, filter, or improvement? Suggestions are welcome."
                />

                <ContactCard
                  title="Privacy Questions"
                  text="You can also contact us with questions about privacy or information on TootieWords."
                />
              </div>
            </section>

            <section className="mt-10 border-t border-[#f0ded0] pt-8">
              <h2 className="text-xl font-black text-[#4a2e25]">
                About Word Lists
              </h2>

              <p className="mt-4 leading-7 text-[#766056]">
                Different dictionaries and word games can use different accepted
                word lists. If you contact us about a particular word, it helps
                to mention the tool you were using and what you expected to see.
              </p>
            </section>

            <div className="mt-10 flex flex-wrap gap-3 border-t border-[#f0ded0] pt-8">
              <Link
                href="/"
                className="rounded-full bg-[#f4a24a] px-6 py-3 font-black text-white transition hover:bg-[#df8a32]"
              >
                Back to TootieWords
              </Link>

              <Link
                href="/about"
                className="rounded-full border-2 border-[#e7cdb8] bg-white px-6 py-3 font-black text-[#795b4c] transition hover:bg-[#fff4e8]"
              >
                About TootieWords
              </Link>

              <Link
                href="/privacy"
                className="rounded-full border-2 border-[#e7cdb8] bg-white px-6 py-3 font-black text-[#795b4c] transition hover:bg-[#fff4e8]"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-[#f0ded0] bg-[#fffdf9] p-5">
      <h3 className="font-black text-[#4a2e25]">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-[#80685c]">
        {text}
      </p>
    </div>
  );
}
