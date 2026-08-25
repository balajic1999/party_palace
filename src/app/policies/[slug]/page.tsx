import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/ui/section";
import { policies, policyBySlug } from "@/content/policies";
import { site } from "@/content/site";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = policyBySlug(slug);
  if (!p) return {};
  return { title: p.title, description: p.intro };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = policyBySlug(slug);
  if (!policy) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Policies"
        title={policy.title}
        lede={policy.intro}
        crumbs={[{ href: "/", label: "Home" }]}
      />

      <Section size="tight">
        <div className="grid gap-12 md:grid-cols-12 md:gap-14">
          <nav aria-label="Policies" className="md:col-span-3">
            <div className="md:sticky md:top-[var(--sticky-top)]">
              <p className="text-[10.5px] uppercase tracking-[0.16em] text-text-soft">
                All policies
              </p>
              <ul className="mt-4 space-y-2.5">
                {policies.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/policies/${p.slug}`}
                      aria-current={p.slug === policy.slug ? "page" : undefined}
                      className={
                        p.slug === policy.slug
                          ? "text-[14px] font-semibold text-coral-700"
                          : "link-sweep text-[14px] text-text-mid transition-colors duration-200 hover:text-coral-700"
                      }
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="md:col-span-9">
            <div className="space-y-10">
              {policy.sections.map((s, i) => (
                <section key={s.heading} className="reveal">
                  <h2 className="flex items-baseline gap-4 font-display text-[24px] font-semibold leading-tight text-text">
                    <span className="tnum text-[11px] tracking-[0.16em] text-coral-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </h2>
                  <div className="mt-4 space-y-3.5 pl-0 sm:pl-11">
                    {s.body.map((para) => (
                      <p key={para} className="text-[15px] leading-relaxed text-text-mid">
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-md border border-line bg-cream p-6">
              <p className="text-[14px] leading-relaxed text-text-mid">
                Questions about this policy? Call{" "}
                <a
                  href={site.phoneHref}
                  className="text-coral-700 underline-offset-4 hover:underline"
                >
                  {site.phone}
                </a>{" "}
                or write to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-coral-700 underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
