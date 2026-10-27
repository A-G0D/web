# Outline: "Build an HTTP API with a database"

File: `apps/docs/content/docs/composer/http-api-with-database.mdx` in prisma/web. URL `/composer/http-api-with-database`. Listed in `composer/meta.json` under Introduction, right after `getting-started`.

Goal: from an empty directory to a deployed notes REST API (GET and POST `/notes`) on Prisma Compute, with data in Prisma Postgres through the Prisma 8 ORM. Then add a field with a migration and redeploy. One service, no RPC.

## Sections

1. **Intro.** What you build, and how it differs from Getting started: one plain HTTP service with a database, instead of two services talking over RPC. Link to Getting started for the concepts.
2. **Prerequisites.** Same as Getting started: Node 22.18+, 24.11+ or 26+, Bun for the build, a Prisma account for the deploy step only.
3. **1. Set up the project.** `npm init -y`, `npm pkg set type=module`, install `@prisma/composer`, `@prisma/composer-prisma-cloud` and `@prisma/orm-postgres`, dev-install `typescript`, `@types/bun` and `prisma`. `tsconfig.json`. A file tree of what the page builds.
4. **2. Define the data.** `contract.prisma` with a `Note` model. `npx prisma contract emit`. One sentence on what the contract is, with a link to the ORM docs.
5. **3. Configure Prisma.** `prisma.config.ts` with both sections: `orm` (where the contract and migrations live) and `composer` (`prismaCloud()`, `nodeBuild()`, `prismaState()`). A short table of what each call does, linking to the reference.
6. **4. Plan the first migration.** `npx prisma migration plan --name init`. Say plainly that you never run `prisma db migrate` here: `prisma dev` and `prisma deploy` apply the migrations themselves.
7. **5. Write the service.** `src/data.ts` with `dataContract()`. `src/service.ts` with `compute()`, the build, and the `postgres()` dependency. `src/server.ts`: `Bun.serve` on `service.port()` and `0.0.0.0`, with GET `/notes` and POST `/notes`, using the ORM client from `service.load()`. Complete files, nothing elided.
8. **6. Compose the app and build.** `module.ts`. The `build` script in `package.json`. `npm run build` and `npx tsc --noEmit`.
9. **7. Run it locally.** `npx prisma dev module.ts`. In a second terminal, `curl` POST and GET using `"$(npx prisma dev url notes)"`. Local data persists between runs.
10. **8. Deploy.** `npx prisma auth login`, `npx prisma deploy module.ts`. Show where the public URL appears in the output, and that it stays the same on later deploys. Every `compute()` service gets a public URL; there is no private option today. `curl` the deployed URL.
11. **9. Change the schema and redeploy.** Add `done Boolean @default(false)`. `contract emit`, then `migration plan --name add_done --from <init folder name>`, and why `--from` is needed: a deploy does not advance the `db` reference. Update the server, build, `prisma dev` to try it, then `prisma deploy`.
12. **Clean up.** One line linking to the existing teardown docs. No destroy script here; teardown is being designed separately.
13. **Next steps.** Links: Databases, Services and contracts, Deploying, Local development, the full-stack tutorial.

## Also in the same pull request

- Link to the new page from the Composer overview (`composer/index.mdx`) and from Getting started's "Where to go next".
- Redirects for the URLs agents guessed that return 404: `/composer/get-started` to Getting started, `/composer/http` and `/composer/postgres` to the new page, `/composer/port-an-existing-app` to Porting an app.

## Not in this pull request

- Fixing `limitations.mdx`, which contradicts Getting started on `auth login` and on pinning `effect`. Separate small pull request.
- A reference page for every `prisma.config.ts` field. The new page links to what exists.

## How I check it

Before opening the pull request, I build the app exactly as the page says, in a clean folder on Node 24 with npm: run it locally, deploy it to the evaluation workspace under a `gse-` project name, add the field, redeploy, then delete the project. Every command and file on the page comes from that run.
