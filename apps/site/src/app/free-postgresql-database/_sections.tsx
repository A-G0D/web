import type { ReactNode } from "react";
import { DatabasePanel } from "@/components/product/illustrations/database-panel";
import { ProductCta } from "@/components/product/product-cta";
import { CopyCommand } from "@/components/extensions/copy-command";
import { PrismButton, PrismButtonOutline } from "@/components/brand/prism-button";
import { CompareLinks } from "@/components/sections/compare-links";
import { Faq } from "@/components/sections/faq";
import { renderFaqAnswer } from "@/lib/faq-answer";
import { cn } from "@/lib/utils";
import {
  BUILD_CARDS,
  COMPARE_NEON_PRICING,
  COMPARE_SERVERLESS,
  CONSOLE_SIGN_UP_URL,
  CREATE_DB_COMMAND,
  CREATE_DB_WEB_URL,
  DOCS_CONNECT,
  DOCS_CREATE_DB,
  DOCS_EXTENSIONS,
  DOCS_FREE_LIMIT,
  DOCS_POOLING,
  DOCS_REGIONS,
  FREE_PLAN_FACTS,
  FREE_POSTGRES_FAQ,
  FREE_POSTGRES_H1,
  FREE_POSTGRES_SUBHEADLINE,
  FREE_POSTGRES_UPDATED_LABEL,
  START_STEPS,
  UPGRADE_POINTS,
} from "./_content";

const SECTION = "bg-white px-4 py-16 sm:px-8 sm:py-24";
const MEASURE = "max-w-[68ch]";

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

