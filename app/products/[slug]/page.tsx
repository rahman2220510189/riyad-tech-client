import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ProductRequestForm } from "@/components/ProductRequestForm";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { getContent, getProduct } from "@/lib/api";

/* Built at request time and then cached, so a system added in the admin panel
   appears without a redeploy. */
export const dynamicParams = true;

export async function generateStaticParams() {
  const { products } = await getContent();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: "Not found — Riyad Tech" };

  return {
    title: `${product.title} — Riyad Tech`,
    description: product.tagline,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  return (
    <main>
      <section className="band pb-0 pt-14 md:pt-20">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow load-in load-in-1">{product.category}</p>
              <h1 className="h-hero load-in load-in-2 mt-4 max-w-[16ch]">
                {product.title}
              </h1>
              <p className="measure load-in load-in-3 mt-5 text-[1.125rem] text-ink-soft">
                {product.tagline}
              </p>

              <div className="load-in load-in-4 mt-8 flex flex-wrap items-end gap-x-10 gap-y-5 border-t border-rule pt-6">
                <div>
                  <p className="mono-label text-muted">Price</p>
                  <p className="mt-1 font-display text-[2rem] font-bold leading-none tracking-[-0.03em]">
                    {product.price}
                  </p>
                  {product.priceNote && (
                    <p className="caption mt-1.5 text-muted">
                      {product.priceNote}
                    </p>
                  )}
                </div>
                <div>
                  <p className="mono-label text-muted">Delivered in</p>
                  <p className="mt-1 font-display text-[2rem] font-bold leading-none tracking-[-0.03em]">
                    {product.deliveryDays} days
                  </p>
                  <p className="caption mt-1.5 text-muted">
                    working days from payment
                  </p>
                </div>
              </div>

              {/* The ask, before the description rather than after it. A
                  visitor who has read the price and the delivery time has
                  already decided; making them scroll past four sections to
                  act on it loses the ones who were ready. */}
              <div className="load-in load-in-5 mt-8 flex flex-wrap items-center gap-3">
                <Button href="#request">Request this system</Button>
                {product.demoUrl && (
                  <Button variant="secondary" href={product.demoUrl} rel="noreferrer">
                    See it running
                    <span aria-hidden="true">↗</span>
                  </Button>
                )}
              </div>
            </div>

            <div className="load-in load-in-4 lg:col-span-5">
              {product.coverImage && (
                <div className="card relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={product.coverImage}
                    alt={`${product.title} screenshot`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="What it is">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="measure whitespace-pre-line text-ink-soft">
              {product.description}
            </p>
            {product.stack && (
              <p className="mono mt-8 border-t border-rule pt-5 text-muted">
                {product.stack}
              </p>
            )}
          </Reveal>

          <Reveal delay={60} className="grid gap-8 sm:grid-cols-2 lg:gap-10">
            {product.includes.length > 0 && (
              <div>
                <p className="mono-label text-muted">What you get</p>
                <ul className="mt-4 border-t border-rule">
                  {product.includes.map((line) => (
                    <li
                      key={line}
                      className="border-b border-rule py-3 text-[0.9375rem] text-ink-soft"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Saying what it does not do is what makes the list above
                believable — and it prevents the argument on handover day. */}
            {product.notIncluded.length > 0 && (
              <div>
                <p className="mono-label text-muted">What it does not do</p>
                <ul className="mt-4 border-t border-rule">
                  {product.notIncluded.map((line) => (
                    <li
                      key={line}
                      className="border-b border-rule py-3 text-[0.9375rem] text-muted"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      <Section
        tone="lift"
        className="border-y border-rule"
        eyebrow={site.buying.eyebrow}
        heading={site.buying.heading}
      >
        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-rule bg-rule md:grid-cols-5">
          {site.buying.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 60}
              className="bg-paper-lift bg-none p-6"
            >
              <p className="mono-label text-muted">0{i + 1}</p>
              <h3 className="h-card mt-3 text-[1.0625rem]">{step.title}</h3>
              <p className="caption mt-2 text-ink-soft">{step.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="measure mono mt-8 text-muted">{site.buying.note}</p>
        </Reveal>
      </Section>

      <Section id="request">
        <div className="max-w-[46rem]">
          <ProductRequestForm slug={product.slug} />
        </div>
      </Section>
    </main>
  );
}