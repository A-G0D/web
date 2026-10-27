# Agent evidence for "Build an HTTP API with a database"

Source: the "Agent: read the guides to build a notes API" transcripts from three nightly runs. All 9 attempts passed.

| Run | Date | Versions | Attempts (turns, cost) |
| --- | --- | --- | --- |
| 39895524430 | 2026-10-23 | Composer 0.33.0, prisma 8.0.0-rc.26, @prisma/orm-postgres 8.0.0-rc.19, Node 24.11.1, Bun 1.3.13 | A1 81 turns $2.23; A2 121 turns $5.18; A3 99 turns $3.13 |
| 39717336176 | 2026-10-22 | Composer 0.32.0, prisma rc.24, orm-postgres rc.18, Node 22.18.0 | 99 / 104 / 117 turns |
| 39539105672 | 2026-10-21 | Composer 0.32.0, prisma rc.23, orm-postgres rc.18, Node 22.18.0 | 139 / 120 / 185 turns |

"A1" means agent attempt 1. Transcript step numbers (#n) count tool calls from 0.

Two facts frame everything below:

- No attempt built the app from the docs alone. A1 (10-23) and all 10-22 attempts copied `examples/orm-demo` from the prisma/composer GitHub repository. A2 (10-23) used the docs pages as Markdown, then GitHub. A3 (10-23) used only the synced skills and `.d.mts` type files in `node_modules`.
- The docs show a two-service RPC app (getting-started) and a `postgres()` fragment (databases). No page shows a plain HTTP service with a database, the `orm` section of `prisma.config.ts`, or a migration plan followed by a deploy.

## 1. Docs URLs fetched

### 2026-10-23

| Attempt | URL | Result | What it wanted |
| --- | --- | --- | --- |
| A1 | /docs/composer | 200, useless | Install, init, routes, database, deploy. The summary said the page "doesn't provide explicit initialization steps". Only command found: `npx prisma skills sync`. |
| A1 | github.com/prisma/composer/tree/main/examples/store/modules/catalog | 200, useless | File contents. The GitHub HTML page shows only names. The agent switched to the GitHub API and raw.githubusercontent.com and copied `examples/orm-demo` (contract.prisma, module.ts, package.json, prisma.config.ts, tsconfig, src/contract.ts, src/service.ts, src/server.ts) and `examples/store/modules/catalog/src/server.ts`. |
| A2 | /docs/composer | 200 | Overview. |
| A2 | /docs/composer/deploying | 200 | Non-interactive deploy with `PRISMA_SERVICE_TOKEN`. |
| A2 | /docs/composer/local-development | 200, useless | Project setup. Summary: "I cannot provide a complete setup guide". |
| A2 | /docs/composer (again) | 200 | List of pages. |
| A2 | WebSearch x2 | | "Prisma Composer getting started quickstart", "Prisma Composer Prisma Postgres database provision prisma.config.ts". |
| A2 | /docs/composer/getting-started | 200 | Full code. The WebFetch summary dropped code blocks. |
| A2 | /docs/composer/databases | 200, partly useless | Full Postgres examples. Summary listed concepts only. |
| A2 | curl the same pages as HTML | 200 | Scraped `<figure>` code blocks with a Node script. Then found the `.md` suffix. |
| A2 | /docs/composer.md, /getting-started.md, /deploying.md, /databases.md, /local-development.md, /apps-and-modules.md, /services-and-contracts.md, /limitations.md | 200 | Read in full. |
| A2 | /docs/composer/port-an-existing-app.md | **404** | Linked from the overview as "Port an existing app". |
| A2 | /docs/cli/deploy.md | 200 | Deploy flags. |
| A2 | /docs/cli/contract-emit.md, /docs/cli/migration-plan.md | 200 | Migration commands. |
| A2 | /docs/cli/migration.md, /docs/cli/contract.md | **404** | Command group pages. |
| A2 | /docs/orm/prisma-schema/data-model/models.md | 200 | Boolean default syntax. |
| A2 | /docs/orm/reference/prisma-schema-reference.md | **404** | Boolean default syntax. |
| A2 | api.github.com search for `@default(false)` | 401 | Same. |
| A2 | /docs/cli/branch.md, /postgres.md, /contract-infer.md, /db-sign.md, /db-init.md, /db-update.md | 200 | How to baseline an existing table. |
| A2 | /docs/cli/database.md | **404** | Same. |
| A2 | /docs/cli/migration-ref.md, /docs/cli/migration-new.md | 200 | Setting the `db` ref. |
| A3 | /docs/composer (twice) | 200, useless | Package names, install command, HTTP routes. Only packages listed; no install command, no route example. |
| A3 | /docs/composer/get-started | **404** | Quickstart. (The real page is `/getting-started`.) |
| A3 | /docs/composer/deploying | 200 | Production vs stage, env vars. |
| A3 | /docs/composer/apps-and-modules | 200 | `compute()` and `module()` code. |
| A3 | /docs/composer/compute | **404** | HTTP routes in a compute service. |

### 2026-10-22 and 2026-10-21 (differences only)

- 10-22 A1: only /docs/composer, then `git clone --depth 1 https://github.com/prisma/composer.git` and copied `examples/orm-demo` and `scripts/composer-destroy.ts`.
- 10-22 A2: /docs/composer/services-and-contracts and /apps-and-modules were useless for "HTTP routes" and "postgres() dependency" (summaries said the pages do not cover them). Also fetched /docs/cli/deploy and /docs/ai/tools/skills.
- 10-22 A3: raw.githubusercontent.com `examples/store/modules/catalog/service.ts` **404** (file moved); `examples/scripts/composer-destroy.ts` **404**; `scripts/composer-destroy.ts` 200.
- 10-21 A1: /docs/composer/postgres **404**. /docs/composer/porting-an-app 200.
- 10-21 A2: /docs/composer/http **404**. /docs/compute/deployments 200 but useless for "how do I find the public URL".
- 10-21 A3: raw `examples/store/modules/catalog/module.ts` **404**.

Guessed URLs that 404 across runs: `/composer/get-started`, `/composer/compute`, `/composer/http`, `/composer/postgres`. These show where an agent expects the new page.

## 2. Final working files

### Best attempt: 2026-10-23 A1 (fewest turns, no workarounds in the app code)

Layout: `package.json`, `tsconfig.json`, `contract.prisma`, `prisma.config.ts`, `module.ts`, `src/contract.ts`, `src/service.ts`, `src/server.ts`, generated `contract.json`, `contract.d.ts`, `migrations/`, and `scripts/destroy.ts`.

`package.json`:

```json
{
  "name": "gse-20261023-0332-487f",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "rm -rf dist && bun build src/server.ts --target=bun --outfile dist/server.mjs",
    "contract:emit": "prisma contract emit",
    "typecheck": "tsc --noEmit",
    "dev": "npm run build && prisma dev module.ts",
    "deploy": "npm run build && prisma deploy module.ts"
  },
  "dependencies": {
    "@prisma/composer": "0.33.0",
    "@prisma/composer-prisma-cloud": "0.33.0",
    "@prisma/orm-postgres": "8.0.0-rc.19",
    "effect": "4.0.3"
  },
  "devDependencies": {
    "@types/bun": "^1.3.13",
    "prisma": "8.0.0-rc.26",
    "typescript": "^5.7.3"
  }
}
```

The agent pinned `@prisma/orm-postgres` and `effect` to the versions npm had already installed as transitive dependencies (it read them from `node_modules/*/package.json`). `@prisma/orm-postgres` is a peer dependency of `@prisma/composer-prisma-cloud`.

`tsconfig.json` (copied from the composer repo's `tsconfig.base.json`):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "Preserve",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": false,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "noEmit": true,
    "skipLibCheck": true,
    "types": ["bun"],

    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["module.ts", "prisma.config.ts", "src", "contract.d.ts"]
}
```

`contract.prisma` (after the migration step; the first version had no `done` line):

```prisma
// use prisma-8
//
// The notes app's data contract: one Note with a uuid id and its text.

model Note {
  id   String  @id @onCreate(uuid(4))
  text String
  done Boolean @default(false)

  @@map("Note")
}
```

`prisma.config.ts`:

```ts
import { defineConfig as composer } from '@prisma/composer/config';
import { nodeBuild } from '@prisma/composer/node/control';
import { prismaCloud, prismaState } from '@prisma/composer-prisma-cloud/control';
import { defineConfig as orm } from '@prisma/orm-postgres/config';
import { definePrismaConfig } from 'prisma/config';

// The ORM config anchors the contract source and the migrations directory on
// the filesystem. The deploy lowering loads it (by path, from the postgres
// resource's `config`) to resolve `migrations/` — the app build never imports
// it. `db.connection` is a placeholder: the framework injects the real URL at
// hydrate, so nothing reads this value.
export default definePrismaConfig({
  composer: composer({
    extensions: [prismaCloud(), nodeBuild()],
    state: prismaState(),
  }),
  orm: orm({
    contract: './contract.prisma',
    db: { connection: 'postgres://localhost:5432/placeholder' },
  }),
});
```

`src/contract.ts`:

```ts
import { dataContract } from '@prisma/composer-prisma-cloud/orm';
import type { Contract } from '../contract.d.ts';
import contractJson from '../contract.json' with { type: 'json' };

export const noteContract = dataContract<Contract>(contractJson);
```

`src/service.ts`:

```ts
import node from '@prisma/composer/node';
import { compute } from '@prisma/composer-prisma-cloud';
import { postgres } from '@prisma/composer-prisma-cloud/orm';
import { noteContract } from './contract.ts';

export default compute({
  name: 'notes',
  deps: {
    db: postgres(noteContract),
  },
  build: node({ module: import.meta.url, entry: '../dist/server.mjs' }),
});
```

`src/server.ts` (final, with `done`):

```ts
import service from './service.ts';

const { db } = service.load(); // db: { url, client } — the Prisma ORM binding
const port = service.port();

// A Prisma Postgres direct connection is dropped when it idles / the service
// scales to zero; the lazy pool reconnects on the next query. Surface those
// as logs, not an uncaught crash into a 502 restart loop.
process.on('uncaughtException', (err) => console.error('uncaughtException', err));
process.on('unhandledRejection', (err) => console.error('unhandledRejection', err));

function isTextBody(value: unknown): value is { text: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>)['text'] === 'string'
  );
}

