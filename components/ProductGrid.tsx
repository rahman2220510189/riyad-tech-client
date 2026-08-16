import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { ProductSummary } from "@/lib/api";

/**
 * The product cards.
 *
 * Price and delivery time are on the card, not behind a click. A visitor who
 * has to open three pages to find out whether something is €200 or €20,000
 * usually opens none of them.
 */
export function ProductGrid({ products }: { products: ProductSummary[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <Reveal as="li" key={product.slug} delay={i * 60}>
          <Link
            href={`/products/${product.slug}`}
            className="card card-hover group flex h-full flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/10] border-b border-rule bg-paper">
              {product.coverImage ? (
                <Image
                  src={product.coverImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="mono-label text-rule">{product.category}</span>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-baseline justify-between gap-3">
                <p className="mono-label text-muted">{product.category}</p>
                {product.featured && <span className="tag">Popular</span>}
              </div>
              <h3 className="h-card mt-3">{product.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-soft">
                {product.tagline}
              </p>

              <div className="mt-auto pt-6">
                <p className="mono text-muted">{product.stack}</p>

                <div className="mt-4 flex items-end justify-between gap-4 border-t border-rule pt-4">
                  <div>
                    <p className="font-display text-[1.5rem] font-bold leading-none tracking-[-0.03em]">
                      {product.price}
                    </p>
                    {product.priceNote && (
                      <p className="caption mt-1 text-muted">
                        {product.priceNote}
                      </p>
                    )}
                  </div>
                  <p className="mono-label whitespace-nowrap text-muted">
                    {product.deliveryDays} days
                  </p>
                </div>

                {/* The card is one link, so this is a signpost rather than a
                    second control — a nested button would fight the card for
                    the click and confuse a keyboard entirely. */}
                <p className="mono-label mt-4 flex items-center gap-1.5 text-ink">
                  See details and buy
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-150 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </p>
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}