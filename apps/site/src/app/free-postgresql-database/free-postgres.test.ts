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
  FREE_POSTGRES_AGENT_STORY,
  FREE_POSTGRES_BROWSER_CTA,
  FREE_POSTGRES_DESCRIPTION,
  FREE_POSTGRES_FAQ,
  FREE_POSTGRES_H1,
  FREE_POSTGRES_HERO_PRIMARY_CTA,
  FREE_POSTGRES_PATH,
  FREE_POSTGRES_PRIMARY_CTA,
  FREE_POSTGRES_SUBHEADLINE,
  FREE_POSTGRES_TERMINAL_AGENTS,
  FREE_POSTGRES_TERMINAL_CLAIM,
  FREE_POSTGRES_TERMINAL_STATUS,
  FREE_POSTGRES_TERMINAL_URL,
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
  assert.ok(!DASHES.test(FREE_POSTGRES_TERMINAL_STATUS));
  assert.ok(!DASHES.test(FREE_POSTGRES_TERMINAL_URL));
  assert.ok(!DASHES.test(FREE_POSTGRES_TERMINAL_CLAIM));
  assert.ok(!DASHES.test(FREE_POSTGRES_AGENT_STORY));
});

test("the hero terminal states the instant path, and the markdown matches it", () => {
  assert.equal(CREATE_DB_COMMAND, "npx create-db");
  assert.equal(FREE_POSTGRES_TERMINAL_STATUS, "Setting up a database");
  assert.equal(
    FREE_POSTGRES_TERMINAL_URL,
    "postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require",
  );
  assert.equal(
    FREE_POSTGRES_TERMINAL_CLAIM,
    "The database is deleted after 24 hours unless you claim it.",
  );
  assert.deepEqual([...FREE_POSTGRES_TERMINAL_AGENTS], ["Claude", "Codex"]);
  assert.equal(FREE_POSTGRES_AGENT_STORY, "Runs the command, gets the URL, and can use it.");

  const css = readFileSync(new URL("./_terminal.module.css", import.meta.url), "utf8");
  const source = readFileSync(new URL("./_terminal.tsx", import.meta.url), "utf8");
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\)/);
  assert.match(css, /steps\(var\(--chars\), end\)/);
  assert.match(source, /CREATE_DB_COMMAND\.length/);
  assert.ok(!DASHES.test(css));
  assert.ok(!DASHES.test(source));

  const markdown = renderFreePostgresqlDatabaseMarkdown();
  for (const line of [
    `$ ${CREATE_DB_COMMAND}`,
    FREE_POSTGRES_TERMINAL_STATUS,
    FREE_POSTGRES_TERMINAL_URL,
    FREE_POSTGRES_TERMINAL_CLAIM,
    `Claude: ${FREE_POSTGRES_AGENT_STORY}`,
    `Codex: ${FREE_POSTGRES_AGENT_STORY}`,
  ]) {
    assert.ok(markdown.includes(line), `markdown missing: ${line}`);
  }

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