const handler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  if (url.pathname === '/notes' && request.method === 'GET') {
    try {
      const notes = await db.client.orm.public.Note.select('id', 'text', 'done').all();
      return Response.json(notes);
    } catch (err) {
      console.error('list notes failed', err);
      return Response.json({ error: 'internal error' }, { status: 503 });
    }
  }

  if (url.pathname === '/notes' && request.method === 'POST') {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: '"text" must be a string' }, { status: 400 });
    }

    if (!isTextBody(body)) {
      return Response.json({ error: '"text" must be a string' }, { status: 400 });
    }

    try {
      const note = await db.client.orm.public.Note.create({ text: body.text });
      return Response.json({ id: note.id, text: note.text, done: note.done }, { status: 201 });
    } catch (err) {
      console.error('create note failed', err);
      return Response.json({ error: 'internal error' }, { status: 503 });
    }
  }

  return new Response('Not found', { status: 404 });
};

// Bind all interfaces — Compute routes external HTTP to the VM, so a
// loopback-only listener would be unreachable.
Bun.serve({ port, hostname: '0.0.0.0', fetch: handler });
```

`module.ts`:

```ts
import { module } from '@prisma/composer';
import { postgres } from '@prisma/composer-prisma-cloud/orm';
import { noteContract } from './src/contract.ts';
import notesService from './src/service.ts';

