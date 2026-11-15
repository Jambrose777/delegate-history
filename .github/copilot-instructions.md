# Copilot Instructions — delegate-history

## Project overview

`delegate-history` is a collaborative web application for reconstructing historical
World Cube Association (WCA) delegate records missing from the WCA website.
Contributors review and correct date histories, approve records, and prepare migration
files for WCA. The site is public to browse; WCA-authenticated users can suggest
records, and admins grant elevated approver/admin permissions.

## Stack

- **Repository:** pnpm workspace — `apps/{backend,frontend}` and
  `packages/{shared,api-contract}`
- **Frontend:** React (Next.js, App Router) with TypeScript, styled with Tailwind CSS
- **Frontend icons:** Lucide React (`lucide-react`)
- **Backend:** Node.js (Express) with TypeScript
- **API:** REST with an OpenAPI-first contract
  ([packages/api-contract/openapi.yaml](../packages/api-contract/openapi.yaml)),
  validated at runtime with `express-openapi-validator` and consumed by the frontend
  through a typed `openapi-fetch` client
  ([apps/frontend/src/lib/api/client.ts](../apps/frontend/src/lib/api/client.ts))
- **Database:** PostgreSQL is the local development target. The current backend still
  uses SQLite pending a follow-up migration. Drizzle is provisional until compatibility
  with a possible future AWS DSQL target is checked; do not provision DSQL yet.
- **Authentication:** Anonymous users can browse; WCA-authenticated users can suggest.
  Admins grant approver/admin roles for editing and approval.
- **Hosting:** Cloud deployment is undecided; AWS EC2 for the backend and CloudFront for
  the frontend are under consideration.
- **Evidence and reference data:** Store source titles and optional links only; do not
  upload source files. WCA sync is user-triggered initially.
- **Mutation idempotency:** a generic `mutation_idempotency` table plus
  lookup/save/prune helpers
  ([apps/backend/src/idempotency/mutationIdempotency.ts](../apps/backend/src/idempotency/mutationIdempotency.ts))
  let a client retry a mutation with the same idempotency key and safely replay the
  original response instead of repeating the effect.

- If you introduce a new dependency or architectural decision, record it in
  [docs/planning.md](../docs/planning.md), keep this file in sync, and update the
  architecture diagram in [README.md](../README.md) if it changes the apps/packages
  involved or how they connect.

## Working conventions

- Begin your summary by directly addressing me as Jacob with a direct greeting.
- Planning and requirements live in [docs/](../docs). Check
  [docs/planning.md](../docs/planning.md) before starting new work — it holds the
  product vision, tech stack, and definition of done.
- Stories live as one file each directly under [docs/stories/](../docs/stories/).
  Each story's `**Status:**` is `Needs Refinement`, `Ready for Dev`, or `Completed`;
  [docs/stories/README.md](../docs/stories/README.md) mirrors those statuses. Check it,
  and the active story's file, before starting new work.
- The story-derived endpoint index is [docs/api-endpoints.md](../docs/api-endpoints.md).
  Keep it synchronized with explicitly defined routes in the story files under
  `docs/stories/`; [packages/api-contract/openapi.yaml](../packages/api-contract/openapi.yaml)
  remains the implementation source of truth.
- The story-derived object and property index is [docs/data-types.md](../docs/data-types.md).
  Keep it synchronized with confirmed data-model decisions in the story files under
  `docs/stories/`; do not treat fields marked **TBD** as implemented contracts.
- When continuing the story technical-requirements interview, follow
  [docs/story-requirements-workflow.md](../docs/story-requirements-workflow.md) for the
  one-question workflow, current stopping point, and unresolved decisions.
- Project coding conventions live in
  [.github/instructions/coding-conventions.instructions.md](instructions/coding-conventions.instructions.md).
  Apply them whenever writing, reviewing, or refactoring application code.
- Always add helpful comments to code blocks, especially to explain their purpose,
  control flow, and non-obvious implementation decisions.
- Prefer small, incremental changes. Add new story files directly in `docs/stories/`
  with `**Status:** Needs Refinement` and add a matching row to
  [docs/stories/README.md](../docs/stories/README.md). Use `Ready for Dev` when
  requirements are fully known.
- Run `pnpm format` after repository edits that Prettier supports; use
  `pnpm format:check` for non-mutating formatting verification. Run
  `pnpm typecheck`, `pnpm lint`, and `pnpm test` before considering a change done.
- Keep this file up to date as the project evolves — it is the primary onboarding doc
  for AI coding agents working in this repo.
