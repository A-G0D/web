# Handover: getting-started-eval nightly and the Composer docs gap

Written 2026-10-27 by the agent penelope-87 for a fresh agent in a fresh session and worktree. Read this whole file first. Remove `wip/composer-page/` from this branch before you open the docs pull request.

Full transcript of the previous session (about 4.8 MB of JSONL; search it, don't read it whole): `/Users/wmadden/.claude/projects/-Users-wmadden-Projects-prisma-getting-started-eval--claude-worktrees-prisma-getting-started-eval-06d3ca/99d6c922-8549-4a98-a5b3-81f163d880e3.jsonl`

## 1. The project

The operator is Will Madden. He makes the high-level decisions; you do the engineering.

`prisma/getting-started-eval` (https://github.com/prisma/getting-started-eval) is a nightly check that a new user can follow the Prisma 8 docs from an empty directory to a deployed app. It runs at 03:30 UTC and has three tests. Always write their names out in full:

- "Automated script: run the Composer getting-started code blocks" (`src/step-test/composer.ts`, kind `step-test`). It runs every command of https://www.prisma.io/docs/composer/getting-started in a container, deploys, then tears down.
- "Automated script: run the Prisma ORM MongoDB quickstart code blocks" (`src/step-test/mongodb-quickstart.ts`, kind `mongodb-quickstart`).
- "Agent: read the guides to build a notes API" (`src/agent-eval`, kind `agent-eval`). Claude Code, headless, gets a goal and the docs entry point, three attempts a night. Scripts decide pass or fail; a model writes a friction report.

Each run's artifacts include `report.md` and `report.html` (the `report` artifact), plus per-test `result.jsonl`, logs and transcripts. Download one with `gh run download <run id>` into the gitignored `wip/` folder of a getting-started-eval checkout. Read the repository's `CLAUDE.md`, `README.md` and `CONTRIBUTING.md` before changing harness code.

Two kinds of work happen:

1. **Harness work**: keep the nightly running and correct. A failed GitHub job means the harness broke; test outcomes live only in the report.
2. **Product work**: fix the problems the runs find in Prisma's tools and docs. Will asked for this on 2026-10-22.

## 2. Rules Will has set (follow them exactly)

- Every change goes through a pull request. `main` is protected. Merge only after Will approves or says to.
- Push with the bot remote. It's named `bot` in both repositories: `git@github-wmadden-electric:prisma/<repo>.git`. Commit with `git commit -s --trailer "Signed-off-by: Will Madden <madden@prisma.io>"`. Never amend, squash, rebase or force-push. Don't add Co-Authored-By or "Generated with" lines.
- Put `Agent: <your name>` in every PR description. Name yourself first: run `bash ~/.claude/scripts/agent-name.sh`, and see `~/.claude/CLAUDE.md`.
- Use `pnpm`, never `npm` or `npx`, for the harness itself. Run `pnpm check` before handing back. Use arktype, no `any`, no bare `as` casts. Write the test first, and leave "should" out of test names.
- Never fix a nightly failure by changing a tested dependency's version: MongoDB, Node or npm. Test what users get. The one temporary exception is in section 3.
- Never add Node or npm prerequisites to pages to get green. Every Prisma 8 tool supports Node `^22.18.0 || ^24.11.0 || >=26.0.0` with the npm that Node ships.
- Don't add new CI jobs unless absolutely necessary; add steps to existing ones.
- Don't run the automated scripts or the agent test against a real workspace, and don't deploy, unless Will asks. Both cost money. Every resource must be named `gse-<run id>`, so the cleanup job can delete leaked ones.
- Don't use `/tmp`; keep working files in the worktree's `wip/`. Don't hard-wrap markdown. Write briefly, in plain English. Don't use the question UI or floating task cards.
- Run `/drive-code-review` on each substantial change before calling it done.
- Credentials: the deploy credentials are in `~/.config/prisma-compose/deploy.env` (source it with `set -a; . <file>; set +a`; never print the values). The results database URL and the agent token are under `/Users/wmadden/Projects/prisma/orm/.claude/worktrees/prisma-8-getting-started-2200e0/.prisma/`.

## 3. What was done (2026-10-21 to 2026-10-23), all merged

- **prisma/getting-started-eval#21:**
  - rules for the Composer page's new `curl "$(npx prisma dev url gateway)"` and `curl -i -X POST "$(npx prisma dev url quotes)/rpc/random" ...` commands, with a new check `output-http-status` that reads the status from `curl -i` output
  - the saved page updated
  - npm debug logs saved to `logs/npm`
  - the MongoDB jobs on `ubuntu-22.04`. GitHub's `ubuntu-24.04` runners boot kernel `7.0.0-azure`, and `mongo:8.0` (8.0.34) refuses to start on it (MongoDB SERVER-136848). Move these jobs back to `ubuntu-latest` once `mongo:8.0` is 8.0.35.
- **prisma/getting-started-eval#22:** vitest runs only `src/**/*.test.ts`.
- **prisma/getting-started-eval#23:** the run image is on **Node 24.11.1** temporarily. alchemy 2.0.0-beta.83 refuses Node 22 on purpose (alchemy-run/alchemy#2151), and Prisma Composer 0.30.0+ pins it. Will is sorting this out with the alchemy team. A CI step in `ci.yml` fails after 2026-11-05 if the `Dockerfile` isn't back on `node:22.18.0`. Node 24 ships npm 11, which hides the npm 10 crash `Cannot read properties of null (reading 'edgesOut')` that hit `npm install @prisma/composer ...` in CI.
- **prisma/getting-started-eval#24:** the teardown's destroy script (`src/step-test/teardown.ts`, `DESTROY_SCRIPT`) passes the `config` argument that Composer 0.33.0's `destroy()` from `@prisma/composer/control` requires: `{ value: prismaConfig.composer, file: 'prisma.config.ts' }`. There is no `prisma destroy` CLI command.
- **Linear TML-3724** (Terminal team, High): any literal `@default(...)` makes `prisma contract emit` fail when two versions of `@prisma/orm-framework` are installed (bun with Composer). Full reproduction is in the ticket.
- **Teardown design:** Will is handling a teardown command with a designer. Don't work on it.
- **Missing modules when `prisma dev` loads the config** (`@prisma/orm-postgres/control`, `temporal-polyfill`): not a bug. An agent used `--legacy-peer-deps`, which skips peer dependencies.

## 4. Current state (2026-10-27)

Nightlies on 10-24, 10-25, 10-26 and 10-27 all finished (harness `cca8f6c`, `prisma` 8.0.0-rc.27, Composer 0.34.0). In the 10-27 run (40444816084):

- "Automated script: run the Composer getting-started code blocks": every page step passed, and destroying production passed. **Destroying the demo stage failed:** `{"code":"DEPLOY.TARGET_NOT_FOUND","fix":"Deploy it first."}`. 10-26 also failed; check whether at the same step.
- MongoDB quickstart: passed. Agent: 3 of 3 passed, $3.70 per attempt.

Open pull requests: only Dependabot's, prisma/getting-started-eval#18, #19 and #20. Nothing is uncommitted in the harness repository.

## 5. Next tasks, in order

### Task A (harness): fix the demo-stage destroy

`teardown()` destroys each deployed environment in the order they were deployed: production first, then the `demo` stage. My guess, not verified: destroying production now also removes something the stage needs, or the stage destroy needs a different target shape in Composer 0.34.0. An agent transcript from 10-23 shows a destroy printing `Removed the Project (proj_...) — nothing was left in it.`, so destroying the last environment may delete the project.

To check it:
1. Read `destroy-demo.log` and `destroy-production.log` in the 10-27 `step-test` artifact.
2. Read `DestroyTarget` in `@prisma/composer@0.34.0`'s `dist/control.d.mts` (get it with `npm pack`).
3. Try destroying stages before production.

Fix it test-first in `src/step-test/teardown.ts` and `teardown.test.ts`, then open a PR.

### Task B (product, docs): the Composer page "Build an HTTP API with a database"

This is the most common friction across all agent attempts. Will said go ahead, and I wrote an outline, but **Will has not approved the outline yet.** Show it to him and get approval before writing the page.

- Outline: `wip/composer-page/outline.md` on this branch.
- Research behind it: `wip/composer-page/docs-coverage.md`, mapping what the current Composer docs say for each gap and the real API signatures, and `wip/composer-page/agent-evidence.md`, with the working files and commands from the best agent attempt, every 404 URL, and every error and fix.

The docs live here, in prisma/web: `apps/docs/content/docs/composer/` (navigation in `meta.json`). This worktree is `/Users/wmadden/Projects/prisma/web/.claude/worktrees/composer-http-api-page`, branch `claude/composer-http-api-page`, pushed to `bot`. Don't use the main `/Users/wmadden/Projects/prisma/web` checkout; it's on a stale branch.

What the outline's verification needs: build the app exactly as the page will say, on Node 24 with npm, in a clean folder. Run it locally, then deploy to the evaluation workspace under a `gse-` project name, add a field, redeploy, and delete the project. The deploy uses real cloud resources, so **ask Will before deploying**. Recheck the API against Composer 0.34.0; the research used 0.33.0.

### Task C (later)

- Fix `composer/limitations.mdx`. It contradicts Getting started on `prisma auth login` and on pinning `effect`.
- Smaller product issues from the friction reports:
  - `prisma skills sync` in an empty directory reports success and installs nothing.
  - Service IDs reject hyphens, and the error only shows at `prisma dev`.
  - `--json` output has plain log lines mixed in.
  - When a package is missing, `CLI.CONFIG_UNREADABLE` doesn't name it.
  - The `migration plan` output says to run `prisma db migrate`, which doesn't apply in the Composer flow.
  - The second `migration plan` needs `--from`, which agents struggled with (`MIGRATION.PLAN_ORIGIN_UNKNOWN`).
- When `mongo:8.0` reaches 8.0.35, move the MongoDB jobs back to `ubuntu-latest`. When Will settles alchemy, move the image back to Node 22.18.0.
