import type { Metadata } from "next";
import { ResetForm } from "@/components/portal/ResetForm";

export const metadata: Metadata = {
  title: "Reset your password — Riyad Tech",
  /* A page reached only from an emailed link, carrying a token in the URL.
     There is nothing here for a crawler and every reason to keep it out. */
  robots: { index: false, follow: false },
};

export default async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <main className="band wrap">
      <ResetForm token={token ?? ""} />
    </main>
  );
}