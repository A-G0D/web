"use client";

import { useState, type KeyboardEvent } from "react";
import {
  CREATE_DB_COMMAND,
  FREE_POSTGRES_CLAUDE,
  FREE_POSTGRES_CLI_CLAIM_URL,
  FREE_POSTGRES_CLI_CONNECTION,
  FREE_POSTGRES_TERMINAL_CLAIM,
  FREE_POSTGRES_TERMINAL_STATUS,
  FREE_POSTGRES_TERMINAL_TABS,
} from "./_content";
import styles from "./_terminal.module.css";

// Same frame as the product tour card. Free page only. The plain terminal is
// the default tab. Switching to Claude replays that session.
const FRAME =
  "flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_1px_2px_rgba(21,21,21,0.04),0_8px_16px_-4px_rgba(21,21,21,0.06),0_32px_64px_-16px_rgba(21,21,21,0.14)]";

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
        className={`${styles.log} px-4 py-4 text-foreground sm:px-5 sm:py-5`}
      >
        <div key={`${tab}-${run}`}>{tab === "Claude" ? <ClaudeSession /> : <PlainTerminal />}</div>
      </div>
    </figure>
  );
}

function PlainTerminal() {
  return (
    <>
      <p className={styles.row}>
        <span className="text-muted-foreground">$ </span>
        <span className={styles.typed}>{CREATE_DB_COMMAND}</span>
        <span className={styles.caret} aria-hidden="true" />
      </p>
      <div className={`${styles.reveal} ${styles.beat1}`}>
        <p className={`${styles.inner} ${styles.follow} text-muted-foreground`}>
          {FREE_POSTGRES_TERMINAL_STATUS}
        </p>
      </div>
      <div className={`${styles.reveal} ${styles.beat2}`}>
        <p className={`${styles.inner} ${styles.follow} ${styles.wrap}`}>
          {FREE_POSTGRES_CLI_CONNECTION}
        </p>
      </div>
      <div className={`${styles.reveal} ${styles.beat3}`}>
        <p className={`${styles.inner} ${styles.follow} text-muted-foreground`}>
          {FREE_POSTGRES_TERMINAL_CLAIM}
        </p>
      </div>
    </>
  );
}

function ClaudeSession() {
  return (
    <div className={styles.session}>
      <div className={styles.header}>
        <ClaudeMascot />
        <div>
          <div className={styles.product}>{FREE_POSTGRES_CLAUDE.product}</div>
          <div className={`${styles.meta} text-muted-foreground`}>
            <span>{FREE_POSTGRES_CLAUDE.model}</span>
            <span>{FREE_POSTGRES_CLAUDE.directory}</span>
          </div>
        </div>
      </div>
      <div className={styles.promptRow}>
        <span className={styles.prompt} aria-hidden="true">
          ❯
        </span>
        <span className={`${styles.typed} ${styles.typedLate}`}>{CREATE_DB_COMMAND}</span>
        <span className={styles.caret} aria-hidden="true" />
      </div>
      <div className={`${styles.reveal} ${styles.toolBeat}`}>
        <p className={`${styles.inner} ${styles.toolLine}`}>
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
            <span className={`${styles.label} text-muted-foreground`}>
              {FREE_POSTGRES_CLAUDE.connectionLabel}
            </span>
            <span className={styles.wrap}>{FREE_POSTGRES_CLI_CONNECTION}</span>
          </p>
          <p>Region: {FREE_POSTGRES_CLAUDE.region}</p>
          <p>{FREE_POSTGRES_CLAUDE.claim}</p>
          <p className={styles.wrap}>{FREE_POSTGRES_CLI_CLAIM_URL}</p>
        </div>
      </div>
    </div>
  );
}

// Claw'd, traced from the reference: a 12 by 8 pixel creature. Square head,
// two black square eyes, a body that steps out, four short legs. No face.
function ClaudeMascot() {
  return (
    <svg viewBox="0 0 12 8" aria-hidden="true" className={styles.mascot}>
      <g fill="#D97757">
        <rect x="2" y="0" width="8" height="1" />
        <rect x="2" y="1" width="1" height="1" />
        <rect x="4" y="1" width="4" height="1" />
        <rect x="9" y="1" width="1" height="1" />
        <rect x="0" y="2" width="12" height="2" />
        <rect x="2" y="4" width="8" height="2" />
        <rect x="2" y="6" width="1" height="2" />
        <rect x="4" y="6" width="1" height="2" />
        <rect x="7" y="6" width="1" height="2" />
        <rect x="9" y="6" width="1" height="2" />
      </g>
      <rect x="3" y="1" width="1" height="1" fill="#111111" />
      <rect x="8" y="1" width="1" height="1" fill="#111111" />
    </svg>
  );
}
