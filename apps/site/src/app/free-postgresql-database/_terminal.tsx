"use client";

import { useState, type KeyboardEvent } from "react";
import { FREE_POSTGRES_CLI_BLOCKS, FREE_POSTGRES_TERMINAL_AGENTS } from "./_content";
import styles from "./_terminal.module.css";

// Same frame as the product tour card. Free page only. Claude is the default
// tab. Switching tabs replays that agent's run of the same CLI output.
const FRAME =
  "flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_1px_2px_rgba(21,21,21,0.04),0_8px_16px_-4px_rgba(21,21,21,0.06),0_32px_64px_-16px_rgba(21,21,21,0.14)]";

const BEATS = [undefined, styles.beat1, styles.beat2, styles.beat3] as const;

type Agent = (typeof FREE_POSTGRES_TERMINAL_AGENTS)[number];

export function FreePostgresTerminal() {
  const [agent, setAgent] = useState<Agent>(FREE_POSTGRES_TERMINAL_AGENTS[0]);
  const [run, setRun] = useState(0);

  const select = (next: Agent) => {
    if (next === agent) return;
    setAgent(next);
    setRun((value) => value + 1);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = FREE_POSTGRES_TERMINAL_AGENTS.indexOf(agent);
    const delta =
      event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowLeft"
          ? -1
          : event.key === "Home"
            ? -index
            : event.key === "End"
              ? FREE_POSTGRES_TERMINAL_AGENTS.length - 1 - index
              : 0;
    if (!delta) return;
    event.preventDefault();
    const next =
      FREE_POSTGRES_TERMINAL_AGENTS[
        (index + delta + FREE_POSTGRES_TERMINAL_AGENTS.length) %
          FREE_POSTGRES_TERMINAL_AGENTS.length
      ];
    select(next);
  };

  return (
    <figure className={FRAME}>
      <div
        role="tablist"
        aria-label="Agents running npx create-db"
        onKeyDown={onTabKeyDown}
        className="flex items-center gap-1 border-b border-border/70 bg-muted/40 px-2 py-2"
      >
        {FREE_POSTGRES_TERMINAL_AGENTS.map((name) => {
          const selected = name === agent;
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
        aria-labelledby={`free-pg-tab-${agent}`}
        className={`${styles.log} px-4 py-4 text-foreground sm:px-5 sm:py-5`}
      >
        <div key={`${agent}-${run}`}>
          {FREE_POSTGRES_CLI_BLOCKS.map((block, index) => (
            <div key={block} className={`${styles.reveal} ${BEATS[index] ?? ""}`}>
              <pre className={`${styles.line} ${styles.inner}`}>{block}</pre>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
