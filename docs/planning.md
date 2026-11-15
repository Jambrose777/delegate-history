# Project Planning — Delegate History

This doc is the starting point for planning and tracking Delegate History. Update it as
the product direction and backlog evolve.

## Product vision

Delegate History is a collaborative research and review tool for the team reconstructing
historical World Cube Association (WCA) delegate records missing from the WCA website.
WCA began retaining delegate history on the website around 2024, leaving earlier
appointments and role changes incomplete. The application brings together WCA reference
data and historical evidence, including spreadsheets and email digests, so contributors
can review and correct date histories, approve records, compare them with current WCA
data, and generate migration files for submission to WCA.

## Tech stack

- Frontend: React (Next.js, App Router) with Tailwind CSS
- Backend: Node.js (Express) with TypeScript
- API: Separate REST service with an OpenAPI-first contract (`packages/api-contract`)
- Database: PostgreSQL is the local development target. The current backend still uses
  SQLite pending a follow-up migration. Drizzle remains provisional until its driver
  and feature compatibility with a possible future AWS DSQL target is checked; defer
  AWS DSQL provisioning.
- Authentication: Anonymous users can browse; WCA-authenticated users can suggest.
  Admins grant approver/admin roles for editing and approval; admins inherit approver
  permissions.
- Hosting: Web deployment target TBD. AWS EC2 for the backend and CloudFront for the
  frontend are under consideration.
- Evidence: Store short source labels and optional links; do not upload source files.
- WCA reference sync: User-triggered initially; no scheduled worker.

## Story backlog

Stories live as individual files directly under [docs/stories/](stories/). The index at
[docs/stories/README.md](stories/README.md) lists each story's status and links to its
file — check it, and the active story's file, before starting new work.

Each story file keeps behavioral outcomes under a `#### Acceptance criteria` heading and
implementation, API, storage, and testing choices under a separate `#### Technical
requirements` heading, defined as decisions are made.

Each story file carries a single `**Status:**` marker, which is mirrored in the index.
Use `Needs Refinement` while requirements are being defined, `Ready for Dev` when the
story can be implemented, and `Completed` when it is done. Update the marker and index
row together as the story progresses. Story files stay in place.

Add new story files directly under [docs/stories/](stories/), following the same
format, starting with `**Status:** Needs Refinement` and `TBD` acceptance criteria and
technical requirements, then add a matching row to
[docs/stories/README.md](stories/README.md). Use `Ready for Dev` only when the story's
requirements are fully known.

## Definition of done (draft)

- Story's acceptance criteria are all met.
- No console errors/warnings introduced.
- Basic tests added/updated if a test setup exists.
- The story's `**Status:**` marker is updated to `Completed`, and
  [docs/stories/README.md](stories/README.md) is updated to match.
