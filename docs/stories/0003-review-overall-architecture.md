# 3. Review the overall architecture and decide on changes

**Status:** Ready for Dev

#### Acceptance criteria

- The architecture review compares the current web stack with product needs and
  records decisions about the API boundary, database and ORM, hosted access, hosting,
  evidence-file storage, background jobs, and external integrations.
- As part of this same review, every workspace dependency (root and each
  `apps/*`/`packages/*` package.json, plus the pinned Node.js/pnpm versions in the
  README's prerequisites) is checked against its latest available version, and
  upgraded where a newer version is available and compatible with the rest of the
  stack:
  - Each candidate upgrade is checked for breaking changes (changelog/release notes)
    before applying it, and the workspace's `pnpm typecheck`, `pnpm lint`, and
    `pnpm test` are run afterward to confirm nothing regressed.
  - Any dependency that can't be safely upgraded yet (e.g. a breaking major version
    the codebase isn't ready for) is left as-is with a note recorded in this story
    explaining why, rather than forcing an incompatible upgrade.
- The product is a web application and will not include an Electron desktop app or
  desktop-specific local multi-laptop sync. Remove `apps/desktop`, its workspace
  scripts and dependencies, desktop settings UI, sync/startup/shutdown backend
  pieces, `/startup/*` and `/maintenance/prepare-shutdown` OpenAPI paths, release
  workflow, and current documentation/instruction references to the removed
  architecture. Simplify backend startup and shutdown to a web-service lifecycle.
  Update [docs/planning.md](../../planning.md) and the README architecture overview to
  match.
- The design system review (story 4) is treated as a separate, sibling story and is
  not duplicated here.
- For each area reviewed, the decision is recorded in this story file. Only areas
  that actually change are also reflected in
  [docs/planning.md](../../planning.md) (updating the relevant tech-stack bullet) —
  a "kept as-is" decision doesn't need a corresponding planning.md edit, since
  planning.md already describes the as-shipped default and restating "unchanged"
  there would just be noise.
- Any change that requires actual implementation work (not just a doc update or the
  desktop-app removal above) is captured as one or more new story files in
  new story files directly in [docs/stories/](.) with the index at
  [docs/stories/README.md](README.md) updated to match, rather than being implemented
  inline as part of this review.
- If no changes are needed anywhere (including keeping the desktop app as-is), this
  story is marked done with a note in its own file confirming the architecture was
  reviewed and kept as-is.

#### Technical requirements

- Build a web application without the Electron desktop app or its desktop-specific
  multi-laptop sync architecture. Remove that scaffolding and simplify backend startup
  and shutdown to a web-service lifecycle.
- Keep the Express REST/OpenAPI backend separate from the Next.js frontend.
- Use local PostgreSQL for development; do not provision AWS DSQL now. Keep Drizzle
  provisional until its driver and feature compatibility with a possible future DSQL
  target is checked.
- Use WCA authentication for signed-in users. The site remains publicly viewable;
  any authenticated WCA user can submit suggestions. Editing, approval, and user
  administration require admin-granted approver/admin privileges. Manually seed the
  initial admin in the database before launch; see story 10 for role details.
- Store sources as short descriptive text labels, such as spreadsheet titles, with
  optional links. Do not upload or proxy original source files; linked-resource
  permissions remain managed by the source host, with no additional app-level privacy.
- Trigger WCA reference-data sync manually from the application; do not add a
  scheduled sync or background worker initially.
- Deployment services remain deferred. AWS EC2 for the backend and CloudFront for the
  frontend are under consideration.
- Dependency review: same-major updates are applied and pass the workspace checks;
- Compatible same-major dependency updates are applied and pass the workspace checks.
  Before marking this story complete, review the release notes for each applied
  update; that individual review has not yet been completed.
- Keep Node.js `24.18.1` rather than moving to the latest LTS, `26.13.1`; validate
  compatibility with the native SQLite dependency and CI toolchain before a major
  runtime upgrade.
- Keep pnpm `11.18.0` rather than moving to `12.21.0`; validate the workspace config,
  lockfile behavior, and install policies before a major package-manager upgrade.
- Defer ESLint `10.15.0` and `@eslint/js` `10.0.1`: `eslint-plugin-import` `2.32.0`,
  `eslint-plugin-jsx-a11y` `6.10.2`, and `eslint-plugin-react` `7.37.5` currently
  declare peer support only through ESLint 9.
- Defer TypeScript `7.0.2`: `typescript-eslint` `8.72.2` declares support for
  TypeScript versions below `6.1.0`.
- Defer `@types/better-sqlite3` `9.6.0` until the planned SQLite-to-PostgreSQL adapter
  migration; the current SQLite adapter and typecheck remain on `7.6.13`.
- Any further implementation work identified by this architecture review is captured
  in separate stories rather than implemented inline.
