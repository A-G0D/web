# Composer docs coverage for "a notes REST API on Prisma Compute"

Docs read in the web worktree `composer-http-api-page` (head `0bcad7e2e`), under `apps/docs/content/docs/`. Package API read from `@prisma/composer@0.33.0` and `@prisma/composer-prisma-cloud@0.33.0`, unpacked in `wip/research-pkgs/`.

## Main finding

Most of what the agents missed exists, but outside the Composer section, and the Composer section does not link to it:

- `(index)/full-stack-tutorial.mdx` (URL `/full-stack-tutorial`) is a full Composer plus Prisma ORM path: `postgres(contract)`, `prisma.config.ts` with `orm` and `composer` sections, `contract emit`, `migration plan --from`, deploy applies migrations, public URL, cleanup. It starts from a scaffold (`npm create prisma@latest -- my-app --template hono`), not from an empty directory, so the files it relies on (`src/prisma/composer.ts`, `src/prisma/db.ts`) are never shown.
- `(index)/prisma-compute/deploy.mdx` (URL `/prisma-compute/deploy`) builds a one-service plain HTTP app from scratch, and ports "a notes API on Postgres" with `rawPostgres()`. It shows only "the changed lines" of the server, with an undefined `handler`.
- No page in `composer/` links to `/full-stack-tutorial` or `/prisma-compute/deploy` (grep found zero links).

## Gap 1: setting up an app from an empty directory

Already there:
- `composer/getting-started.mdx`, "1. Set up the project": `npm init -y`, `npm pkg set type=module`, `npm install @prisma/composer @prisma/composer-prisma-cloud arktype`, `npm install -D typescript @types/bun prisma`, plus `tsconfig.json`. This is a general setup, but it sits inside the quotes example.
- `prisma-compute/deploy.mdx`, "Start from scratch", links back to that step: "Set up the project as in Composer getting started, step 1".

Missing: the packages needed for a database typed by Prisma ORM. No Composer page says to install `@prisma/orm-postgres` (a peer dependency of `@prisma/composer-prisma-cloud`, pinned `8.0.0-rc.19`). The full-stack tutorial gets it from the scaffold.

## Gap 2: a plain HTTP service with routes

Already there:
- `prisma-compute/deploy.mdx`, "Start from scratch": a single `Bun.serve` service returning one fixed `Response`. No routing, no JSON, no POST.
- `prisma-compute/deploy.mdx`, "Bring an app you already have": `src/api/server.ts (the changed lines)` with `Bun.serve({ port: service.port(), hostname: "0.0.0.0", fetch: handler });`, where `handler` is not defined.
- `composer/getting-started.mdx` step 3: the gateway is a plain `Bun.serve` with one `fetch`, but it exists to call RPC.
- `full-stack-tutorial.mdx` uses Hono routes (`/users`) but never shows the route code.

Missing: a complete HTTP service with `GET`/`POST` routes, JSON bodies and status codes, wired to a database. Also missing: the `@prisma/composer/http` export (`rawHttp()`, `rawHttpContract`) is not documented anywhere in the docs.

## Gap 3: reference for the `composer` section of `prisma.config.ts`

Already there:
- `composer/getting-started.mdx` step 4 shows the file twice (with and without `skills`): "The deploy config is its `composer` section: the extensions that deploy your app and the store that keeps deploy state."
- `cli/configuration.mdx` intro names the section and links to getting started: "[Composer getting started](/composer/getting-started) shows how to write it." Under "How the CLI finds the config": "The CLI takes it whole from the nearest file that declares a `composer` section."
- `cli/deploy.mdx` intro and "Environment variables": `prismaCloud({ region: 'us-east-1' })` or `PRISMA_REGION`.
- `composer/porting-an-app.mdx` "A Next.js app": adds `nextjsBuild()` from `@prisma/composer/nextjs/control`.

Missing: one reference listing the fields and options. The real API is small:

