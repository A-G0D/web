import { COMPARE_PRISMA_LINKS } from "@/components/sections/compare-links-data";
import { TESTIMONIALS } from "@/components/sections/testimonials-data";
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
  FREE_POSTGRES_AGENT_STORY,
  FREE_POSTGRES_H1,
  FREE_POSTGRES_HERO_PRIMARY_CTA,
  FREE_POSTGRES_INCLUDED,
  FREE_POSTGRES_LIMIT,
  FREE_POSTGRES_MICROLINE,
  FREE_POSTGRES_PLATFORM_BODY,
  FREE_POSTGRES_PRICING_CTA,
  FREE_POSTGRES_PRIMARY_CTA,
  FREE_POSTGRES_PROBLEM_HEADLINE,
  FREE_POSTGRES_RELATED,
  FREE_POSTGRES_SUBHEADLINE,
  FREE_POSTGRES_TERMINAL_AGENTS,
  FREE_POSTGRES_TERMINAL_CLAIM,
  FREE_POSTGRES_TERMINAL_STATUS,
  FREE_POSTGRES_TERMINAL_URL,
  STORAGE_CONFIRM,
  CREATE_DB_COMMAND,
} from "@/app/free-postgresql-database/_content";
import { bulletList, ctaList, heading, joinBlocks, paragraphs } from "./blocks";
import { COMPARE_PRISMA_HEADING } from "./compare-links";
import {
  PRODUCT_FAQ_HEADING,
  PRODUCT_PLATFORM_HEADING,
  PRODUCT_PLATFORM_SWAP_LINE,
  PRODUCT_TESTIMONIALS_HEADING,
} from "./product";

export const FREE_POSTGRES_MARKDOWN_H1 = FREE_POSTGRES_H1;
export const FREE_POSTGRES_MARKDOWN_SUBHEADLINE = FREE_POSTGRES_SUBHEADLINE;

/**
 * Markdown rendition of /free-postgresql-database.
 *
 * Mirrors the product-page section order. Bullets use a colon, not an em dash:
 * this page's copy must not contain em or en dashes, and definitionList emits one.
 */
export function renderFreePostgresqlDatabaseMarkdown(): string {
  return joinBlocks([
    ctaList([FREE_POSTGRES_HERO_PRIMARY_CTA, FREE_POSTGRES_BROWSER_CTA]),
    FREE_POSTGRES_MICROLINE,
    `[${FREE_POSTGRES_RELATED.label}](${FREE_POSTGRES_RELATED.href})`,
    [
      "```",
      `$ ${CREATE_DB_COMMAND}`,
      FREE_POSTGRES_TERMINAL_STATUS,
      FREE_POSTGRES_TERMINAL_URL,
      "```",
    ].join("\n"),
    FREE_POSTGRES_TERMINAL_CLAIM,
    bulletList(
      FREE_POSTGRES_TERMINAL_AGENTS.map((name) => `${name}: ${FREE_POSTGRES_AGENT_STORY}`),
    ),

    heading(2, FREE_POSTGRES_FEATURES_HEADLINE),
    bulletList(FREE_POSTGRES_INCLUDED.map(([value, detail]) => `${value} ${detail}`)),
    paragraphs(FREE_POSTGRES_FEATURES_BRIDGE),
    bulletList(FREE_POSTGRES_FEATURE_ITEMS.map((item) => `**${item.name}:** ${item.description}`)),
    paragraphs(`TO CONFIRM WITH ENGINEERING: ${CONNECTION_CONFIRM}`),

    heading(2, FREE_POSTGRES_PROBLEM_HEADLINE),
    paragraphs(FREE_POSTGRES_LIMIT.intro),
    heading(3, FREE_POSTGRES_LIMIT.countsTitle),
    paragraphs(FREE_POSTGRES_LIMIT.countsLead),
    bulletList([
      `${FREE_POSTGRES_LIMIT.monthFigure} ${FREE_POSTGRES_LIMIT.monthLabel}`,
      `${FREE_POSTGRES_LIMIT.dayFigure} ${FREE_POSTGRES_LIMIT.dayLabel}`,
    ]),
    paragraphs(FREE_POSTGRES_LIMIT.idleNotBilled),
    heading(3, FREE_POSTGRES_LIMIT.idleTitle),
    paragraphs(FREE_POSTGRES_LIMIT.idleBody),
    heading(3, FREE_POSTGRES_LIMIT.capTitle),
    paragraphs(FREE_POSTGRES_LIMIT.capBody),
    heading(3, FREE_POSTGRES_LIMIT.restoreTitle),
    paragraphs(FREE_POSTGRES_LIMIT.restoreBody),
    paragraphs(FREE_POSTGRES_LIMIT.paid),
    paragraphs(`TO CONFIRM WITH ENGINEERING: ${STORAGE_CONFIRM}`),

    heading(2, PRODUCT_PLATFORM_HEADING),
    paragraphs(FREE_POSTGRES_PLATFORM_BODY),
    paragraphs(`**${PRODUCT_PLATFORM_SWAP_LINE}**`),

    heading(2, COMPARE_PRISMA_HEADING),
    paragraphs(FREE_POSTGRES_COMPARE_INTRO),
    paragraphs(FREE_POSTGRES_COMPARE_NOTE),
    bulletList(
      COMPARE_PRISMA_LINKS.map((item) => `[${item.label}](${item.href}): ${item.description}`),
    ),

    heading(2, PRODUCT_FAQ_HEADING),
    ...FREE_POSTGRES_FAQ.flatMap((item) => [heading(3, item.question), paragraphs(item.answer)]),

    heading(2, PRODUCT_TESTIMONIALS_HEADING),
    TESTIMONIALS.map(
      (testimonial) =>
        `- "${testimonial.quote}" (${testimonial.name}, ${testimonial.role}, ${testimonial.company})`,
    ).join("\n"),

    heading(2, FREE_POSTGRES_CLOSER_HEADLINE),
    paragraphs(FREE_POSTGRES_CLOSER_BODY),
    bulletList([...FREE_POSTGRES_CLOSER_BENEFITS]),
    ctaList([FREE_POSTGRES_PRIMARY_CTA, FREE_POSTGRES_PRICING_CTA]),
  ]);
}