/**
 * The database provision id is "database" (not "db"): the prisma-cloud
 * target passes it through as the Prisma resource name, and the Connection
 * API rejects names shorter than 3 characters.
 */
export default module('gse-20261023-0332-487f', ({ provision }) => {
  const db = provision(
    postgres({ name: 'database', contract: noteContract, config: './prisma.config.ts' }),
    { id: 'database' },
  );
  provision(notesService, { id: 'notes', deps: { db } });
});
```

`scripts/destroy.ts` (teardown; there is no `prisma destroy` command):

```ts
import { destroy } from '@prisma/composer/control';
import appConfig from '../prisma.config.ts';

const result = await destroy({
  entry: 'module.ts',
  target: { kind: 'production' },
  config: { value: appConfig.composer, file: 'prisma.config.ts' },
  onEvent: (event) => console.log('[destroy]', event.kind, event),
});

if (!result.ok) {
  console.error('Destroy failed:', JSON.stringify(result.failure, null, 2));
  process.exit(1);
}
```

Build command: `npm run build`, which runs `bun build src/server.ts --target=bun --outfile dist/server.mjs` (1.75 MB, 420 modules, everything inlined).

### Differences in the other attempts

- **10-23 A2** (Bun project, `bun init` + `bun add`, as in getting-started): first deployed with `rawPostgres()` and Bun's `SQL` client running `CREATE TABLE IF NOT EXISTS notes` in `server.ts`. Then switched to `postgres()` from `/orm`. Final files match A1 except: service named `api`, files under `src/api/`, wrapper in `src/data.ts`, no `id` options on `provision()`, `id Int @id @default(autoincrement())`, `@@map("notes")`, and `done Boolean @default(sql\`false\`)` because `@default(false)` failed (see section 4). Build: `bun build src/api/server.ts --target=bun --outfile dist/api/server.mjs`. Short tsconfig from the getting-started page. Destroy passes `file: fileURLToPath(new URL('./prisma.config.ts', import.meta.url))`.
- **10-23 A3** (learned from skills and `.d.mts` only): `contract.prisma` in `src/notes/`, `orm({ contract: './src/notes/contract.prisma' })` with no `db.connection`, `id Int @id @default(autoincrement())`, no `@@map`, `done Boolean @default(false)` worked. Service `notesapi` uses `node({ module, entry: '../../dist/server.mjs', dependencies: 'external' })` and builds with esbuild (`build.mjs`: `bundle: true, platform: 'node', format: 'esm', target: 'node22', packages: 'external'`, output 4.4 kB). `service.load()` is called inside the request handler. Needed `@types/bun` for `Bun.serve`.
- **10-22 A1**: same as 10-23 A1 but `id String @id @default(uuid())` (`@onCreate` was rejected by orm-postgres rc.18), `pg` added as a dependency, TypeScript 6, ran `prisma` through `bunx --bun` because the image had Node 22.18.0.
- **10-22 A2**: app name `notesapp` (not the run ID), database name `notesdb`, contract in `src/prisma/`, deployed with `--name gse-... --report "$PRISMA_COMPOSER_REPORT_FILE"`.
- **10-22 A3**: two config files. Root `prisma.config.ts` has only `composer`; `db/prisma.config.ts` has only `orm`; `module.ts` passes `config: fileURLToPath(new URL('./db/prisma.config.ts', import.meta.url))`. Contract commands run from `db/`. Destroy script copied from the composer repo's `scripts/composer-destroy.ts`.
- **10-21**: same `postgres()` + `dataContract` shape everywhere. A1 used `id String @id` (app generates ids). A3 used both a uuid `id` and `seq Int @unique @default(autoincrement())`. All three had to download Node 24 because alchemy refused Node 22.18.0.

## 3. Commands that worked, in order (10-23 A1)

Environment: `PRISMA_SERVICE_TOKEN`, `PRISMA_WORKSPACE_ID`, `PRISMA_REGION=us-east-1` were set. No `prisma auth login`, no `--name`.

```bash
npm init -y
npm install @prisma/composer@0.33.0 @prisma/composer-prisma-cloud@0.33.0 prisma
npx prisma skills sync                       # works only after the install
# write package.json, tsconfig.json, contract.prisma, prisma.config.ts, src/*, module.ts
npm install
npx prisma contract emit                     # writes contract.json, contract.d.ts
npx prisma migration plan --name init        # writes migrations/app/<ts>_init (CREATE TABLE "Note")
npx tsc --noEmit
npm run build                                # bun build ... --outfile dist/server.mjs
npx prisma dev module.ts --detach            # prints "notes: http://localhost:3000"
curl http://localhost:3000/notes             # []
curl -X POST -H 'Content-Type: application/json' -d '{"text":"buy milk"}' http://localhost:3000/notes   # 201
npx prisma dev stop
npx prisma deploy module.ts                  # prints the public URL
curl https://h7qkhtdcv3ap0fphwrid094v.ewr.prisma.build/notes
```

Migration and redeploy:

```bash
# add `done Boolean @default(false)` to contract.prisma
npx prisma contract emit
npx prisma migration plan --name add_done --from <"to" hash from migrations/app/<ts>_init/migration.json>
#   -> ALTER TABLE "public"."Note" ADD COLUMN "done" bool DEFAULT false NOT NULL;
# update server.ts to select and return `done`
npx tsc --noEmit && npm run build
npx prisma dev module.ts --detach            # applies the new migration to the kept local data
npx prisma dev stop
npx prisma deploy module.ts                  # same URL; plan shows [database-migrate] update, [notes-deploy] replace
```

Simpler forms that also worked for the `--from` step: `--from 20261023T0414_init` (the migration folder name, 10-23 A3), or `npx prisma migration ref set db 20261022T0338_init` and then a plain `migration plan` (10-22 A1). Passing the path `migrations/app/<folder>` fails.

Teardown:

```bash
npm run build
node scripts/destroy.ts                      # Node 24 runs .ts directly
```

Destroy deletes 9 resources and prints `Removed the Project (proj_...) — nothing was left in it.` The old URL then returns HTTP 404 with an HTML "no app deployed" page.

No attempt ran `prisma db migrate` or `prisma db update`. Both `prisma dev` and `prisma deploy` apply `migrations/` themselves (the `database-migrate` resource). The `migration plan` output still says `→ Apply the migration: prisma db migrate`, which does not apply in the Composer flow.

### How agents found the public URL

All attempts read it from `prisma deploy` output. The deploy prints a tree and a summary line:

```
gse-20261023-0332-487f
├─ database   postgres-database db_st1hyn9nm5igun036bghvcbt
└─ notes      compute-service cps_h7qkhtdcv3ap0fphwrid094v
              https://h7qkhtdcv3ap0fphwrid094v.ewr.prisma.build
...
notes: https://h7qkhtdcv3ap0fphwrid094v.ewr.prisma.build
✔ Deployed gse-20261023-0332-487f to production in 25.5s.
```

The URL stays the same across redeploys. Locally, `prisma dev` prints `notes: http://localhost:3000`, and 10-23 A2 used `url=$(npx prisma dev url api)`. Some attempts also read the deploy report file at `$PRISMA_COMPOSER_REPORT_FILE`.

## 4. Errors and fixes

### 2026-10-23

| Attempt | Error text | Fix |
| --- | --- | --- |
| A1, A3 | `npx prisma skills sync` in an empty folder: `No Prisma packages with agent skills are installed.` | Install `@prisma/composer`, `@prisma/composer-prisma-cloud`, `prisma` first, then sync (3 skills). |
| A1 | `src/server.ts(21,47): error TS4111: Property 'text' comes from an index signature, so it must be accessed with ['text'].` | Bracket access. Caused by the strict composer-repo tsconfig. |
| A3 | `error TS2339: Property 'text' does not exist on type '{}'.` and `error TS2867: Cannot find name 'Bun'. Do you need to install type definitions for Bun? Try npm i --save-dev @types/bun.` | Narrowing with `'text' in body`; `npm install --save-dev @types/bun`. |
| A1 | `✘ [MIGRATION.PLAN_ORIGIN_UNKNOWN] Cannot determine the plan origin: migrations exist but no origin is named` (second `migration plan`) | `--from <hash>` taken from the init `migration.json` `to` field. |
| A3 | `✘ [MIGRATION.REF_NOT_FOUND] Not a known contract reference: "migrations/app/20261023T0414_init"` | `--from 20261023T0414_init` (folder name only). Then `migration ref set db <new hash>` so later plans chain. |
| A2 | `✘ [CONTRACT.SOURCE_LOAD_FAILED] Failed to resolve contract source` / `why: Codec pg/bool@1 takes only values of pg/bool, and was handed an object no data type constructed.` on `done Boolean @default(false)` | `@default(sql\`false\`)`. The same `@default(false)` worked in A1, A3 and on 10-22. A2 is the only attempt installed with Bun, and its tree had a nested `node_modules/@prisma/orm-family-sql/node_modules/@prisma/orm-framework`. A second copy of that package is a likely cause; this is not confirmed. |
| A2 | `contract.d.ts imports types from packages that are not installed: - @internal/target-postgres` (every emit). `npm view` returns 404 for it. | Ignored; `tsc` passed. |
| A2 | Redeploy after switching `rawPostgres()` to `postgres()`: `[database-migrate] fail — Prisma ORM migrate (RUNNER_FAILED): MIGRATION.SCHEMA_VERIFY_FAILED: Database schema does not satisfy contract (2 failures)` | Delete `migrations/app`; edit the contract back to the live table shape; `contract emit`; `migration plan --name baseline_existing_notes`; restore the contract; `contract emit`; `migration ref set db <baseline hash>`; `migration plan --name add_done_column`; deploy. Recipe came from skill `migration-model.md`. |
| A2 | `✘ [MIGRATION.HASH_NOT_IN_GRAPH] Resolved contract hash is not in the migration graph` / `why: The migration graph is empty` | Plan the baseline migration first, then set the ref. |
| A2 | During the successful redeploy: `[api-deploy] Recovery read crashed while looking up this resource's interrupted create (TypeError: Cannot read properties of undefined (reading 'appId'))` | None needed; the deploy succeeded. |
| A2 | `destroy({ entry, target })` crashed: `TypeError: Cannot read properties of undefined (reading 'file')` at `checkConfigSource` | Pass `config: { value: prismaConfig.composer, file: <path to prisma.config.ts> }`. A1 and A3 passed `config` from the start. |
| all | Every deploy: `Not recording this deploy in Prisma Cloud: <dir> has no commit and branch to report it under. Deploy from a git checkout to see it in the Console.` | Warning only. |
| A2 | `prisma postgres list` after teardown: `✘ [PROJECT.SETUP_REQUIRED] Choose a Project before running this command` | Used `prisma project list` instead to confirm the project was gone. |

### 2026-10-22 and 2026-10-21 (no longer seen on 10-23)

| Error text | Fix |
| --- | --- |
| `alchemy: node 22.18.0 is not supported. Upgrade to node 24.11.1 or newer.` (every `prisma dev` / `prisma deploy` on the Node 22 image) | Download Node 24 `.tar.gz` (the `.tar.xz` failed: `xz: Cannot exec`), or run `bunx --bun prisma ...`. Fixed in the harness on 10-23. |
| `✘ [CONTRACT.SOURCE_DIAGNOSTIC] contract.prisma:7:19 PSL_UNSUPPORTED_FIELD_ATTRIBUTE: Field "Note.id" uses unsupported attribute "@onCreate"` (orm-postgres rc.18) | `@default(uuid())`. On 10-23 with rc.19, `@onCreate(uuid(4))` worked. |
| `[notes-deploy] fail — Prisma ORM migrate (MIGRATION_PATH_NOT_FOUND): The database carries no schema marker and the committed migrations/ directory has no authored path from empty to the target — the deploy pipeline only replays authored migrations, it never creates schema itself.` (10-22 A2 ran `prisma dev` before planning a migration) | `npx prisma migration plan --name init`, then `prisma dev` again. |
| `✘ [CLI.INVALID_ARGUMENTS] Too many arguments, expected 0 but encountered "module.ts"` on `prisma dev stop module.ts` | `prisma dev stop` with no argument. |
| `CLI.CONFIG_UNREADABLE ... prisma.config.ts could not be evaluated: Cannot find module 'temporal-polyfill/full/implementation'` (10-21 A3) | `npm install temporal-polyfill`. |
| `Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './config' is not defined by "exports"` when testing `require('prisma/config')` (10-21 A1) | Use ESM `import`. |
| npm `TypeError: Cannot read properties of null (reading 'edgesOut')` (10-21 A3) | `npm install ... --legacy-peer-deps`. |
| `python3: command not found` (several) | Used `node -e`. Not a product issue. |

## 5. Skill and `.d.mts` files read, and what each taught

Skills are installed by `npx prisma skills sync` into `.claude/skills/`: `prisma-composer-core-concepts`, `prisma-platform-core-concepts` (from `prisma`), and `prisma-8` (from `@prisma/orm-postgres`).

| File | Read by (10-23) | Fact learned |
| --- | --- | --- |
| `prisma-composer-core-concepts/SKILL.md` | A1, A2, A3 | The CLI has only `prisma deploy` and `prisma dev`. Teardown and logs are the `destroy` and `log` operations of `@prisma/composer/control`, called from a script. Node kinds: `compute()`, `rawPostgres()`/`bucket()`, `module()`. `postgres` and `dataContract` live under `@prisma/composer-prisma-cloud/orm`. You build with your own bundler. Code never reads `process.env`. Points to `examples/` in the composer repo, which is not shipped in the package. |
| `prisma-platform-core-concepts/SKILL.md` | A1, A3 | Projects, branches, and that destroying production's last resources removes the empty project. |
| `prisma-8/SKILL.md`, `references/quickstart.md` | A1, A3 | Contract-first workflow: edit `contract.prisma`, `contract emit`, `migration plan`. |
| `prisma-8/references/contract.md` | A1, A2, A3 | PSL syntax: `@default(autoincrement())`, `@onCreate(uuid(...))` for client-generated values, `@@map`. |
| `prisma-8/references/migrations.md` | A1, A2, A3 | `migration plan` writes reviewable migration packages; `db update` is the quick path (not used). |
| `prisma-8/references/migration-model.md` § "the deploy-first loop (Composer / CD-managed databases)" | A2, A3 | Deploys never advance a `db` ref. Plan the `init` baseline before the first deploy. Chain every later plan with `migration ref set db <hash>` or `--from <last-migration-dir>`. Also the retrofit recipe A2 used for an existing table. |
| `prisma-8/references/queries.md`, `queries-postgres.md`, `runtime.md` | A2 | ORM query API on `db.client.orm.public.Note`: `.select(...)`, `.orderBy(...)`, `.all()`, `.create({...})`. |
| `@prisma/composer/dist/control.d.mts` | A1 (also 10-21 A2, 10-22 A2) | `destroy()` input: `entry`, `target: { kind: 'production' }`, `config: ComposerConfigSource` = `{ value: <composer section of prisma.config.ts>, file: <path to prisma.config.ts> }`, optional `name`, `onEvent`. Returns `{ ok, value }` or `{ ok: false, failure }`. |
| `@prisma/composer-prisma-cloud/dist/orm.d.mts` | A3 | `dataContract<Contract>(contractJson)`. `postgres({ name, contract, config, targetRef? })` declares the resource; `postgres(contract)` declares the dependency. The binding is `{ url, connection, client, clientWith() }`. `config` is the `prisma.config.ts` path the deploy loads to find `migrations/`. |
| `@prisma/composer/dist/node.d.mts` | A3 | `node({ module, entry, dependencies? })`. `dependencies: 'bundled'` (default) ships exactly what was built; `'external'` makes deploy trace `entry` and stage the installed packages it imports. |
| `@prisma/composer/dist/node-control.d.mts` | A3 | `nodeBuild()` is the extension listed under `composer.extensions`. |
| `@prisma/composer/dist/graph-types-*.d.mts` | A3 | `module(name, ({ provision }) => ...)`; `provision(node, { id?, deps })`; a service's id defaults to its `name`. |
| `@prisma/composer/dist/index.d.mts`, `@prisma/composer-prisma-cloud/dist/index.d.mts` | A3 | Export lists. `src/exports/*.ts` only re-export `@internal/*`, so source was no help. |
| `@prisma/orm-postgres/dist/runtime.d.mts`, `postgres-members-*.d.mts` | A3 | Client query members (`select`, `all`, `create`). |
| `orm-framework/dist/data-type-*.mjs`, `components__codec.d.mts` | A2 | Source of the `pg/bool` codec error; led to trying `sql\`false\``. |

## What the new page should cover, from this evidence

- Install command before `prisma skills sync`, with the peer dependency `@prisma/orm-postgres`.
- A single plain HTTP service: `compute()` + `node()` build + `Bun.serve({ port: service.port(), hostname: '0.0.0.0' })`, with `@types/bun`.
- `prisma.config.ts` with both `composer` and `orm` sections.
- `contract.prisma`, `src/data.ts` with `dataContract`, `postgres()` on both sides, `service.load().db.client.orm...`.
- Order: `contract emit`, `migration plan --name init`, build, `tsc`, `prisma dev`, `prisma deploy`. Say that dev and deploy apply migrations.
- Second change: `contract emit`, `migration plan --from <folder name>` (or set the `db` ref), build, deploy.
- Where the URL appears in deploy output, and that it does not change on redeploy.
- A copyable destroy script with the `config` argument.
