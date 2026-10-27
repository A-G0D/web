import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createFaqStructuredData } from "@/lib/structured-data";
import { stripFaqAnswerMarkup } from "@/lib/faq-answer";
import { renderFreePostgresqlDatabaseMarkdown } from "@/lib/markdown/free-postgresql-database";
import {
  CONSOLE_SIGN_UP_URL,
  CREATE_DB_COMMAND,
  CREATE_DB_WEB_URL,
  FREE_POSTGRES_BROWSER_CTA,
  FREE_POSTGRES_DESCRIPTION,
  FREE_POSTGRES_FAQ,
  FREE_POSTGRES_H1,
  FREE_POSTGRES_HERO_PRIMARY_CTA,
  FREE_POSTGRES_PATH,
  FREE_POSTGRES_PRIMARY_CTA,
  FREE_POSTGRES_SUBHEADLINE,
  FREE_POSTGRES_CLI_BLOCKS,
  FREE_POSTGRES_CLI_CLAIM_URL,
  FREE_POSTGRES_CLI_CONNECTION,
  FREE_POSTGRES_CLI_DELETE,
  FREE_POSTGRES_TERMINAL_AGENTS,
  FREE_POSTGRES_TITLE,
} from "./_content";

const DASHES = /[\u2013\u2014]/;

test("title, meta and H1 match the brief", () => {
  assert.equal(FREE_POSTGRES_TITLE, "Free PostgreSQL database with 2 GB storage | Prisma Postgres");
  assert.equal(
    FREE_POSTGRES_DESCRIPTION,
    "Create a free PostgreSQL database on Prisma Postgres. Managed PostgreSQL 17 with 2 GB of storage, 200,000 operations a month and up to 50 databases. No credit card and no time limit.",
  );
  assert.equal(FREE_POSTGRES_H1, "Create a free PostgreSQL database");
  assert.equal(FREE_POSTGRES_PATH, "/free-postgresql-database");
  assert.equal(
    FREE_POSTGRES_SUBHEADLINE,
    "2 GB, 200,000 operations a month, and up to 50 databases. No card, no time limit. A connection string in seconds.",
  );
  assert.deepEqual(FREE_POSTGRES_HERO_PRIMARY_CTA, {
    label: "Get started",
    href: CONSOLE_SIGN_UP_URL,
  });
  assert.deepEqual(FREE_POSTGRES_BROWSER_CTA, {
    label: "Create an instant database",
    href: CREATE_DB_WEB_URL,
  });
  assert.equal(FREE_POSTGRES_PRIMARY_CTA.label, "Create a free database");
});

test("FAQ answers strip cleanly and match FAQPage JSON-LD", () => {
  assert.equal(FREE_POSTGRES_FAQ.length, 12);

  const structured = createFaqStructuredData(
    FREE_POSTGRES_PATH,
    FREE_POSTGRES_FAQ.map(({ question, answer }) => ({ question, answer })),
    "Prisma Postgres Free plan FAQ",
  );

  assert.equal(structured["@type"], "FAQPage");
  assert.equal(structured.mainEntity.length, FREE_POSTGRES_FAQ.length);

  for (const [i, item] of FREE_POSTGRES_FAQ.entries()) {
    const plain = stripFaqAnswerMarkup(item.answer);
    assert.ok(!plain.includes("`"), `${item.question}: backtick leaked`);
    assert.ok(!/\[[^\]]+\]\(/.test(plain), `${item.question}: markdown link leaked`);
    assert.equal(structured.mainEntity[i]?.name, item.question);
    assert.equal(structured.mainEntity[i]?.acceptedAnswer.text, plain);
  }
});

