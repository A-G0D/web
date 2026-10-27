import {
  CREATE_DB_COMMAND,
  FREE_POSTGRES_AGENT_STORY,
  FREE_POSTGRES_TERMINAL_AGENTS,
  FREE_POSTGRES_TERMINAL_CLAIM,
  FREE_POSTGRES_TERMINAL_STATUS,
  FREE_POSTGRES_TERMINAL_URL,
} from "./_content";
import styles from "./_terminal.module.css";

// Same frame as the product tour card, so this sits in the hero visual slot
// without a second panel style. Free page only.
const FRAME =
  "flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_1px_2px_rgba(21,21,21,0.04),0_8px_16px_-4px_rgba(21,21,21,0.06),0_32px_64px_-16px_rgba(21,21,21,0.14)]";

const ROW_REVEAL = {
  Claude: styles.rowClaude,
  Codex: styles.rowCodex,
} as const;

export function FreePostgresTerminal() {
  return (
    <figure className={FRAME}>
      <div
        aria-hidden
        className="flex items-center gap-1.5 border-b border-border/70 bg-muted/40 px-4 py-2.5"
      >
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
      </div>
      <div className="flex flex-col px-4 py-4 sm:px-5 sm:py-5">
        <p className={`${styles.command} text-[0.8125rem] leading-relaxed text-foreground`}>
          <span className="text-muted-foreground">$ </span>
          <span className={styles.type} style={{ ["--chars" as string]: CREATE_DB_COMMAND.length }}>
            {CREATE_DB_COMMAND}
          </span>
          <span className={styles.caret} aria-hidden="true" />
        </p>
        <div className={`${styles.reveal} ${styles.status}`}>
          <p
            className={`${styles.inner} pt-3 font-mono text-[0.8125rem] leading-relaxed text-muted-foreground`}
          >
            {FREE_POSTGRES_TERMINAL_STATUS}
          </p>
        </div>
        <div className={`${styles.reveal} ${styles.url}`}>
          <p
            className={`${styles.inner} break-all pt-3 font-mono text-[0.75rem] leading-relaxed text-foreground sm:text-[0.8125rem]`}
          >
            {FREE_POSTGRES_TERMINAL_URL}
          </p>
        </div>
        <div className={`${styles.reveal} ${styles.claim}`}>
          <p
            className={`${styles.inner} max-w-[42ch] pt-3 text-pretty text-sm leading-relaxed text-muted-foreground`}
          >
            {FREE_POSTGRES_TERMINAL_CLAIM}
          </p>
        </div>
      </div>
      <div className={`${styles.reveal} ${styles.rows}`}>
        <div className={styles.inner}>
          <table className="w-full border-t border-border/70 text-left text-sm">
            <tbody>
              {FREE_POSTGRES_TERMINAL_AGENTS.map((name) => (
                <tr
                  key={name}
                  className={`${styles.row} ${ROW_REVEAL[name]} border-b border-border/70 last:border-b-0`}
                >
                  <th
                    scope="row"
                    className="w-28 whitespace-nowrap px-4 py-3 align-top font-medium text-foreground sm:px-5"
                  >
                    {name}
                  </th>
                  <td className="px-4 py-3 align-top text-pretty text-muted-foreground sm:px-5">
                    {FREE_POSTGRES_AGENT_STORY}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </figure>
  );
}