```ts
// @prisma/composer/config
interface PrismaAppConfig {
  readonly extensions: ExtensionDescriptor[];
  readonly state: StateDescriptor;
}
declare function defineConfig(config: PrismaAppConfig): PrismaAppConfig;

// @prisma/composer-prisma-cloud/control
interface PrismaCloudOptions {
  /** Defaults to the PRISMA_WORKSPACE_ID environment variable. */
  workspaceId?: string;
  /** Defaults to the PRISMA_REGION environment variable when set. */
  region?: ProjectRegion;
}
declare const prismaCloud: (opts?: PrismaCloudOptions) => ExtensionDescriptor;
declare const prismaState: () => StateDescriptor;

// @prisma/composer/node/control
declare const nodeBuild: () => ExtensionDescriptor;
```

The `workspaceId` option is not documented anywhere. Note the import path: `prismaCloud` and `prismaState` come from `@prisma/composer-prisma-cloud/control`, not the package root.

## Gap 4: Composer plus Prisma ORM end to end

Already there:
- `composer/databases.mdx`, "`postgres()`: a Prisma ORM-typed database": the four-step workflow ("Edit `contract.prisma`", "Run `contract emit`", "Run `migration plan`", "Deploy. The deploy applies `migrations/` before the service starts."), the `dataContract<Contract>(contractJson)` wrapper in `src/data.ts`, and both uses of `postgres()`. It links to `examples/orm-demo` and `examples/store` on GitHub.
- `composer/databases.mdx`, "`rawPostgres()`: bring your own client": `rawPostgres()` with Bun `SQL`.
- `full-stack-tutorial.mdx` steps 2, 5 and 7: complete `module.ts`, `service.ts`, `prisma.config.ts` with `orm` and `composer` sections, the first migration (`migrations/app/<timestamp>_init`), and `npx prisma migration plan --name add-user-role --from <timestamp>_init`. Key line: "a Composer deploy never sets the `db` ref that `migration plan` chains from by default, so a plan without it would describe every table again."
- `orm/migrations/generating-a-migration.mdx` and `cli/migration-plan.mdx` explain `migrations/app/`, refs and the first plan.

Missing or wrong:
- `databases.mdx` never shows where `postgres` is imported from. The code is `import { postgres } from '@prisma/composer-prisma-cloud/orm'` (the tutorial and `prisma-compute/deploy.mdx` say so; `databases.mdx` does not).
- `databases.mdx` never shows the `orm` section of `prisma.config.ts`, the contract file location, or the paths `contract.json`/`contract.d.ts` land in. Its `src/data.ts` imports `../contract.d.ts`, which implies the contract sits at the project root.
- No page says how to write the first migration without the scaffold, or that one must exist before the first deploy.
- No page shows a query through `db.client` in a running HTTP handler. `databases.mdx` has one inline example: `db.client.orm.public.Product.where({ id }).first()`.
- The binding is richer than the docs say. Real type:

```ts
// @prisma/composer-prisma-cloud/orm
interface PostgresBinding<Ct> {
  readonly url: string;
  readonly connection: PostgresConnection;
  readonly client: Client<Ct>;
  clientWith(options: PostgresClientOptions): Client<Ct>;
}
declare function dataContract<const C extends AnyOrmContract>(contract: C): PostgresContract<C>;
declare function dataContract<C extends AnyOrmContract>(contractJson: unknown): PostgresContract<C>;
declare function postgres<C extends PostgresContract>(opts: {
  name: string; contract: C; config: string; targetRef?: string;
}): PostgresResourceNode<C>;
declare function postgres<C extends PostgresContract>(contract: C): DependencyEnd<PostgresBinding<C>, C>;

// @prisma/composer-prisma-cloud
declare function rawPostgres(opts: { name: string }): ResourceNode<typeof rawPostgresContract>;
declare function rawPostgres(): DependencyEnd<RawPostgresConfig, typeof rawPostgresContract>; // { url }
```

`connection`, `clientWith()` and `targetRef` are not documented. The first `dataContract` overload (a contract authored in TypeScript, no emit) is not documented either.

## Gap 5: how a deployed service becomes public and where its URL comes from

