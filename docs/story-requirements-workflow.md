# Story technical-requirements handoff

## Canonical sources

- `docs/planning.md` holds the product vision, tech stack, and definition of done.
  Stories live as individual files directly under `docs/stories/`. Each story's
  `**Status:**` is one of `Needs Refinement`, `Ready for Dev`, or `Completed`, and the
  index at `docs/stories/README.md` mirrors it; check the index and active story file
  before asking questions.
- Each story file carries one `**Status:**` marker (`Needs Refinement`, `Ready for Dev`,
  or `Completed`), mirrored in the index. Do not delete, move, or split out a story when
  it reaches `Completed` — later stories keep citing its confirmed contracts.
- `.github/copilot-instructions.md` records the stack and onboarding guidance.
- `.github/instructions/coding-conventions.instructions.md` requires all
  application-owned defaults to live in one shared canonical `defaults.ts`. Do not
  create feature-specific defaults files.

## Interview workflow

- Develop technical requirements story by story, working through stories marked
  `Needs Refinement` in ascending story-number order unless the user directs otherwise,
  through one question at a time.
- Ask a concrete multiple-choice question with a recommended option and short tradeoff
  descriptions; allow a freeform correction.
- Treat user corrections as authoritative even when they reverse an earlier answer.
- After every answer, immediately patch the active story's own file directly under
  `docs/stories/`, run focused validation on that file, briefly report what changed, and
  ask the next single question.
- When a story's acceptance criteria and technical requirements are both fully resolved
  (no remaining TBDs), update its status to `Ready for Dev` in the story and index; keep
  its file in place.
- Run `pnpm format` after documentation or code edits that it supports; use
  `pnpm format:check` when a non-mutating formatting check is needed.
- Keep behavioral outcomes under `#### Acceptance criteria` and implementation, API,
  storage, and testing choices under `#### Technical requirements`.
- When entering an unstructured story, add both subsection headings.
- Identify physical or logical contradictions explicitly. Do not silently weaken
  requirements; record unresolved issues as prominent TBDs when the user wants to defer
  them.
- Keep questions narrow and decision-oriented. Prefer existing project patterns and
  previously selected contracts over introducing new architecture.

## Established architecture

- pnpm workspace; Next.js, React, and TypeScript frontend; Express and TypeScript
  backend.
- REST and OpenAPI-first API with generated types and Problem Details errors.
- SQLite with Drizzle ORM; migrations under `apps/backend/drizzle/`.
- Electron desktop packaging (`apps/desktop`) with multi-laptop cloud-sync support
  (backup snapshots, sync marker, launch-time confirmation handshake) — see story 3
  (review the overall architecture) for whether a given project keeps this.
- Jest for backend and frontend unit/integration tests.

## Current stopping point

This template instance has baseline setup stories in `docs/stories/`; consult
`docs/stories/README.md` for their current status. Resume technical-requirements
questions with the lowest-numbered story marked `Needs Refinement` unless the user
directs otherwise.
Update this section as the new project's own backlog develops.

## Consistency notes

- Existing requirements may contain cross-story API and mutation rules. Before adding a
  new requirement, search story files in `docs/stories/` for affected endpoints,
  lock/permission behavior, toast or loading behavior, idempotency, and optimistic
  rollback to avoid contradictions.
- Validate Markdown after every patch with workspace diagnostics.
