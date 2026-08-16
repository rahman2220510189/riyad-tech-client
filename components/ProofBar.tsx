import { site } from "@/content/site";

/**
 * The band directly under the hero.
 *
 * After the demo, the eye keeps moving and the visitor is holding four
 * questions: how long, how much, where is my data, who are you. Answering
 * them in four short lines, before any argument is made, is worth more than
 * a paragraph of persuasion further down.
 *
 * Every value here is checkable against something else on the site. Nothing
 * is rounded up, and there is no "100+" or "24/7".
 */
export function ProofBar() {
  return (
    <section className="border-y border-rule bg-paper-lift bg-none">
      <div className="wrap">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {site.proof.map((item, i) => (
            <div
              key={item.label}
              className={[
                "border-rule py-8 pr-6",
                /* Rules between cells, never around the outside. */
                i % 2 === 1 ? "border-l pl-6" : "",
                i < 2 ? "border-b lg:border-b-0" : "",
                "lg:border-b-0 lg:border-l lg:pl-6",
                i === 0 ? "lg:border-l-0 lg:pl-0" : "",
              ].join(" ")}
            >
              <dt className="font-display text-[1.75rem] font-bold leading-none tracking-[-0.03em]">
                {item.value}
              </dt>
              <dd className="mono-label mt-3 max-w-[22ch] text-muted">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}