Already there:
- `composer/deploying.mdx`, "What a deploy prints": "URLs appear for publicly reachable endpoints. That is why a Compute service prints one and a database does not."
- `composer/services-and-contracts.mdx`, "Calls are authenticated for you": "A deployed service has a public URL; the key is what makes it answer only the services your app connected to it."
- `composer/getting-started.mdx` step 2 and `deploying.mdx` "Production behavior": bind `0.0.0.0` because "Compute routes external HTTP to the VM".
- `cli/deploy.mdx` flags: `--report <path>` writes "resources, preview URLs, and the failure cause" as JSON.
- `composer/service-input.mdx`, "The reserved port", mentions `service.origin()` once, only as "a sibling of `service.port()`".

Missing: a plain statement that every `compute()` service gets a public HTTPS URL, with no flag to make it public or private. The code confirms this: the deploy reads each service's `endpointDomain`, and a comment says "Every compute service gets this row, exposing or not." The docs also lack:
- What `service.origin()` returns (the service's own public origin, `https://…` with no trailing slash).
- `serviceOrigin(address)` from `@prisma/composer-prisma-cloud`, which binds an input field to another service's public origin. It is not in the docs.
- How to get the URL after deploy other than reading the printed tree (for example the `--report` JSON; each entity has an optional `url`).
- The Console "Deployed URL" is set only when the app has exactly one compute service (from a code comment in `control.mjs`).

Real signatures:

```ts
// ComputeService (returned by compute())
origin(): string; // "This service's platform-assigned public origin"
port(): number;   // defaults to 3000
declare const compute: <D, I, E>(def: {
  name: string; deps: D; input?: I; build: BuildAdapter; expose?: E;
  /** `false` for a service that never listens on its port, such as a scheduler. Defaults to `true`. */
  listens?: boolean;
}) => ComputeService<D, I, E>;
declare function serviceOrigin(address: string): ParamSource<OriginParamPayload>;
```

The `listens` option is not documented either.

## Gap 6: guessed URLs that 404

The real Composer pages are `/composer`, `/composer/core-concepts`, `/composer/getting-started`, `/composer/apps-and-modules`, `/composer/services-and-contracts`, `/composer/service-input`, `/composer/databases`, `/composer/object-storage`, `/composer/building-blocks`, `/composer/local-development`, `/composer/testing`, `/composer/deploying`, `/composer/porting-an-app`, `/composer/limitations`.

Guesses and the nearest real page:
- `/composer/get-started` → `/composer/getting-started`
- `/composer/compute` → `/prisma-compute/deploy` or `/compute`
- `/composer/postgres` → `/composer/databases`
- `/composer/http` → nothing (no page; closest are `/prisma-compute/deploy` and `/composer/services-and-contracts`)

`apps/docs/next.config.mjs` has no redirects whose source starts with `/composer`. Its only Composer entry is `/cli/composer` → `/cli/deploy`. Per `apps/docs/AGENTS.md`, redirects go "in the live region of `next.config.mjs` `redirects()`", then run `pnpm audit:redirects:strict`.

## Gap 7: teardown (not in scope; what exists)

- `composer/deploying.mdx`, "Destroying": `destroy({ entry: 'module.ts', target: { kind: 'stage', stage: 'staging' } })` from `@prisma/composer/control`. It needs `PRISMA_SERVICE_TOKEN` and `PRISMA_WORKSPACE_ID` and ignores the `auth login` session. "The unified CLI has no `destroy` command."
- `cli/deploy.mdx`, "Tearing down and log tailing" and "The control API": same content.
- `full-stack-tutorial.mdx`, "8. Clean up (optional)": `npx prisma project delete <project-id> --confirm <project-id>`.
- `composer/getting-started.mdx` step 7: "Without them, delete the stage's branch in the Console instead."

## Inconsistencies seen on the way

- `composer/limitations.mdx` says "No interactive login for deploys. Deploys authenticate only via a static `PRISMA_SERVICE_TOKEN`", but getting started and `deploying.mdx` use `npx prisma auth login`.
- `composer/limitations.mdx` says "The `effect` family must be pinned", but getting started says "You do not need to pin `effect` yourself."
- `composer/local-development.mdx` and the tutorial link `/local-development` and `/composer/local-development`; both exist, which is fine, but two pages cover local runs.

## The getting-started page (the sibling)

File: `composer/getting-started.mdx`, URL `/composer/getting-started`, 340 lines. It builds a two-service app (`quotes` RPC service and public `gateway`) with no database.

Sections:
1. Intro: what you will have, and a pointer to Databases for the next step.
2. `:::note[Working with a coding agent]`: `npx prisma@latest init` to install the skill.
3. Prerequisites: Node 22.18+/24.11+/26+, Bun, npm/pnpm/Bun. No account needed.
4. "1. Set up the project": `npm init -y`, `npm pkg set type=module`, `npm install @prisma/composer @prisma/composer-prisma-cloud arktype`, `npm install -D typescript @types/bun prisma`; `tsconfig.json`; `:::note[Bun workspaces]` (`bun add alchemy`, `bun add -d @prisma/dev`); a `text no-copy` file tree.
5. "2. Create the quotes service": `src/quotes/contract.ts`, `service.ts`, `server.ts` (`serve()` plus `Bun.serve({ port, hostname: '0.0.0.0', fetch: handler })`).
6. "3. Create the gateway service": `src/gateway/service.ts` with `deps: { quotes: rpc(quotesContract) }`, `server.ts`.
7. "4. Compose the app": `module.ts`, then `prisma.config.ts` in two variants.
8. "5. Build": `package.json` `build` script with two `bun build --target=bun` commands; `npm run build`; `npx tsc --noEmit`.
9. "6. Run it locally": `npx prisma dev module.ts`; sample output; `curl "$(npx prisma dev url gateway)"`; a direct RPC call returns `401` on purpose.
10. "7. Deploy it (optional)": `npx prisma auth login`, `npx prisma deploy module.ts`, region note, `--stage demo`, teardown note.
11. "Where to go next": five bullet links.

## Writing conventions

- Frontmatter: `title`, `description`, `url` (required; must match the path), `metaTitle`, `metaDescription`. `index.mdx` also has `badge: early-access`. Concept pages use `metaTitle: "<Title> | Prisma Composer"`.
- Navigation: `composer/meta.json` lists pages under `---Introduction---`, `---Concepts---`, `---Workflows---`, `---Reference---`. A new page must be added there. A new guide page would sit in Introduction next to `getting-started`, or in Workflows.
- Package-manager commands use a fence with language `npm` (23 uses), written with npm syntax; the site turns it into package-manager tabs. Plain shell commands that should not become tabs (`curl`, `bun add`) use `bash`.
- Code fences carry `title="path/to/file.ts"`. Output blocks use `text no-copy` or `json no-copy`. Languages used: `ts`, `tsx`, `json`, `yaml`, `text`, `bash`, `npm`.
- Callouts use `:::note[Title]`, `:::info[Title]`, `:::warning[Title]` with blank lines inside, closed by `:::`.
- Components: `<ConceptAnimation name="..." />`, `<Cards><Card href="..." title="..." icon={...}>`, `<AgentPrompt>` wrapping a `text` fence (used for "Use with your agent" sections on `porting-an-app.mdx`, `prisma-compute/deploy.mdx` and the full-stack tutorial).
- Links are root-relative without `/docs` and without `.mdx`: `[Databases](/composer/databases)`, with anchors such as `/composer/deploying#credentials`. External links are full URLs.
- Step headings are numbered: `## 1. Set up the project`. Each page ends with `## Next steps` (getting started uses `## Where to go next`) as a bullet list of links with a short description.
- Code style: single quotes and `.ts` import suffixes in `composer/` pages; the full-stack tutorial and `prisma-compute/deploy.mdx` use double quotes. Servers bind `hostname: '0.0.0.0'` and read `service.port()`.
- Prose: one paragraph per line, no hard wraps. Version notes are written "since `8.0.0-rc.24`". `apps/docs/AGENTS.md` says reference material (flags, config fields) belongs in `cli/` or a section's Reference block, and guides should link to it.
