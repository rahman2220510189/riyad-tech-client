import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * The one thing riyad-api is allowed to ask this site to do.
 *
 * When an edit is saved in the admin panel, the API posts here and the cached
 * pages are dropped, so the next visitor gets a page built from the new copy.
 * Everyone in between kept getting a static page at full speed.
 *
 * Both the tag and the paths are cleared. The tag alone is not enough: pages
 * generated from generateStaticParams — every product detail page — hold their
 * own cache entry that a tag does not reach.
 *
 * A shared secret guards it. Without one, anyone who found the URL could force
 * a rebuild on every request and turn a static site into a slow dynamic one.
 */

const DEFAULT_PATHS = [
  "/",
  "/services",
  "/products",
  "/work",
  "/pricing",
  "/about",
  "/contact",
];

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "Revalidation is not configured" },
      { status: 503 },
    );
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const paths: string[] = Array.isArray(body?.paths) ? body.paths : DEFAULT_PATHS;

  revalidateTag("content");

  for (const path of paths) {
    revalidatePath(path);
  }

  /* Product detail pages are generated per slug, so the layout-level sweep
     catches any that exist without needing to know which changed. */
  revalidatePath("/products/[slug]", "page");

  return NextResponse.json({ ok: true, revalidated: paths });
}