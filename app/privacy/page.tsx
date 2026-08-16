import type { Metadata } from "next";
import { site } from "@/content/site";
import { getContent } from "@/lib/api";

export const metadata: Metadata = {
  title: `Privacy — ${site.meta.name}`,
  description:
    "How Riyad Tech handles personal data and client documents, and where that processing happens.",
};

/* TODO before launch: have this reviewed, and fill in the company details
   in the controller section. The structure below is the one a European
   visitor expects to find. */
export default async function Privacy() {
  const { settings } = await getContent();
  return (
    <article className="band wrap measure">
      <p className="eyebrow">Legal</p>
      <h1 className="h-section mt-4">Privacy</h1>
      <p className="mt-6 text-ink-soft">
        Last updated {new Date().getFullYear()}. This page explains what we
        collect when you visit this site, and what happens to the documents you
        send us during a project.
      </p>

      <h2 className="h-card mt-12">Who is responsible</h2>
      <p className="mt-3 text-ink-soft">
        Riyad Tech, Dhaka, Bangladesh. For any question about your data, write
        to{" "}
        <a className="underline underline-offset-2" href={`mailto:${settings.email}`}>
          {settings.email}
        </a>
        .
      </p>

      <h2 className="h-card mt-10">This website</h2>
      <p className="mt-3 text-ink-soft">
        We use privacy-friendly analytics that set no cookies and collect no
        personal data. We do not use Google Analytics. Booking a call is handled
        by Cal.com, which processes the name and email you enter there.
      </p>

      <h2 className="h-card mt-10">Documents you send us</h2>
      <p className="mt-3 text-ink-soft">
        Client documents are processed on EU-hosted infrastructure. They are
        never used to train models. A Data Processing Agreement is signed before
        any data is exchanged, and data is deleted on request.
      </p>

      <h2 className="h-card mt-10">Your rights</h2>
      <p className="mt-3 text-ink-soft">
        Under the GDPR you can ask for a copy of your data, ask us to correct or
        delete it, or object to processing. Write to the address above and we
        will answer within one month.
      </p>
    </article>
  );
}