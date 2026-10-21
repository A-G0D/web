import Link from "next/link";
import { AppWindow, Database, GitBranch, Sparkles } from "lucide-react";
import { CheckBold } from "@/components/icons/forma";
import { GlassGlide } from "@/components/brand/glass-glide";
import { IconTile } from "@/components/brand/icon-tile";
import { PrismButton, PrismButtonOutline } from "@/components/brand/prism-button";
import { PrismRay } from "@/components/brand/prism-ray";
import { RoleKicker } from "@/components/brand/role-kicker";
import { Texture } from "@/components/brand/texture";
import { CopyCommand } from "@/components/extensions/copy-command";
import { CtaBurst } from "@/components/sections/cta-burst";
import { Faq } from "@/components/sections/faq";
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
  FREE_POSTGRES_SUBHEADLINE,
  FREE_POSTGRES_UPDATED_LABEL,
  START_STEPS,
  UPGRADE_POINTS,
} from "./_content";

const INLINE_LINK =
  "font-medium text-foreground underline underline-offset-4 decoration-black/20 transition-colors hover:decoration-black/60";

/** Temporary callout. Delete this once engineering answers the two open facts. */
export function EngineeringConfirm({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-3 rounded-md border border-prism-yellow-400/70 bg-prism-yellow-50 px-3 py-2 text-[0.8125rem] leading-relaxed text-foreground"
      data-engineering-confirm=""
    >
      <span className="font-semibold uppercase tracking-[0.04em] text-prism-yellow-800">
        TO CONFIRM WITH ENGINEERING
      </span>
      <span className="mt-0.5 block text-foreground/80">{children}</span>
    </p>
  );
}