test("user-visible content and FAQ schema have no em or en dashes", () => {
  for (const item of FREE_POSTGRES_FAQ) {
    assert.ok(!DASHES.test(item.question), `${item.question}: dash in question`);
    assert.ok(!DASHES.test(item.answer), `${item.question}: dash in answer`);
    assert.ok(
      !DASHES.test(stripFaqAnswerMarkup(item.answer)),
      `${item.question}: dash after strip`,
    );
  }
  assert.ok(!DASHES.test(FREE_POSTGRES_TITLE));
  assert.ok(!DASHES.test(FREE_POSTGRES_DESCRIPTION));
  assert.ok(!DASHES.test(FREE_POSTGRES_H1));
  assert.ok(!DASHES.test(FREE_POSTGRES_SUBHEADLINE));
  assert.ok(!DASHES.test(FREE_POSTGRES_HERO_PRIMARY_CTA.label));
  assert.ok(!DASHES.test(FREE_POSTGRES_BROWSER_CTA.label));
  for (const block of FREE_POSTGRES_CLI_BLOCKS) assert.ok(!DASHES.test(block));
  assert.ok(!DASHES.test(FREE_POSTGRES_CLI_CONNECTION));
  assert.ok(!DASHES.test(FREE_POSTGRES_CLI_CLAIM_URL));
  assert.ok(!DASHES.test(FREE_POSTGRES_CLI_DELETE));
});

test("the hero terminal matches the create-db CLI, and the markdown matches it", () => {
  assert.equal(CREATE_DB_COMMAND, "npx create-db");
  assert.deepEqual([...FREE_POSTGRES_TERMINAL_AGENTS], ["Claude", "Codex"]);
  assert.equal(
    FREE_POSTGRES_CLI_CONNECTION,
    "postgres://user:password@db.prisma.io:5432/postgres?sslmode=require",
  );
  assert.equal(
    FREE_POSTGRES_CLI_CLAIM_URL,
    "https://create-db.prisma.io/claim?projectID=proj_example",
  );
  assert.equal(FREE_POSTGRES_CLI_BLOCKS[0], "┌  Creating a Prisma Postgres database\n│");
  assert.equal(FREE_POSTGRES_CLI_BLOCKS[1], "◇  Database created successfully!\n│");
  assert.ok(FREE_POSTGRES_CLI_BLOCKS[2].includes("●  Database Connection"));
  assert.ok(FREE_POSTGRES_CLI_BLOCKS[2].includes("│    Connection String:"));
  assert.ok(FREE_POSTGRES_CLI_BLOCKS[3].startsWith("◆  Claim Your Database"));
  assert.ok(FREE_POSTGRES_CLI_BLOCKS[3].includes("│    Keep your database for free:"));
  assert.ok(FREE_POSTGRES_CLI_BLOCKS[3].includes(FREE_POSTGRES_CLI_DELETE));

  const css = readFileSync(new URL("./_terminal.module.css", import.meta.url), "utf8");
  const source = readFileSync(new URL("./_terminal.tsx", import.meta.url), "utf8");
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\)/);
  assert.match(source, /role="tablist"/);
  assert.ok(!source.includes("<table"));
  assert.ok(!DASHES.test(css));
  assert.ok(!DASHES.test(source));

  const markdown = renderFreePostgresqlDatabaseMarkdown();
  for (const line of [
    ...FREE_POSTGRES_TERMINAL_AGENTS,
    ...FREE_POSTGRES_CLI_BLOCKS.flatMap((block) => block.split("\n")),
  ]) {
    assert.ok(markdown.includes(line), `markdown missing: ${line}`);
  }
  assert.ok(!markdown.includes("Runs the command, gets the URL, and can use it."));
  assert.ok(!markdown.includes("postgres://USER:PASSWORD@HOST"));

  for (const gone of [
    "Prisma Postgres at a glance",
    "A Postgres database and its connection string, with pooling built in.",
    "Browse and edit rows in the browser with Prisma Studio.",
    "See which queries are slow with Query Insights.",
    "Create a database. Run npx create-db, or create one in the Console.",
    "Paste it into your app. Set it as DATABASE_URL.",
    "Claim it within 24 hours. Open the claim link and sign in. The database moves into your Free workspace",
  ]) {
    assert.ok(!markdown.includes(gone), `old hero copy still in markdown: ${gone}`);
  }
});
