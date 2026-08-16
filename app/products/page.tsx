import type { Metadata } from "next";
import { ProductGrid } from "@/components/ProductGrid";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { getContent } from "@/lib/api";

export const metadata: Metadata = {
  title: site.pages.products.title,
  description: site.pages.products.description,
  alternates: { canonical: "/products" },
};

export default async function ProductsPage() {
  const page = site.pages.products;
  const { products } = await getContent();

  return (
    <main>
      <PageHeader eyebrow={page.eyebrow} heading={page.heading} sub={page.sub} />

      <Section ruled={false}>
        {products.length === 0 ? (
          <p className="measure text-muted">{page.empty}</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </Section>

      <CtaBand />
    </main>
  );
}