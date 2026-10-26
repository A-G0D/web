import type { ProductIconName } from "@/components/product/icons";
import {
  PRODUCT_ILLUSTRATIONS,
  type ProductIllustrationName,
} from "@/components/product/illustrations";
import { RayFrame } from "@/components/product/illustrations/parts";
import { ProductCta } from "@/components/product/product-cta";
import { ProductDetailBlocks } from "@/components/product/product-detail-blocks";
import { ProductFeatures } from "@/components/product/product-features";
import { ProductHero } from "@/components/product/product-hero";
import { ProductNarrative } from "@/components/product/product-narrative";
import { ProductPlatform } from "@/components/product/product-platform";
import { ProductProblem } from "@/components/product/product-problem";
import { ProductTour } from "@/components/product/product-tour";
import type { ProductTourStop } from "@/components/product/types";
import { CopyCommand } from "@/components/extensions/copy-command";
import { CompareLinks } from "@/components/sections/compare-links";
import { Faq } from "@/components/sections/faq";
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

const POSTGRES_PHOTO = "bg-[url('/brand/feature-postgres.jpg')] bg-[position:50%_55%]";
const COMPUTE_PHOTO = "bg-[url('/brand/feature-compute.jpg')] bg-[position:20%_90%]";

const StartIllustration = PRODUCT_ILLUSTRATIONS.noLockIn;
const UpgradeIllustration = PRODUCT_ILLUSTRATIONS.compliance;

const HERO_TOUR: ProductTourStop[] = [
  {
    label: "Database",
    caption: "A Postgres database and connection string in seconds. No account needed.",
    illustration: "databasePanel",
  },
  {
    label: "Studio",
    caption: "Query Insights and Prisma Studio.",
    illustration: "studioTable",
  },
  {
    label: "Compute",
    caption: "Host the app next to it on Prisma Compute, on the same plan.",
    illustration: "runApps",
  },
];

const BUILD_ICONS: ProductIconName[] = ["rocket", "bot", "console", "layoutGrid"];

function spec(labels: readonly (typeof FREE_PLAN_FACTS)[number]["label"][]) {
  return labels
    .map((label) => {
      const row = FREE_PLAN_FACTS.find((item) => item.label === label);
      if (!row) return label;
      const value = /[.!?]$/.test(row.value) ? row.value : `${row.value}.`;
      return `${row.label}: ${value}`;
    })
    .join(" ");
}

const PLAN_FEATURES: {
  name: string;
  description: string;
  illustration: ProductIllustrationName;
}[] = [
  {
    name: "Operations and storage",
    illustration: "spendLimits",
    description: spec(["Operations", "Storage", "Usage reset"]),
  },
  {
    name: "Databases and connections",
    illustration: "isolatedBranches",
    description: spec(["Databases", "Connections", "Data transfer"]),
  },
  {
    name: "Engine, regions and tools",
    illustration: "noLockIn",
    description: spec(["Engine", "Extensions", "Regions", "Tools"]),
  },
  {
    name: "Payment and backups",
    illustration: "compliance",
    description: `${spec(["Payment", "Backups"])} Backups and spend limits start on Starter at $10 a month.`,
  },
];

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
    <ProductHero
      name="Prisma Postgres"
      accent="postgres"
      headlineMeasure="max-w-[min(18ch,100%)]"
      columns="md:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]"
      visualAspect={false}
      visual={<ProductTour id="free-postgres" stops={HERO_TOUR} />}
      belowBenefits={
        <div className="max-w-md">
          <p className="text-sm font-semibold text-foreground">Or run it in a terminal</p>
          <div className="mt-2">
            <CopyCommand command={CREATE_DB_COMMAND} tone="ink" />
          </div>
          <p className="mt-2.5 text-sm text-muted-foreground">
            A Postgres database and connection string in seconds. No account needed.
          </p>
        </div>
      }
      hero={{
        headline: FREE_POSTGRES_H1,
        headlineEmphasis: "2 GB and 50 databases",
        subheadline: FREE_POSTGRES_SUBHEADLINE,
        benefits: [
          "2 GB of storage and 200,000 operations a month",
          "Up to 50 databases, no credit card",
          "Host the app next to it on Prisma Compute, on the same plan",
        ],
        primaryCta: { label: "Create a free database", href: CONSOLE_SIGN_UP_URL },
        secondaryCta: { label: "Create in the browser", href: CREATE_DB_WEB_URL },
        microline: "No credit card.",
        related: {
          label: "Prisma Postgres works with any Postgres client.",
          href: "/postgres",
        },
      }}
    />
  );
}

export function FreeWhatYouGet() {
  return (
    <ProductFeatures
      features={{
        headline: "What you get on the Free plan",
        bridge: `A managed [Prisma Postgres](/postgres) workspace you can keep. The numbers below are the same ones on [pricing](/pricing): storage, operations, databases and connections, with no card and no expiry. Prisma Postgres Free plan. ${FREE_POSTGRES_UPDATED_LABEL}.`,
        items: PLAN_FEATURES,
      }}
    />
  );
}

