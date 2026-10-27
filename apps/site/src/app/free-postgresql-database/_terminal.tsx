"use client";

import { useState, type KeyboardEvent } from "react";
import { ClaudeLogo } from "@/app/stack/agent-logos";
import {
  CREATE_DB_COMMAND,
  FREE_POSTGRES_CLAUDE,
  FREE_POSTGRES_CLI_BLOCKS,
  FREE_POSTGRES_CLI_CLAIM_URL,
  FREE_POSTGRES_CLI_CONNECTION,
  FREE_POSTGRES_TERMINAL_TABS,
} from "./_content";
import styles from "./_terminal.module.css";

// Same frame as the product tour card. Free page only. The plain terminal is
// the default tab. Switching to Claude replays that session.
const FRAME =
  "flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_1px_2px_rgba(21,21,21,0.04),0_8px_16px_-4px_rgba(21,21,21,0.06),0_32px_64px_-16px_rgba(21,21,21,0.14)]";

const BEATS = [undefined, styles.beat1, styles.beat2, styles.beat3] as const;

type Tab = (typeof FREE_POSTGRES_TERMINAL_TABS)[number];

export function FreePostgresTerminal() {
  const [tab, setTab] = useState<Tab>(FREE_POSTGRES_TERMINAL_TABS[0]);
  const [run, setRun] = useState(0);

  const select = (next: Tab) => {
    if (next === tab) return;
    setTab(next);
    setRun((value) => value + 1);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = FREE_POSTGRES_TERMINAL_TABS.indexOf(tab);
    const delta =
      event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowLeft"
          ? -1
          : event.key === "Home"
            ? -index
            : event.key === "End"
              ? FREE_POSTGRES_TERMINAL_TABS.length - 1 - index
              : 0;
    if (!delta) return;
    event.preventDefault();
    const next =
      FREE_POSTGRES_TERMINAL_TABS[
        (index + delta + FREE_POSTGRES_TERMINAL_TABS.length) % FREE_POSTGRES_TERMINAL_TABS.length
      ];
    select(next);
    queueMicrotask(() => {
      document.getElementById(`free-pg-tab-${next}`)?.focus();
    });
  };

  const claude = tab === "Claude";

  return (
    <figure className={FRAME}>
      <div
        role="tablist"
        aria-label="Run npx create-db"
        onKeyDown={onTabKeyDown}
        className="flex items-center gap-1 border-b border-border/70 bg-muted/40 px-2 py-2"
      >
        {FREE_POSTGRES_TERMINAL_TABS.map((name) => {
          const selected = name === tab;
          return (
            <button
              key={name}
              type="button"
              role="tab"
              id={`free-pg-tab-${name}`}
              aria-selected={selected}
              aria-controls="free-pg-terminal-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(name)}
              className={
                selected
                  ? "rounded-md bg-card px-3 py-1 text-sm font-medium text-foreground shadow-sm"
                  : "rounded-md px-3 py-1 text-sm font-medium text-muted-foreground"
              }
            >
              {name}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id="free-pg-terminal-panel"
        aria-labelledby={`free-pg-tab-${tab}`}
        className={
          claude
            ? `${styles.log} ${styles.claude} px-4 py-4 sm:px-5 sm:py-5`
            : `${styles.log} px-4 py-4 text-foreground sm:px-5 sm:py-5`
        }
      >
        <div key={`${tab}-${run}`}>{claude ? <ClaudeSession /> : <CliLog />}</div>
      </div>
    </figure>
  );
}

function CliLog() {
  return (
    <>
      {FREE_POSTGRES_CLI_BLOCKS.map((block, index) => (
        <div key={block} className={`${styles.reveal} ${BEATS[index] ?? ""}`}>
          <pre className={`${styles.line} ${styles.inner}`}>{block}</pre>
        </div>
      ))}
    </>
  );
}

function ClaudeSession() {
  return (
    <div className={styles.session}>
      <div className={styles.header}>
        <ClaudeLogo className={styles.logo} />
        <div>
          <div className={styles.product}>{FREE_POSTGRES_CLAUDE.product}</div>
          <div className={styles.meta}>
            <span>{FREE_POSTGRES_CLAUDE.model}</span>
            <span>{FREE_POSTGRES_CLAUDE.directory}</span>
          </div>
        </div>
      </div>
      <div className={styles.promptRow}>
        <span className={styles.prompt} aria-hidden="true">
          ❯
        </span>
        <span className={styles.command}>{CREATE_DB_COMMAND}</span>
        <span className={styles.caret} aria-hidden="true" />
      </div>
      <div className={`${styles.reveal} ${styles.toolBeat}`}>
        <p className={`${styles.toolLine} ${styles.inner}`}>
          <span className={styles.dot} aria-hidden="true">
            ●
          </span>{" "}
          {FREE_POSTGRES_CLAUDE.tool}
        </p>
      </div>
      <div className={`${styles.reveal} ${styles.replyBeat}`}>
        <div className={`${styles.reply} ${styles.inner}`}>
          <p>{FREE_POSTGRES_CLAUDE.created}</p>
          <p>
            <span className={styles.label}>{FREE_POSTGRES_CLAUDE.connectionLabel}</span>
            <span className={styles.url}>{FREE_POSTGRES_CLI_CONNECTION}</span>
          </p>
          <p>Region: {FREE_POSTGRES_CLAUDE.region}</p>
          <p>{FREE_POSTGRES_CLAUDE.claim}</p>
          <p className={styles.url}>{FREE_POSTGRES_CLI_CLAIM_URL}</p>
        </div>
      </div>
    </div>
  );
}
