import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how TootieWords handles information, cookies, analytics, and advertising.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#fff8ed] px-5 py-14 text-[#3d2b2b] sm:px-8">
        <article className="mx-auto max-w-4xl">
          <div className="rounded-[32px] border border-[#f1d7c5] bg-white/80 p-7 shadow-sm sm:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#e55b74]">
              TootieWords
            </p>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-4 text-sm text-[#765f59]">
              Last updated: September 10, 2026
            </p>

            <div className="mt-10 space-y-9 leading-8 text-[#584641]">
              <section>
                <h2 className="mb-3 text-2xl font-bold text-[#3d2b2b]">
                  Overview
                </h2>

                <p>
                  TootieWords respects your privacy. This Privacy Policy
                  explains what information may be collected when you use
                  TootieWords, how that information may be used, and the
                  third-party services that help us operate and improve the
                  website.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-[#3d2b2b]">
                  Information You Provide
                </h2>

                <p>
                  You can use the word-finding tools on TootieWords without
                  creating an account. Letters, words, and search options that
                  you enter into the word tools are used to provide results.
                  TootieWords does not require you to provide personal
                  information in order to use these tools.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-[#3d2b2b]">
                  Automatically Collected Information
                </h2>

                <p>
                  When you visit TootieWords, certain information may be
                  collected automatically by our website, hosting provider,
                  analytics services, or advertising partners. This may include
                  information such as your browser and device type, operating
                  system, pages visited, approximate geographic information,
                  referring pages, interactions with the website, IP address,
                  and other technical information.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-[#3d2b2b]">
                  Google Analytics
                </h2>

                <p>
                  TootieWords uses Google Analytics to help us understand how
                  visitors use the website. Google Analytics may use cookies
                  and similar technologies to collect information about website
                  activity, such as pages viewed, session information, browser
                  and device information, and approximate location.
                </p>

                <p className="mt-4">
                  We use this information to understand site traffic, improve
                  our tools, identify technical problems, and make TootieWords
                  more useful to visitors.
                </p>

                <p className="mt-4">
                  You can learn more about how Google handles information from
                  sites that use Google services in{" "}
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#d94d68] underline"
                  >
                    Google&apos;s information for sites and apps that use its
                    services
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-[#3d2b2b]">
                  Google AdSense and Advertising
                </h2>

                <p>
                  TootieWords uses or may use Google AdSense to display
                  advertisements. Third-party vendors, including Google, may use
                  cookies, web beacons, IP addresses, or other identifiers in
                  connection with advertising on this website.
                </p>

                <p className="mt-4">
                  Google and its advertising partners may use advertising
                  cookies to serve ads based on a visitor&apos;s previous visits
                  to TootieWords or other websites, where permitted.
                </p>

                <p className="mt-4">
                  Visitors can manage how Google uses information to personalize
                  advertisements through{" "}
                  <a
                    href="https://myadcenter.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#d94d68] underline"
                  >
                    Google&apos;s My Ad Center
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-[#3d2b2b]">
                  Cookies and Similar Technologies
                </h2>

                <p>
                  TootieWords and third-party services used by the website may
                  use cookies and similar technologies. Cookies are small pieces
                  of data stored by your browser that can help websites remember
                  information, measure website usage, provide functionality,
                  and support advertising.
                </p>

                <p className="mt-4">
                  You can control or delete cookies through your browser
                  settings. Disabling certain cookies may affect some website
                  features or the way advertisements are displayed.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-[#3d2b2b]">
                  Third-Party Services
                </h2>

                <p>
                  TootieWords may rely on third-party providers for services
                  such as hosting, analytics, advertising, security, and other
                  website operations. These providers may process information
                  according to their own privacy policies and applicable laws.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-[#3d2b2b]">
                  Your Privacy Choices
                </h2>

                <p>
                  Depending on where you live, you may have rights or choices
                  regarding certain uses of your information. You may also use
                  browser controls to manage cookies and Google&apos;s privacy
                  and advertising controls to manage certain Google services.
                </p>

                <p className="mt-4">
                  Where required, TootieWords may provide additional consent or
                  privacy controls for cookies, analytics, or advertising.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-[#3d2b2b]">
                  Children&apos;s Privacy
                </h2>

                <p>
                  TootieWords is a general-audience word tool and is not
                  directed specifically to children under 13. We do not
                  knowingly ask children under 13 to provide personal
                  information through the word-finding tools.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-[#3d2b2b]">
                  Changes to This Privacy Policy
                </h2>

                <p>
                  We may update this Privacy Policy as TootieWords changes or as
                  our services and legal obligations evolve. When we make
                  changes, we may update the date shown at the top of this page.
                </p>
              </section>

              <section>
                <h2 className="mb-3 text-2xl font-bold text-[#3d2b2b]">
                  Contact
                </h2>

                <p>
                  If you have questions about this Privacy Policy or privacy at
                  TootieWords, please use the contact information provided on
                  the website.
                </p>
              </section>

              <div className="border-t border-[#ead8cb] pt-7">
                <Link
                  href="/"
                  className="font-bold text-[#d94d68] hover:underline"
                >
                  ← Back to TootieWords
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}