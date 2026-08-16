import { site } from "@/content/site";

/**
 * The only file in this project that knows riyad-api exists.
 *
 * Content is fetched at build time and after an edit — never on a visitor's
 * request. Pages stay static, so the site is as fast as it was before there
 * was a backend, and it keeps working when the backend is asleep.
 *
 * If the API cannot be reached, the copy in content/site.ts is used instead.
 * That fallback is not a patch over a flaky connection; it is what makes three
 * separate things possible:
 *
 *   - the site runs with no backend at all, which is how it was built
 *   - Vercel can build it while the API is still only on your laptop
 *   - a backend outage costs new edits, not the website
 */

const API_URL = process.env.API_URL ?? "";

/**
 * Caching is a production concern, not a development one.
 *
 * In production a page is built once and rebuilt only when the admin panel
 * saves something — visitors get a static file and the database is barely
 * touched. In development that same behaviour means an edit appears to do
 * nothing, and the only fix anyone remembers is restarting the server.
 *
 * So: no cache while developing, tagged cache when deployed.
 */
const cachePolicy: RequestInit["next"] =
  process.env.NODE_ENV === "development"
    ? { revalidate: 0 }
    : { revalidate: 3600, tags: ["content"] };

export type ServiceItem = {
  index: string;
  title: string;
  body: string;
  uses: string[];
};

export type WorkItem = {
  title: string;
  problem: string;
  result: string;
  stack: string;
  href: string;
  tag: string;
  coverImage: string | null;
};

/** Card-level fields. The detail page fetches the full row by slug. */
export type ProductSummary = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  price: string;
  priceNote: string;
  deliveryDays: number;
  stack: string;
  coverImage: string | null;
  featured: boolean;
};

export type Product = ProductSummary & {
  description: string;
  demoUrl: string | null;
  includes: string[];
  notIncluded: string[];
  images: { url: string; alt: string }[];
};

export type PricingTier = {
  name: string;
  price: string;
  timeline: string;
  featured: boolean;
  includes: string[];
};

export type TeamMember = {
  name: string;
  role: string;
  line: string;
  linkedin: string | null;
  photo: string | null;
};

export type FaqItem = { q: string; a: string };

export type ReviewItem = {
  id: number;
  authorName: string;
  authorRole: string | null;
  company: string | null;
  rating: number | null;
  body: string;
};

export type SiteSettings = {
  email: string;
  linkedin: string;
  calUrl: string;
  responseTime: string;
  workingHours: string;
  location: string;
};

export type Content = {
  services: ServiceItem[];
  work: WorkItem[];
  pricing: PricingTier[];
  team: TeamMember[];
  faq: FaqItem[];
  products: ProductSummary[];
  reviews: ReviewItem[];
  settings: SiteSettings;
  /** True when this came from the database rather than content/site.ts */
  live: boolean;
};

/* ---------------------------------------------------------- the fallback */

const fromFile = (): Content => ({
  services: site.whatWeBuild.items.map((item) => ({
    index: item.index,
    title: item.title,
    body: item.body,
    uses: [...item.uses],
  })),
  work: site.work.items.map((item) => ({
    title: item.title,
    problem: item.problem,
    result: item.result,
    stack: item.stack,
    href: item.href,
    tag: site.work.tag,
    coverImage: null,
  })),
  pricing: site.pricing.tiers.map((tier) => ({
    name: tier.name,
    price: tier.price,
    timeline: tier.timeline,
    featured: tier.featured,
    includes: [...tier.includes],
  })),
  team: site.team.members.map((member) => ({
    name: member.name,
    role: member.role,
    line: member.line,
    linkedin: member.linkedin,
    photo: member.photo,
  })),
  faq: site.faq.items.map((item) => ({ q: item.q, a: item.a })),
  /* No fallback for either. A system nobody has entered is not for sale, and
     a review nobody wrote does not exist. */
  products: [],
  reviews: [],
  settings: {
    email: site.contact.email,
    linkedin: site.contact.linkedin,
    calUrl: site.booking.calUrl,
    responseTime: site.contact.responseTime,
    workingHours: site.team.hours,
    location: site.footer.location,
  },
  live: false,
});

/* ------------------------------------------------------------- the fetch */

type ApiResponse = {
  services: {
    indexLabel: string;
    title: string;
    body: string;
    uses: string[];
  }[];
  work: {
    title: string;
    problem: string;
    result: string;
    stack: string;
    href: string;
    tag: string;
    coverImage: string | null;
  }[];
  pricing: {
    name: string;
    price: string;
    timeline: string;
    featured: boolean;
    includes: string[];
  }[];
  team: {
    name: string;
    role: string;
    line: string;
    linkedin: string | null;
    photoUrl: string | null;
  }[];
  faq: { question: string; answer: string }[];
  products: ProductSummary[];
  reviews: ReviewItem[];
  settings: Record<string, string>;
};

export async function getContent(): Promise<Content> {
  const fallback = fromFile();

  if (!API_URL) return fallback;

  try {
    const response = await fetch(`${API_URL}/api/v1/content`, {
      next: cachePolicy,
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.warn(`[content] API replied ${response.status}, using site.ts`);
      return fallback;
    }

    const data = (await response.json()) as ApiResponse;
    const settings = data.settings ?? {};

    return {
      /* An empty table means nothing is published yet, which is a real state
         and not an error — but a section with nothing in it should show the
         written copy rather than a gap. */
      services: data.services?.length
        ? data.services.map((row) => ({
            index: row.indexLabel,
            title: row.title,
            body: row.body,
            uses: row.uses ?? [],
          }))
        : fallback.services,

      work: data.work?.length
        ? data.work.map((row) => ({
            title: row.title,
            problem: row.problem,
            result: row.result,
            stack: row.stack,
            href: row.href,
            tag: row.tag,
            coverImage: row.coverImage,
          }))
        : fallback.work,

      pricing: data.pricing?.length
        ? data.pricing.map((row) => ({
            name: row.name,
            price: row.price,
            timeline: row.timeline,
            featured: row.featured,
            includes: row.includes ?? [],
          }))
        : fallback.pricing,

      team: data.team?.length
        ? data.team.map((row) => ({
            name: row.name,
            role: row.role,
            line: row.line,
            linkedin: row.linkedin,
            photo: row.photoUrl,
          }))
        : fallback.team,

      faq: data.faq?.length
        ? data.faq.map((row) => ({ q: row.question, a: row.answer }))
        : fallback.faq,

      products: data.products ?? [],

      /* No fallback. Reviews are either real and approved, or absent. */
      reviews: data.reviews ?? [],

      settings: {
        email: settings.contact_email || fallback.settings.email,
        linkedin: settings.linkedin_url || fallback.settings.linkedin,
        calUrl: settings.cal_url ?? "",
        responseTime:
          settings.response_time || fallback.settings.responseTime,
        workingHours:
          settings.working_hours || fallback.settings.workingHours,
        location: settings.location || fallback.settings.location,
      },

      live: true,
    };
  } catch (error) {
    console.warn("[content] could not reach the API, using site.ts:", error);
    return fallback;
  }
}

/**
 * One system, by slug. Used by the detail page at build time.
 *
 * Returns null rather than throwing, so a slug that no longer exists renders
 * a 404 instead of failing the whole build.
 */
export async function getProduct(slug: string): Promise<Product | null> {
  if (!API_URL) return null;

  try {
    const response = await fetch(`${API_URL}/api/v1/products/${slug}`, {
      next: cachePolicy,
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { product: Product };
    return data.product ?? null;
  } catch {
    return null;
  }
}