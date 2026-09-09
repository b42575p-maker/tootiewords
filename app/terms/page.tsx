import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the TootieWords Terms of Use for using our free word finder, anagram solver, and word unscrambler tools.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold">Terms of Use</h1>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: September 7, 2026
        </p>

        <p className="mt-8 leading-8 text-slate-600">
          These Terms of Use govern your use of TootieWords. By using
          this website, you agree to these terms. If you do not agree
          with these terms, please do not use the website.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          About TootieWords
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          TootieWords provides free online tools for finding words,
          unscrambling letters, solving anagrams, and performing
          related word searches.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Permitted Use
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          You may use TootieWords for personal, educational, and other
          lawful purposes. You agree not to use the website in a way
          that interferes with its operation, attempts to gain
          unauthorized access to its systems, or violates applicable
          laws or regulations.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Word Results and Accuracy
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          TootieWords uses word lists and software to generate search
          results. Although we work to provide useful and accurate
          results, we do not guarantee that every result will be
          complete, correct, commonly used, or accepted by every word
          game, dictionary, competition, or organization.
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          Different games and dictionaries may use different rules and
          word lists. You are responsible for confirming whether a word
          is valid under the rules that apply to your particular game
          or activity.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Website Availability
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          We may modify, update, suspend, or discontinue any part of
          TootieWords at any time. We do not guarantee that the website
          or any particular feature will always be available or operate
          without interruption or errors.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Intellectual Property
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          The TootieWords name, website design, original content,
          graphics, and other original materials on the website are
          protected by applicable intellectual property laws. Third-party
          word lists, data, software, or other materials remain subject
          to their respective licenses and ownership rights.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Third-Party Services
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          TootieWords may use or link to third-party websites,
          services, advertisements, or resources. We are not responsible
          for the content, availability, privacy practices, or policies
          of third-party services.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Disclaimer
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          TootieWords is provided on an "as is" and "as available"
          basis. To the extent permitted by law, we make no warranties,
          express or implied, regarding the operation, availability,
          accuracy, or reliability of the website or its results.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Limitation of Liability
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          To the extent permitted by applicable law, TootieWords and
          its owners will not be liable for indirect, incidental,
          special, consequential, or similar damages resulting from
          your use of, or inability to use, the website.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Changes to These Terms
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          These Terms of Use may be updated from time to time as
          TootieWords changes or adds new features. The latest version
          will be posted on this page with an updated revision date.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Contact
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          If you have questions about these Terms of Use, you can
          contact TootieWords using the contact information provided
          on the website.
        </p>
      </section>

      <Footer />
    </main>
  );
}