import type { Metadata } from "next";
import { site } from "@/content/site";
import { getContent } from "@/lib/api";

export const metadata: Metadata = {
  title: `Imprint — ${site.meta.name}`,
  description: "Company details for Riyad Tech.",
};

/* TODO before launch: fill in the registered name, address and any trade
   licence number. German and Austrian visitors look for this page by name. */
export default async function Imprint() {
  const { settings } = await getContent();
  return (
    <article className="band wrap measure">
      <p className="eyebrow">Legal</p>
      <h1 className="h-section mt-4">Imprint</h1>

      <dl className="mono mt-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 border-t border-rule pt-6">
        <dt className="mono-label pt-0.5 text-muted">Business</dt>
        <dd>Riyad Tech</dd>
        <dt className="mono-label pt-0.5 text-muted">Address</dt>
        <dd>Dhaka, Bangladesh</dd>
        <dt className="mono-label pt-0.5 text-muted">Email</dt>
        <dd>
          <a className="underline underline-offset-2" href={`mailto:${settings.email}`}>
            {settings.email}
          </a>
        </dd>
        <dt className="mono-label pt-0.5 text-muted">VAT</dt>
        <dd>Non-EU supplier · reverse charge applies</dd>
      </dl>

      <p className="mt-8 text-ink-soft">
        Responsible for the content of this site: Riyad Tech.
      </p>
    </article>
  );
}