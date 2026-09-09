import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the TootieWords Privacy Policy and learn how information may be collected and used when you visit TootieWords.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: September 7, 2026
        </p>

        <p className="mt-8 leading-8 text-slate-600">
          TootieWords respects your privacy. This Privacy Policy
          explains the types of information that may be collected when
          you visit TootieWords and how that information may be used.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Information You Enter
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          TootieWords provides tools that allow you to enter letters,
          words, and search filters. This information is used to
          generate word results and is not intended to identify you
          personally.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Automatically Collected Information
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          Like many websites, TootieWords may collect basic technical
          information when you visit the site. This may include
          information such as your browser type, device type, referring
          page, pages visited, and general usage information.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Cookies and Similar Technologies
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          TootieWords may use cookies or similar technologies to
          operate the website, understand how visitors use the site,
          remember preferences, and improve the user experience.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Analytics
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          TootieWords may use analytics services to better understand
          website traffic and how visitors interact with the site.
          These services may collect information about your device,
          browser, and use of the website.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Advertising
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          TootieWords may display advertisements in the future.
          Advertising providers may use cookies or similar technologies
          to measure advertising performance and, where permitted,
          provide relevant advertisements.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Third-Party Services
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          TootieWords may use third-party services to help operate,
          analyze, or support the website. Those services may process
          information according to their own privacy policies.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Children's Privacy
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          TootieWords is not intended to knowingly collect personal
          information from children. If you believe personal
          information from a child has been provided to TootieWords,
          please contact us so the matter can be reviewed.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Changes to This Privacy Policy
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          This Privacy Policy may be updated as TootieWords changes or
          adds new features and services. The latest version will be
          posted on this page with an updated revision date.
        </p>

        <h2 className="mt-10 text-2xl font-bold">
          Contact
        </h2>

        <p className="mt-4 leading-8 text-slate-600">
          If you have questions about this Privacy Policy, you can
          contact TootieWords using the contact information provided
          on the website.
        </p>
      </section>

      <Footer />
    </main>
  );
}