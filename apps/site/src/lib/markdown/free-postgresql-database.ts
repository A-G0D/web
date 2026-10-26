import { COMPARE_PRISMA_LINKS } from "@/components/sections/compare-links-data";
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
} from "@/app/free-postgresql-database/_content";
import { bulletList, ctaList, heading, joinBlocks, numberedList, paragraphs } from "./blocks";

export const FREE_POSTGRES_MARKDOWN_H1 = FREE_POSTGRES_H1;
export const FREE_POSTGRES_MARKDOWN_SUBHEADLINE = FREE_POSTGRES_SUBHEADLINE;

/** Markdown rendition of /free-postgresql-database. Mirrors the visible section order. */
export function renderFreePostgresqlDatabaseMarkdown(): string {
  return joinBlocks([
    ctaList([{ label: "Create a free database", href: CONSOLE_SIGN_UP_URL }]),

    heading(2, "What a free PostgreSQL database includes"),
    paragraphs(
      `A managed [Prisma Postgres](/postgres) workspace you can keep. The rows below are the same ones on [pricing](/pricing): storage, operations, databases and connections, with no card and no expiry. Prisma Postgres Free plan. ${FREE_POSTGRES_UPDATED_LABEL}.`,
    ),
    bulletList(FREE_PLAN_FACTS.map((row) => `**${row.label}:** ${row.value}`)),

    heading(2, "Start in under a minute"),
    paragraphs(
      "You do not need an account to get a connection string. Claim the database within 24 hours if you want to keep it.",
    ),
    paragraphs("Or run it in a terminal."),
    paragraphs(`A copyable command: \`${CREATE_DB_COMMAND}\`.`),
    ctaList([{ label: "Create in the browser", href: CREATE_DB_WEB_URL }]),
    numberedList(START_STEPS.map((step) => `**${step.title}.** ${step.body}`)),
    paragraphs(
      `The [npx create-db docs](${DOCS_CREATE_DB}) cover flags, regions and claiming. Connecting later is a standard [Postgres connection string](${DOCS_CONNECT}).`,
    ),
    paragraphs("[Prisma Postgres works with any Postgres client.](/postgres)"),

    heading(2, "What developers build on it"),
    paragraphs(
      "The Free plan is for work that needs a real hosted Postgres: a side project, an embedding demo, a throwaway database for an agent, or a separate database per test.",
    ),
    bulletList(BUILD_CARDS.map((card) => `**${card.title}:** ${card.body}`)),

    heading(2, "Built to work with the rest of Prisma"),
    paragraphs(
      "Host your app for free, too. The same Free plan includes [Prisma Compute](/compute) for Node.js, Bun and Next.js apps: 1 million requests, 360 GB-hours of memory, 4 active vCPU-hours and 10 GB of outbound bandwidth a month. App and database live in one project, with one config.",
    ),
    paragraphs("Declare the app and the database together. An idle app scales to zero."),
    paragraphs("**Best together. Swappable when needed.**"),

    heading(2, "How the free limit works"),
    paragraphs(
      `${FREE_POSTGRES_UPDATED_LABEL}. The catch is stated here so you can decide before you build on it.`,
    ),
    paragraphs([
      "What counts. One query is one operation: a simple read, a write, or a join. 200,000 operations a month is about 6,600 queries a day. Idle time is not billed.",
      "When the database is idle. Idle databases scale to zero and cost nothing. The next query wakes them. You do not wake one by hand.",
      `At the operations limit. The workspace's databases stop accepting queries until the 1st of the next month, or until you upgrade. A one-time 24 hour restore in the Console lets you export first. On paid plans this never happens: extra operations are billed, with a spend limit you set. Read the [docs FAQ on the free limit](${DOCS_FREE_LIMIT}).`,
      "Storage and backups. The Free plan includes 2 GB of storage and has no backups. Daily backups kept 7 days start on Starter.",
    ]),
    paragraphs(
      "TO CONFIRM WITH ENGINEERING: What happens when a database reaches 2 GB of storage.",
    ),

    heading(2, "When to upgrade"),
    paragraphs(
      "Stay on Free while 200,000 operations and 2 GB are enough. Move up when you need backups, a spend limit, or more room. The full grid is on [pricing](/pricing); [everything Prisma Postgres includes](/postgres) is on the product page.",
    ),
    bulletList(
      UPGRADE_POINTS.map((point) => {
        const hipaa = point.plan.startsWith("Business")
          ? " See [HIPAA on the Business plan](/postgres/hipaa)."
          : "";
        return `**${point.plan}:** ${point.body}${hipaa}`;
      }),
    ),
    paragraphs(
      "TO CONFIRM WITH ENGINEERING: Whether upgrading a workspace keeps the same connection string.",
    ),

    heading(2, "Compare Prisma"),
    paragraphs(
      "Comparing free Postgres options? Free tiers differ in storage, how many databases you get, and what happens when you are idle or reach a limit.",
    ),
    paragraphs(
      `For a longer look at serverless Postgres providers, read the [comparison of free Postgres hosting](${COMPARE_SERVERLESS}) and the [Prisma Postgres vs Neon pricing](${COMPARE_NEON_PRICING}) post. Extensions and regions are in the [extensions](${DOCS_EXTENSIONS}) and [regions](${DOCS_REGIONS}) docs. Connection pooling is [built in](${DOCS_POOLING}).`,
    ),
    bulletList(
      COMPARE_PRISMA_LINKS.map((item) => `[${item.label}](${item.href}): ${item.description}`),
    ),

    heading(2, "Frequently asked questions"),
    ...FREE_POSTGRES_FAQ.flatMap((item) => [heading(3, item.question), paragraphs(item.answer)]),

    heading(2, "Create your free database"),
    paragraphs(
      "A managed PostgreSQL 17 database in seconds. Paste the connection string into any Postgres client, then claim it into a Free workspace when you want to keep it.",
    ),
    bulletList([
      "npx create-db, no account needed",
      "Works with any Postgres client",
      "Claim it within 24 hours",
    ]),
    ctaList([
      { label: "Create a free database", href: CONSOLE_SIGN_UP_URL },
      { label: "See pricing", href: "/pricing" },
    ]),
  ]);
}
