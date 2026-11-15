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

- Frontend: React (Next.js)
- Frontend styling: Tailwind CSS
- Backend: Node.js (Express)
- Language: TypeScript
- API: REST with an OpenAPI-first contract (`packages/api-contract`)
- Database: SQLite with Drizzle ORM
- Authentication: None for the initial local single-user version
- Hosting: Local machine for the initial version
- Desktop packaging: Electron + `electron-builder`, bundling the Next.js frontend and
  Express backend as two managed local child processes in `apps/desktop`;
  unsigned/unnotarized macOS `.dmg`/Windows NSIS installer builds, no auto-updater.
  `apps/desktop`'s own main/preload code is bundled with esbuild
  (`apps/desktop/scripts/build.mjs`) rather than plain `tsc`, so its `package.json`
  carries zero runtime `dependencies` — this keeps electron-builder's automatic
  node-modules dependency collector from finding anything to resolve, which otherwise
  risks triggering a destructive, unscoped `pnpm install --production` across the
  whole workspace in this pnpm monorepo. Both the backend and frontend child processes
  are spawned with `ELECTRON_RUN_AS_NODE: '1'` in their `env`, since a packaged/branded
  Electron executable (unlike the unpacked dev binary) always relaunches itself as the
  full app rather than running as plain Node when given a script path via argv. See
  story 3 for reviewing whether Delegate History needs the desktop app.
- Release automation: [.github/workflows/release.yml](../.github/workflows/release.yml)
  builds the macOS `.dmg` and Windows NSIS installer in CI (on `macos-latest`/
  `windows-latest` GitHub-hosted runners) and uploads them as assets on the matching
  GitHub Release. Disabled for now — the `push` tag trigger is
  commented out, so it currently only runs via manual `workflow_dispatch` against an
  existing tag, until the early backlog story for enabling/testing this workflow
  verifies the packaged installers and re-enables the `push` trigger.
  `apps/desktop/package.json`'s `build.mac.artifactName`/
  `build.nsis.artifactName` fix each installer's filename (no embedded version number),
  so the root [README.md](../README.md)'s `releases/latest/download/<filename>` links
  keep resolving to the newest build across releases.
- Multi-laptop data sync: a settings-screen folder picker lets the user point the
  existing `APP_DATA_DIRECTORY` at a folder managed by a consumer cloud-sync client
  (Dropbox/iCloud Drive/OneDrive/Google Drive, handled provider-agnostically). The app
  checkpoints and cleanly closes SQLite's WAL on quit so a single self-contained `.db`
  file is left for the sync client to pick up, tracks a `.sync-lock.json` marker to
  warn (advisory only) when another laptop recently had the data open or the directory
  looks mid-sync, and automatically writes a rotating local (non-synced) backup
  snapshot before any risky operation. This remains local-first with no hosted server
  or real-time concurrent editing — only one laptop is expected to have the app open
  at a time.

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