export function FreePostgresHero() {
  return (
    <section className="bg-white px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] overflow-hidden"
        >
          <div
            className="absolute -bottom-1/3 left-1/2 h-[120%] w-[160%] -translate-x-1/2"
            style={{
              background: [
                "radial-gradient(52% 40% at 30% 100%, color-mix(in srgb, var(--color-prism-cyan-400) 34%, transparent), transparent 68%)",
                "radial-gradient(44% 36% at 52% 100%, color-mix(in srgb, var(--color-prism-yellow-300) 26%, transparent), transparent 66%)",
                "radial-gradient(42% 30% at 74% 100%, color-mix(in srgb, var(--color-prism-red-400) 28%, transparent), transparent 68%)",
              ].join(","),
            }}
          />
          <div className="absolute bottom-[-24rem] left-[10%] h-[60rem] w-36 origin-bottom rotate-[-28deg] bg-prism-cyan-300/50 blur-[64px]" />
          <div className="absolute bottom-[-26rem] left-1/2 h-[62rem] w-44 origin-bottom -translate-x-1/2 rotate-[5deg] bg-prism-yellow-200/60 blur-[72px]" />
          <div className="absolute bottom-[-28rem] right-[8%] h-[60rem] w-36 origin-bottom rotate-[28deg] bg-prism-red-300/50 blur-[64px]" />
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-t from-transparent via-white/60 to-white" />
        </div>
        <Texture opacity={0.06} blend="multiply" />

        <div className="relative px-4 sm:px-8">
          <div className="mx-auto grid max-w-site items-center gap-12 pb-20 pt-36 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:pb-28 md:pt-48 lg:gap-16">
            <div className="flex flex-col items-start">
              <RoleKicker color="bg-prism-yellow-400">Prisma Postgres</RoleKicker>
              <h1 className="isolate mt-4 max-w-[min(18ch,100%)] text-balance text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.06]">
                Free Postgres hosting, with <GlassGlide>2 GB and 50 databases</GlassGlide> included
              </h1>
              <p className="mt-6 max-w-[46ch] text-pretty text-lg leading-relaxed text-muted-foreground">
                {FREE_POSTGRES_SUBHEADLINE}
              </p>
              <div className="mt-8 w-full max-w-md">
                <CopyCommand command={CREATE_DB_COMMAND} tone="ink" />
                <p className="mt-2.5 text-sm text-muted-foreground">
                  A Postgres database and connection string in seconds. No account needed.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <PrismButton href={CONSOLE_SIGN_UP_URL} size="lg">
                  Create a free database
                </PrismButton>
                <PrismButtonOutline href={CREATE_DB_WEB_URL} size="lg">
                  Create in the browser
                </PrismButtonOutline>
              </div>
              <p className="mt-3.5 text-sm text-muted-foreground">
                No credit card.{" "}
                <Link href="/postgres" className={INLINE_LINK}>
                  Prisma Postgres
                </Link>{" "}
                works with any Postgres client.
              </p>
              <ul className="mt-8 flex flex-col gap-2.5 border-t border-black/[0.07] pt-7">
                {[
                  {
                    label: "2 GB of storage and 200,000 operations a month",
                    color: "text-prism-cyan-500",
                  },
                  {
                    label: "Up to 50 databases, no credit card",
                    color: "text-prism-yellow-400",
                  },
                  {
                    label: "Host the app next to it on Prisma Compute, on the same plan",
                    color: "text-prism-red-500",
                  },
                ].map(({ label, color }) => (
                  <li
                    key={label}
                    className="flex items-start gap-2 text-[0.9375rem] font-semibold text-foreground"
                  >
                    <CheckBold className={cn("mt-0.5 size-4 shrink-0", color)} aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative max-md:mt-4 md:self-stretch">
              <PrismRay
                className="left-[75%] top-1/2 h-12 w-[32rem] -translate-x-1/2 -translate-y-1/2 md:h-24 md:w-[64rem]"
                angle={-50}
                intensity="hero"
              />
              <div className="relative md:h-full">
                <FreePlanCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FreePlanCard() {
  const rows = [
    { label: "Plan", value: "Free" },
    { label: "Storage", value: "2 GB" },
    { label: "Operations", value: "200,000 / month" },
    { label: "Databases", value: "50 per workspace" },
    { label: "Engine", value: "PostgreSQL 17", mono: true },
  ];

  return (
    <div
      role="img"
      aria-label="Illustration of a Prisma Postgres Free workspace with 2 GB of storage, 200,000 operations a month and 50 databases"
      className="pointer-events-none relative flex h-full w-full select-none flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_1px_2px_rgba(21,21,21,0.04),0_8px_16px_-4px_rgba(21,21,21,0.06),0_32px_64px_-16px_rgba(21,21,21,0.14)]"
    >
      <div className="flex items-center gap-2 border-b border-border/70 px-5 py-3.5">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-1.5 font-mono text-xs text-foreground">
          weekend-app / postgres / free
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-black/[0.06] bg-prism-yellow-50">
            <Database className="size-5 text-prism-yellow-800" aria-hidden />
          </span>
          <div>
            <p className="text-[0.9375rem] font-semibold text-foreground">Prisma Postgres</p>
            <p className="text-[0.8125rem] text-muted-foreground">Free workspace, no card</p>
          </div>
          <span className="ml-auto rounded-full border border-prism-yellow-300 bg-prism-yellow-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-prism-yellow-800">
            $0
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {rows.map(({ label, value, mono }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-border/80 bg-card px-3 py-2.5"
            >
              <span className="size-2 shrink-0 rounded-full bg-prism-yellow-400" />
              <span className="text-[0.8125rem] text-muted-foreground">{label}</span>
              <span
                className={cn(
                  "ml-auto text-right text-[0.8125rem] font-semibold text-foreground",
                  mono && "font-mono",
                )}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="border-t border-border/70 bg-muted/40 px-5 py-3 text-[0.8125rem] text-muted-foreground">
        Connection pooling and SSL are on. Backups start on Starter.
      </p>
    </div>
  );
}

export function FreeWhatYouGet() {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32" aria-labelledby="what-you-get">
      <div className="mx-auto max-w-site">
        <div className="mx-auto max-w-3xl text-center max-md:text-left">
          <h2
            id="what-you-get"
            className="text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]"
          >
            What you get on the Free plan
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            A managed{" "}
            <Link href="/postgres" className={INLINE_LINK}>
              Prisma Postgres
            </Link>{" "}
            workspace you can keep. The numbers below are the same ones on{" "}
            <Link href="/pricing" className={INLINE_LINK}>
              pricing
            </Link>
            : storage, operations, databases and connections, with no card and no expiry.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(21,21,21,0.04),0_24px_64px_-32px_rgba(21,21,21,0.2)]">
          <div className="flex items-center gap-4 border-b border-black/[0.06] px-5 py-4 sm:px-7">
            <p className="text-[0.8125rem] font-semibold text-foreground">
              Prisma Postgres Free plan{" "}
              <span className="font-normal text-muted-foreground">
                {FREE_POSTGRES_UPDATED_LABEL}
              </span>
            </p>
          </div>
          <table className="w-full border-collapse">
            <tbody>
              {FREE_PLAN_FACTS.map(({ label, value }) => (
                <tr key={label} className="border-b border-black/[0.06] last:border-b-0">
                  <th
                    scope="row"
                    className="w-[38%] px-5 py-3.5 text-left text-[0.9375rem] font-semibold text-foreground sm:px-7"
                  >
                    {label}
                  </th>
                  <td className="px-5 py-3.5 text-[0.9375rem] text-muted-foreground sm:px-7">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-5 max-w-5xl text-[0.9375rem] leading-relaxed text-muted-foreground">
          Backups and spend limits start on Starter at $10 a month.
        </p>
      </div>
    </section>
  );
}

export function FreeStartSteps() {
  return (
    <section id="start" className="bg-white px-3 py-3 sm:px-4">
      <div
        className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06]"
        style={{ background: "#F8F8F7" }}
      >
        <div className="relative mx-auto max-w-site px-4 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-3xl text-center max-md:text-left">
            <h2 className="text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
              Start in under a minute
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              You do not need an account to get a connection string. Claim the database within 24
              hours if you want to keep it.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {START_STEPS.map((step, i) => (
              <div key={step.title} className="h-full">
                <div className="flex h-full flex-col items-start gap-4 rounded-xl border border-black/[0.06] bg-white p-6">
                  <span className="flex size-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-lg leading-snug">{step.title}</h3>
                  <p className="text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {step.body.includes("`") ? <StepBody text={step.body} /> : step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-[0.9375rem] leading-relaxed text-muted-foreground max-md:text-left">
            The{" "}
            <Link href={DOCS_CREATE_DB} className={INLINE_LINK}>
              npx create-db docs
            </Link>{" "}
            cover flags, regions and claiming. Connecting later is a standard{" "}
            <Link href={DOCS_CONNECT} className={INLINE_LINK}>
              Postgres connection string
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function StepBody({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={i}
            className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function FreeBuilds() {
  const icons = [
    <GitBranch className="size-5 text-foreground" strokeWidth={1.6} aria-hidden key="git" />,
    <Sparkles className="size-5 text-foreground" strokeWidth={1.6} aria-hidden key="ai" />,
    <Database className="size-5 text-foreground" strokeWidth={1.6} aria-hidden key="db" />,
    <AppWindow className="size-5 text-foreground" strokeWidth={1.6} aria-hidden key="app" />,
  ];

  return (
    <section
      className="bg-white px-4 py-24 sm:px-8 sm:py-32"
      aria-labelledby="what-developers-build"
    >
      <div className="mx-auto max-w-site">
        <div className="mx-auto max-w-3xl text-center max-md:text-left">
          <h2
            id="what-developers-build"
            className="text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]"
          >
            What developers build on it
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            The Free plan is for work that needs a real hosted Postgres: a side project, an
            embedding demo, a throwaway database for an agent, or a separate database per test.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BUILD_CARDS.map((card, i) => (
            <div
              key={card.title}
              className="flex h-full flex-col items-start gap-4 rounded-xl border border-black/[0.06] bg-white p-6 sm:p-7"
            >
              <IconTile>{icons[i]}</IconTile>
              <h3 className="text-xl leading-snug">{card.title}</h3>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                <StepBody text={card.body} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FreeLimits() {
  return (
    <section
      id="limits"
      className="scroll-mt-28 bg-white px-4 pb-24 sm:px-8 sm:pb-32"
      aria-labelledby="how-the-free-limit-works"
    >
      <div className="mx-auto max-w-site">
        <div className="mx-auto max-w-3xl text-center max-md:text-left">
          <h2
            id="how-the-free-limit-works"
            className="text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]"
          >
            How the free limit works
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            {FREE_POSTGRES_UPDATED_LABEL}. The catch is stated here so you can decide before you
            build on it.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-7">
            <p className="text-sm font-semibold text-foreground/70">What counts</p>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              One query is one operation: a simple read, a write, or a join. 200,000 operations a
              month is about 6,600 queries a day. Idle time is not billed.
            </p>
          </div>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-7">
            <p className="text-sm font-semibold text-foreground/70">When the database is idle</p>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              Idle databases scale to zero and cost nothing. The next query wakes them. You do not
              wake one by hand.
            </p>
          </div>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-7">
            <p className="text-sm font-semibold text-foreground/70">At the operations limit</p>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              The workspace&apos;s databases stop accepting queries until the 1st of the next month,
              or until you upgrade. A one-time 24 hour restore in the Console lets you export first.
              On paid plans this never happens: extra operations are billed, with a spend limit you
              set. Read the{" "}
              <Link href={DOCS_FREE_LIMIT} className={INLINE_LINK}>
                docs FAQ on the free limit
              </Link>
              .
            </p>
          </div>
          <div className="rounded-2xl border border-black/[0.06] bg-white p-7">
            <p className="text-sm font-semibold text-foreground/70">Storage and backups</p>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              The Free plan includes 2 GB of storage and has no backups. Daily backups kept 7 days
              start on Starter.
            </p>
            <EngineeringConfirm>
              What happens when a database reaches 2 GB of storage.
            </EngineeringConfirm>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FreeCompute() {
  return (
    <section className="bg-white px-3 py-3 sm:px-4">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] overflow-hidden"
        >
          <div
            className="absolute -bottom-1/3 left-1/2 h-[120%] w-[160%] -translate-x-1/2"
            style={{
              background: [
                "radial-gradient(52% 40% at 30% 100%, color-mix(in srgb, var(--color-prism-cyan-400) 34%, transparent), transparent 68%)",
                "radial-gradient(44% 36% at 52% 100%, color-mix(in srgb, var(--color-prism-yellow-300) 26%, transparent), transparent 66%)",
                "radial-gradient(42% 30% at 74% 100%, color-mix(in srgb, var(--color-prism-red-400) 28%, transparent), transparent 68%)",
              ].join(","),
            }}
          />
          <div className="absolute bottom-[-24rem] left-[10%] h-[60rem] w-36 origin-bottom rotate-[-28deg] bg-prism-cyan-300/50 blur-[64px]" />
          <div className="absolute bottom-[-26rem] left-1/2 h-[62rem] w-44 origin-bottom -translate-x-1/2 rotate-[5deg] bg-prism-yellow-200/60 blur-[72px]" />
          <div className="absolute bottom-[-28rem] right-[8%] h-[60rem] w-36 origin-bottom rotate-[28deg] bg-prism-red-300/50 blur-[64px]" />
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-t from-transparent via-white/60 to-white" />
        </div>
        <Texture opacity={0.06} blend="multiply" />

        <div className="relative mx-auto max-w-site px-4 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-3xl text-center max-md:text-left">
            <h2 className="text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
              Host your app for free, too
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              The same Free plan includes{" "}
              <Link href="/compute" className={INLINE_LINK}>
                Prisma Compute
              </Link>{" "}
              for Node.js, Bun and Next.js apps: 1 million requests, 360 GB-hours of memory, 4
              active vCPU-hours and 10 GB of outbound bandwidth a month. App and database live in
              one project, with one config.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              { title: "1 million requests", body: "Included each month on the Free plan." },
              {
                title: "360 GB-hours of memory",
                body: "Plus 4 active vCPU-hours and 10 GB of outbound bandwidth.",
              },
              {
                title: "One project",
                body: "Declare the app and the database together. An idle app scales to zero.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col gap-3 rounded-xl border border-black/[0.06] bg-white p-6 sm:p-7"
              >
                <h3 className="text-xl leading-snug">{item.title}</h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FreeUpgrade() {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32" aria-labelledby="when-to-upgrade">
      <div className="mx-auto max-w-site">
        <div className="mx-auto max-w-3xl text-center max-md:text-left">
          <h2
            id="when-to-upgrade"
            className="text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]"
          >
            When to upgrade
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            Stay on Free while 200,000 operations and 2 GB are enough. Move up when you need
            backups, a spend limit, or more room. The full grid is on{" "}
            <Link href="/pricing" className={INLINE_LINK}>
              pricing
            </Link>
            ;{" "}
            <Link href="/postgres" className={INLINE_LINK}>
              everything Prisma Postgres includes
            </Link>{" "}
            is on the product page.
          </p>
        </div>
        <ul className="mx-auto mt-14 flex max-w-3xl flex-col gap-5">
          {UPGRADE_POINTS.map((point) => (
            <li key={point.plan} className="flex items-start gap-3">
              <CheckBold className="mt-1 size-4 shrink-0 text-prism-cyan-500" aria-hidden />
              <p className="text-pretty leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">{point.plan}.</span> {point.body}{" "}
                {point.plan.startsWith("Business") ? (
                  <>
                    See{" "}
                    <Link href="/postgres/hipaa" className={INLINE_LINK}>
                      HIPAA on the Business plan
                    </Link>
                    .
                  </>
                ) : null}
              </p>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-8 max-w-3xl">
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
    <section className="bg-white px-4 pb-8 sm:px-8" aria-labelledby="comparing-free-options">
      <div className="mx-auto max-w-5xl rounded-2xl border border-black/[0.06] bg-white p-7 sm:p-9">
        <h2
          id="comparing-free-options"
          className="text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]"
        >
          Comparing free Postgres options?
        </h2>
        <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          Free tiers differ in storage, how many databases you get, and what happens when you are
          idle or reach a limit. Prisma Postgres includes 2 GB, up to 50 databases, unlimited data
          transfer and free app hosting on the same plan.
        </p>
        <p className="mt-4 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
          For a longer look at serverless Postgres providers, read the{" "}
          <Link href={COMPARE_SERVERLESS} className={INLINE_LINK}>
            comparison of free Postgres hosting
          </Link>{" "}
          and the{" "}
          <Link href={COMPARE_NEON_PRICING} className={INLINE_LINK}>
            Prisma Postgres vs Neon pricing
          </Link>{" "}
          post. Extensions and regions are in the{" "}
          <Link href={DOCS_EXTENSIONS} className={INLINE_LINK}>
            extensions
          </Link>{" "}
          and{" "}
          <Link href={DOCS_REGIONS} className={INLINE_LINK}>
            regions
          </Link>{" "}
          docs. Connection pooling is{" "}
          <Link href={DOCS_POOLING} className={INLINE_LINK}>
            built in
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export function FreeFaq() {
  return <Faq heading="Frequently asked questions" items={FREE_POSTGRES_FAQ} id="faq" />;
}

export function FreeCloser() {
  return (
    <>
      <section className="bg-white px-4 pb-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-3 rounded-2xl border border-black/[0.06] bg-white p-6 sm:flex-row sm:items-center sm:p-7">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">Or run it in a terminal</p>
            <p className="mt-1 text-[0.8125rem] text-muted-foreground">
              A Postgres database and connection string in seconds. No account needed.
            </p>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[18rem]">
            <CopyCommand command={CREATE_DB_COMMAND} tone="ink" />
          </div>
        </div>
      </section>
      <CtaBurst
        headline="Create your free database"
        headlineMaxWidth="max-w-[22ch]"
        body="A managed PostgreSQL 17 database in seconds. Paste the connection string into any Postgres client, then claim it into a Free workspace when you want to keep it."
        bodyMaxWidth="max-w-[68ch]"
        checks={[
          { label: "npx create-db, no account needed", color: "text-prism-cyan-500" },
          { label: "2 GB, 50 databases, 200,000 operations", color: "text-prism-yellow-400" },
          { label: "App hosting on the same Free plan", color: "text-prism-red-500" },
        ]}
        primaryCta={{ label: "Create a free database", href: CONSOLE_SIGN_UP_URL }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