export function FreeStartSteps() {
  return (
    <ProductNarrative
      id="start"
      headline="Start in under a minute"
      centerText
      paragraphs={[
        "You do not need an account to get a connection string. Claim the database within 24 hours if you want to keep it.",
        ...START_STEPS.map((step) => `${step.title}. ${step.body}`),
        `The [npx create-db docs](${DOCS_CREATE_DB}) cover flags, regions and claiming. Connecting later is a standard [Postgres connection string](${DOCS_CONNECT}).`,
      ]}
      illustration={
        <RayFrame photo={POSTGRES_PHOTO} className="h-full min-h-[28rem]">
          <StartIllustration />
        </RayFrame>
      }
    />
  );
}

export function FreeBuilds() {
  return (
    <ProductDetailBlocks
      headline="What developers build on it"
      bridge="The Free plan is for work that needs a real hosted Postgres: a side project, an embedding demo, a throwaway database for an agent, or a separate database per test."
      blocks={BUILD_CARDS.map((card, i) => ({
        icon: BUILD_ICONS[i] ?? "database",
        name: card.title,
        description: card.body,
      }))}
    />
  );
}

export function FreeCompute() {
  return (
    <ProductPlatform
      platform={{
        body: "Host your app for free, too. The same Free plan includes [Prisma Compute](/compute) for Node.js, Bun and Next.js apps: 1 million requests, 360 GB-hours of memory, 4 active vCPU-hours and 10 GB of outbound bandwidth a month. App and database live in one project, with one config.",
      }}
      points={[
        { title: "1 million requests", body: "Included each month on the Free plan." },
        {
          title: "360 GB-hours of memory",
          body: "Plus 4 active vCPU-hours and 10 GB of outbound bandwidth.",
        },
        {
          title: "One project",
          body: "Declare the app and the database together. An idle app scales to zero.",
        },
      ]}
    />
  );
}

export function FreeLimits() {
  return (
    <ProductProblem
      id="limits"
      afterBody={
        <EngineeringConfirm>
          What happens when a database reaches 2 GB of storage.
        </EngineeringConfirm>
      }
      problem={{
        headline: "How the free limit works",
        body: [
          `${FREE_POSTGRES_UPDATED_LABEL}. The catch is stated here so you can decide before you build on it.`,
          "What counts. One query is one operation: a simple read, a write, or a join. 200,000 operations a month is about 6,600 queries a day. Idle time is not billed.",
          "When the database is idle. Idle databases scale to zero and cost nothing. The next query wakes them. You do not wake one by hand.",
          `At the operations limit. The workspace's databases stop accepting queries until the 1st of the next month, or until you upgrade. A one-time 24 hour restore in the Console lets you export first. On paid plans this never happens: extra operations are billed, with a spend limit you set. Read the [docs FAQ on the free limit](${DOCS_FREE_LIMIT}).`,
          "Storage and backups. The Free plan includes 2 GB of storage and has no backups. Daily backups kept 7 days start on Starter.",
        ],
        outcomes: [
          { icon: "repeat", label: "What counts" },
          { icon: "server", label: "When the database is idle" },
          { icon: "shield", label: "At the operations limit" },
          { icon: "database", label: "Storage and backups" },
        ],
      }}
    />
  );
}

export function FreeUpgrade() {
  return (
    <ProductNarrative
      headline="When to upgrade"
      centerText
      paragraphs={[
        "Stay on Free while 200,000 operations and 2 GB are enough. Move up when you need backups, a spend limit, or more room. The full grid is on [pricing](/pricing); [everything Prisma Postgres includes](/postgres) is on the product page.",
        ...UPGRADE_POINTS.map((point) => {
          const hipaa = point.plan.startsWith("Business")
            ? " See [HIPAA on the Business plan](/postgres/hipaa)."
            : "";
          return `${point.plan}. ${point.body}${hipaa}`;
        }),
      ]}
      footer={
        <EngineeringConfirm>
          Whether upgrading a workspace keeps the same connection string.
        </EngineeringConfirm>
      }
      illustration={
        <RayFrame photo={COMPUTE_PHOTO} className="h-full min-h-[28rem]">
          <UpgradeIllustration />
        </RayFrame>
      }
    />
  );
}

export function FreeCompare() {
  return (
    <CompareLinks
      intro="Comparing free Postgres options? Free tiers differ in storage, how many databases you get, and what happens when you are idle or reach a limit. Prisma Postgres includes 2 GB, up to 50 databases, unlimited data transfer and free app hosting on the same plan."
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
          "2 GB, 50 databases, 200,000 operations",
          "App hosting on the same Free plan",
        ],
        primaryCta: { label: "Create a free database", href: CONSOLE_SIGN_UP_URL },
        secondaryCta: { label: "See pricing", href: "/pricing" },
      }}
    />
  );
}