function FactRows({ rows }: { rows: readonly { label: string; value: ReactNode }[] }) {
  return (
    <dl className="mt-8 max-w-3xl border-t border-black/[0.08]">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-1 border-b border-black/[0.08] py-3.5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:items-baseline sm:gap-8"
        >
          <dt className="text-sm font-semibold text-foreground">{row.label}</dt>
          <dd className="text-sm leading-relaxed text-muted-foreground tabular-nums">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function HeroVisual() {
  return (
    <div className="h-64 overflow-hidden rounded-2xl border border-black/[0.06] bg-card md:h-80">
      {/* The database panel is drawn for a tall tour slot. Scale it so the
          whole surface, including the database, sits beside the headline. */}
      <div className="pointer-events-none h-[22rem] w-[137.5%] origin-top-left scale-[0.727] md:h-[32rem] md:w-[160%] md:scale-[0.625]">
        <DatabasePanel />
      </div>
    </div>
  );
}

export function FreePostgresHero() {
  return (
    <section className="bg-white px-4 pb-12 pt-20 sm:px-8 md:pb-16 md:pt-24">
      <div className="mx-auto grid max-w-site items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className="flex flex-col items-start">
          <h1 className="max-w-[14ch] text-balance text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05]">
            {FREE_POSTGRES_H1}
          </h1>
          <p className="mt-4 max-w-[36ch] text-pretty text-lg leading-relaxed text-muted-foreground">
            {FREE_POSTGRES_SUBHEADLINE}
          </p>
          <div className="mt-6">
            <PrismButton href={CONSOLE_SIGN_UP_URL} size="lg">
              Create a free database
            </PrismButton>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

export function FreeWhatYouGet() {
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-site">
        <h2 className="max-w-[20ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
          What a free PostgreSQL database includes
        </h2>
        <p
          className={cn("mt-4 text-pretty text-lg leading-relaxed text-muted-foreground", MEASURE)}
        >
          {renderFaqAnswer(
            `A managed [Prisma Postgres](/postgres) workspace you can keep. The rows below are the same ones on [pricing](/pricing): storage, operations, databases and connections, with no card and no expiry. Prisma Postgres Free plan. ${FREE_POSTGRES_UPDATED_LABEL}.`,
          )}
        </p>
        <FactRows rows={FREE_PLAN_FACTS.map((row) => ({ label: row.label, value: row.value }))} />
      </div>
    </section>
  );
}

export function FreeStartSteps() {
  return (
    <section id="start" className={cn(SECTION, "scroll-mt-28")}>
      <div className="mx-auto max-w-site">
        <h2 className="max-w-[16ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
          Start in under a minute
        </h2>
        <p className={cn("mt-4 text-pretty leading-relaxed text-muted-foreground", MEASURE)}>
          You do not need an account to get a connection string. Claim the database within 24 hours
          if you want to keep it.
        </p>
        <ol className="mt-8 max-w-3xl border-t border-black/[0.08]">
          {START_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-2 border-b border-black/[0.08] py-5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8"
            >
              <h3 className="text-sm font-semibold text-foreground">
                <span className="mr-2 tabular-nums text-muted-foreground">{index + 1}</span>
                {step.title}
              </h3>
              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {renderFaqAnswer(step.body)}
                </p>
                {index === 0 ? (
                  <div className="mt-4 flex flex-col items-start gap-3">
                    <p className="text-sm font-semibold text-foreground">Or run it in a terminal</p>
                    <CopyCommand command={CREATE_DB_COMMAND} tone="ink" />
                    <PrismButtonOutline href={CREATE_DB_WEB_URL}>
                      Create in the browser
                    </PrismButtonOutline>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
        <p
          className={cn("mt-6 text-pretty text-sm leading-relaxed text-muted-foreground", MEASURE)}
        >
          {renderFaqAnswer(
            `The [npx create-db docs](${DOCS_CREATE_DB}) cover flags, regions and claiming. Connecting later is a standard [Postgres connection string](${DOCS_CONNECT}).`,
          )}
        </p>
        <p className="mt-3 text-sm">
          <a
            href="/postgres"
            className="font-medium text-foreground underline underline-offset-4 decoration-black/20 transition-colors hover:decoration-black/60"
          >
            Prisma Postgres works with any Postgres client.
          </a>
        </p>
      </div>
    </section>
  );
}

export function FreeBuilds() {
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-site">
        <h2 className="max-w-[18ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
          What developers build on it
        </h2>
        <p className={cn("mt-4 text-pretty leading-relaxed text-muted-foreground", MEASURE)}>
          The Free plan is for work that needs a real hosted Postgres: a side project, an embedding
          demo, a throwaway database for an agent, or a separate database per test.
        </p>
        <ul className="mt-8 grid max-w-5xl gap-x-12 gap-y-8 sm:grid-cols-2">
          {BUILD_CARDS.map((card) => (
            <li key={card.title}>
              <h3 className="text-[0.9375rem] font-semibold leading-snug text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 max-w-[48ch] text-pretty text-sm leading-relaxed text-muted-foreground">
                {renderFaqAnswer(card.body)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FreeCompute() {
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-site">
        <h2 className="max-w-[22ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
          Built to work with the rest of Prisma
        </h2>
        <div className={cn("mt-4 flex flex-col gap-4", MEASURE)}>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            {renderFaqAnswer(
              "Host your app for free, too. The same Free plan includes [Prisma Compute](/compute) for Node.js, Bun and Next.js apps: 1 million requests, 360 GB-hours of memory, 4 active vCPU-hours and 10 GB of outbound bandwidth a month. App and database live in one project, with one config.",
            )}
          </p>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            Declare the app and the database together. An idle app scales to zero.
          </p>
          <p className="font-semibold text-foreground">Best together. Swappable when needed.</p>
        </div>
      </div>
    </section>
  );
}

const LIMIT_PARAGRAPHS = [
  `${FREE_POSTGRES_UPDATED_LABEL}. The catch is stated here so you can decide before you build on it.`,
  "What counts. One query is one operation: a simple read, a write, or a join. 200,000 operations a month is about 6,600 queries a day. Idle time is not billed.",
  "When the database is idle. Idle databases scale to zero and cost nothing. The next query wakes them. You do not wake one by hand.",
  `At the operations limit. The workspace's databases stop accepting queries until the 1st of the next month, or until you upgrade. A one-time 24 hour restore in the Console lets you export first. On paid plans this never happens: extra operations are billed, with a spend limit you set. Read the [docs FAQ on the free limit](${DOCS_FREE_LIMIT}).`,
  "Storage and backups. The Free plan includes 2 GB of storage and has no backups. Daily backups kept 7 days start on Starter.",
];

export function FreeLimits() {
  return (
    <section id="limits" className={cn(SECTION, "scroll-mt-28")}>
      <div className="mx-auto max-w-site">
        <h2 className="max-w-[16ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
          How the free limit works
        </h2>
        <div className={cn("mt-4 flex flex-col gap-4", MEASURE)}>
          {LIMIT_PARAGRAPHS.map((copy) => (
            <p
              key={copy.slice(0, 24)}
              className="text-pretty leading-relaxed text-muted-foreground"
            >
              {renderFaqAnswer(copy)}
            </p>
          ))}
          <EngineeringConfirm>
            What happens when a database reaches 2 GB of storage.
          </EngineeringConfirm>
        </div>
      </div>
    </section>
  );
}

export function FreeUpgrade() {
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-site">
        <h2 className="max-w-[14ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
          When to upgrade
        </h2>
        <p className={cn("mt-4 text-pretty leading-relaxed text-muted-foreground", MEASURE)}>
          {renderFaqAnswer(
            "Stay on Free while 200,000 operations and 2 GB are enough. Move up when you need backups, a spend limit, or more room. The full grid is on [pricing](/pricing); [everything Prisma Postgres includes](/postgres) is on the product page.",
          )}
        </p>
        <FactRows
          rows={UPGRADE_POINTS.map((point) => {
            const hipaa = point.plan.startsWith("Business")
              ? " See [HIPAA on the Business plan](/postgres/hipaa)."
              : "";
            return {
              label: point.plan,
              value: renderFaqAnswer(`${point.body}${hipaa}`),
            };
          })}
        />
        <div className={MEASURE}>
          <EngineeringConfirm>
            Whether upgrading a workspace keeps the same connection string.
          </EngineeringConfirm>
        </div>
      </div>
    </section>
  );
}

export function FreeCompare() {
  return (
    <CompareLinks
      intro="Comparing free Postgres options? Free tiers differ in storage, how many databases you get, and what happens when you are idle or reach a limit."
      note={`For a longer look at serverless Postgres providers, read the [comparison of free Postgres hosting](${COMPARE_SERVERLESS}) and the [Prisma Postgres vs Neon pricing](${COMPARE_NEON_PRICING}) post. Extensions and regions are in the [extensions](${DOCS_EXTENSIONS}) and [regions](${DOCS_REGIONS}) docs. Connection pooling is [built in](${DOCS_POOLING}).`}
    />
  );
}

export function FreeFaq() {
  return <Faq heading="Frequently asked questions" items={FREE_POSTGRES_FAQ} id="faq" />;
}

export function FreeCloser() {
  return (
    <ProductCta
      cta={{
        headline: "Create your free database",
        body: "A managed PostgreSQL 17 database in seconds. Paste the connection string into any Postgres client, then claim it into a Free workspace when you want to keep it.",
        benefits: [
          "npx create-db, no account needed",
          "Works with any Postgres client",
          "Claim it within 24 hours",
        ],
        primaryCta: { label: "Create a free database", href: CONSOLE_SIGN_UP_URL },
        secondaryCta: { label: "See pricing", href: "/pricing" },
      }}
    />
  );
}
