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
        <ClaudeSpark />
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

// The Claude spark, the small asterisk creature. Not the wordmark.
function ClaudeSpark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={styles.spark}>
      <path
        fill="#D97757"
        d="m11.744 30.632 7.936-4.438.133-.387-.133-.214h-.388l-1.328-.081-4.535-.122-3.932-.163-3.81-.204-.96-.203-.899-1.181.092-.59.807-.54 1.154.101 2.553.174 3.83.264 2.779.163 4.116.428h.654l.091-.265-.224-.163-.174-.163-3.963-2.677-4.29-2.83-2.247-1.629-1.215-.824-.613-.774-.265-1.69 1.103-1.211 1.48.102.379.101 1.501 1.15 3.207 2.474 4.188 3.075.613.509.245-.173.03-.123-.275-.458-2.278-4.102-2.43-4.174-1.084-1.73-.286-1.039c-.102-.427-.173-.783-.173-1.221l1.256-1.7.695-.224 1.675.224.704.61 1.042 2.373 1.686 3.735 2.614 5.08.766 1.507.409 1.394.153.428h.265v-.245l.215-2.86.398-3.512.389-4.52.132-1.272.634-1.527 1.256-.825.98.469.807 1.15-.112.743-.48 3.105-.94 4.866-.613 3.257h.358l.408-.407 1.655-2.189 2.778-3.46 1.226-1.375 1.43-1.517.919-.723h1.736l1.277 1.894-.572 1.954-1.788 2.26-1.48 1.914-2.125 2.85-1.328 2.28.123.184.316-.03 4.801-1.019 2.594-.468 3.095-.53 1.4.652.152.662-.551 1.354-3.31.814-3.88.774-5.782 1.364-.071.05.082.103 2.604.244 1.114.061h2.727l5.076.377 1.328.875.796 1.069-.133.814-2.042 1.039-2.758-.652-6.435-1.527-2.206-.55h-.306v.184l1.838 1.791 3.37 3.034 4.22 3.909.214.967-.542.763-.572-.081-3.707-2.78-1.43-1.251-3.238-2.718h-.215v.285l.746 1.09 3.943 5.903.204 1.812-.286.59-1.021.357-1.124-.204-2.308-3.226-2.38-3.635-1.92-3.257-.235.132-1.134 12.165-.531.62-1.226.47-1.021-.775-.541-1.252.541-2.473.654-3.227.53-2.565.48-3.187.287-1.058-.02-.072-.235.03-2.41 3.299-3.668 4.937-2.9 3.095-.695.275-1.205-.621.112-1.11.674-.987 4.014-5.09 2.421-3.156 1.563-1.822-.01-.265h-.093L10.773 35l-1.9.244-.816-.763.102-1.252.388-.407 3.207-2.2z"
      />
    </svg>
  );
}
