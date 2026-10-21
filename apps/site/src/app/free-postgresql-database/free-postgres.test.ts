import assert from "node:assert/strict";
import test from "node:test";
import { createFaqStructuredData } from "@/lib/structured-data";
import { stripFaqAnswerMarkup } from "@/lib/faq-answer";
import {
  FREE_POSTGRES_DESCRIPTION,
  FREE_POSTGRES_FAQ,
  FREE_POSTGRES_H1,
  FREE_POSTGRES_PATH,
  FREE_POSTGRES_TITLE,
} from "./_content";

const DASHES = /[\u2013\u2014]/;

test("title, meta and H1 match the brief", () => {
  assert.equal(FREE_POSTGRES_TITLE, "Free Postgres hosting with 2 GB storage | Prisma Postgres");
  assert.equal(
    FREE_POSTGRES_DESCRIPTION,
    "Free managed PostgreSQL 17 with 2 GB storage, 200,000 queries a month and up to 50 databases. No credit card, no time limit. Create one in seconds.",
  );
  assert.equal(FREE_POSTGRES_H1, "Free Postgres hosting, with 2 GB and 50 databases included");
  assert.equal(FREE_POSTGRES_PATH, "/free-postgresql-database");
});

test("FAQ answers strip cleanly and match FAQPage JSON-LD", () => {
  assert.equal(FREE_POSTGRES_FAQ.length, 11);

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
});
