import type { ReactNode } from "react";
import { ProductCta } from "@/components/product/product-cta";
import { ProductFeatures } from "@/components/product/product-features";
import { ProductHero } from "@/components/product/product-hero";
import { ProductPlatform } from "@/components/product/product-platform";
import { ProductProblem } from "@/components/product/product-problem";
import type { ProductIllustrationName } from "@/components/product/illustrations";
import type { ProductIconName } from "@/components/product/icons";
import { CompareLinks } from "@/components/sections/compare-links";
import { Faq } from "@/components/sections/faq";
import { TestimonialsReveal } from "@/components/sections/testimonials-reveal";
import { PRODUCT_TESTIMONIALS_HEADING } from "@/lib/markdown/product";
import {
  CONNECTION_CONFIRM,
  FREE_POSTGRES_BROWSER_CTA,
  FREE_POSTGRES_CLOSER_BENEFITS,
  FREE_POSTGRES_CLOSER_BODY,
  FREE_POSTGRES_CLOSER_HEADLINE,
  FREE_POSTGRES_COMPARE_INTRO,
  FREE_POSTGRES_COMPARE_NOTE,
  FREE_POSTGRES_FAQ,
  FREE_POSTGRES_FEATURE_ITEMS,
  FREE_POSTGRES_FEATURES_BRIDGE,
  FREE_POSTGRES_FEATURES_HEADLINE,
  FREE_POSTGRES_H1,
  FREE_POSTGRES_HERO_BENEFITS,
  FREE_POSTGRES_MICROLINE,
  FREE_POSTGRES_PLATFORM_BODY,
  FREE_POSTGRES_PRICING_CTA,
  FREE_POSTGRES_PRIMARY_CTA,
  FREE_POSTGRES_PROBLEM_BODY,
  FREE_POSTGRES_PROBLEM_HEADLINE,
  FREE_POSTGRES_PROBLEM_OUTCOMES,
  FREE_POSTGRES_RELATED,
  FREE_POSTGRES_SUBHEADLINE,
  FREE_POSTGRES_TOUR,
  STORAGE_CONFIRM,
} from "./_content";

/** Temporary callout. Delete this once engineering answers the two open facts. */
export function EngineeringConfirm({ children }: { children: ReactNode }) {
  return (
    <p
      className="mt-4 rounded-md border border-prism-yellow-400/70 bg-prism-yellow-50 px-3 py-2 text-[0.8125rem] leading-relaxed text-foreground"
      data-engineering-confirm=""
    >
      <span className="font-semibold uppercase tracking-[0.04em] text-prism-yellow-800">
        TO CONFIRM WITH ENGINEERING
      </span>
      <span className="mt-0.5 block text-foreground/80">{children}</span>
    </p>
  );
}

// Same section order as ProductPage (/postgres). Composed here, rather than
// through ProductPage, so the limit section can be a deep link and the two
// engineering callouts have a place inside those sections.
export function FreePostgresPage() {
  return (
    <>
      <ProductHero
        name="Prisma Postgres"
        accent="postgres"
        hero={{
          headline: FREE_POSTGRES_H1,
          subheadline: FREE_POSTGRES_SUBHEADLINE,
          benefits: [
            FREE_POSTGRES_HERO_BENEFITS[0],
            FREE_POSTGRES_HERO_BENEFITS[1],
            FREE_POSTGRES_HERO_BENEFITS[2],
          ],
          primaryCta: FREE_POSTGRES_PRIMARY_CTA,
          secondaryCta: FREE_POSTGRES_BROWSER_CTA,
          microline: FREE_POSTGRES_MICROLINE,
          related: FREE_POSTGRES_RELATED,
          tour: FREE_POSTGRES_TOUR.map((stop) => ({
            ...stop,
            illustration: stop.illustration as ProductIllustrationName,
          })),
        }}
      />
      <ProductProblem
        id="limits"
        problem={{
          headline: FREE_POSTGRES_PROBLEM_HEADLINE,
          body: [...FREE_POSTGRES_PROBLEM_BODY],
          outcomes: FREE_POSTGRES_PROBLEM_OUTCOMES.map((outcome) => ({
            icon: outcome.icon as ProductIconName,
            label: outcome.label,
          })),
        }}
        afterBody={<EngineeringConfirm>{STORAGE_CONFIRM}</EngineeringConfirm>}
      />
      <ProductFeatures
        features={{
          headline: FREE_POSTGRES_FEATURES_HEADLINE,
          bridge: FREE_POSTGRES_FEATURES_BRIDGE,
          items: FREE_POSTGRES_FEATURE_ITEMS.map((item) => ({
            ...item,
            illustration: item.illustration as ProductIllustrationName,
          })),
        }}
        footer={<EngineeringConfirm>{CONNECTION_CONFIRM}</EngineeringConfirm>}
      />
      <ProductPlatform platform={{ body: FREE_POSTGRES_PLATFORM_BODY }} />
      <CompareLinks intro={FREE_POSTGRES_COMPARE_INTRO} note={FREE_POSTGRES_COMPARE_NOTE} />
      <Faq items={FREE_POSTGRES_FAQ} id="faq" />
      <TestimonialsReveal heading={PRODUCT_TESTIMONIALS_HEADING} />
      <ProductCta
        cta={{
          headline: FREE_POSTGRES_CLOSER_HEADLINE,
          body: FREE_POSTGRES_CLOSER_BODY,
          benefits: [...FREE_POSTGRES_CLOSER_BENEFITS],
          primaryCta: FREE_POSTGRES_PRIMARY_CTA,
          secondaryCta: FREE_POSTGRES_PRICING_CTA,
        }}
      />
    </>
  );
}
