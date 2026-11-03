# 1. Rename the project to `delegate-history`

**Status:** Completed

#### Acceptance criteria

- The project name `delegate-history` and workspace package scope `@delegate-history`
  are recorded in [docs/planning.md](../../planning.md).
- The former template name and package scope are replaced throughout application
  code, configuration, and project branding, including at minimum:
  - The root `"name"` field in [package.json](../../../package.json) and every
    `--filter @delegate-history/*` script in it.
  - The `"name"` field and `@delegate-history/*` workspace dependencies in each
    app/package's own `package.json`
    (`apps/backend`, `apps/frontend`, `apps/desktop`, `packages/api-contract`,
    `packages/shared`).
  - Every `@delegate-history/*` import specifier in application source
    (e.g. `apps/backend/src/**`, `apps/desktop/src/**`,
    `apps/frontend/src/lib/api/client.ts`) and the Jest module-name-mapper entries
    that resolve that scope (`apps/backend/jest.config.mjs`,
    `apps/frontend/jest.config.mjs` if present).
  - The Electron `productName`, app ID, and `artifactName` values in
    [apps/desktop/package.json](../../../apps/desktop/package.json)
    (`build.mac.artifactName`/`build.nsis.artifactName`), and comment references to
    the scope in `apps/desktop/scripts/build.mjs` and
    `apps/desktop/scripts/prepare-package.mjs`.
  - The `pnpm --filter @delegate-history/desktop package:mac`/`package:win` commands
    in [.github/workflows/release.yml](../../../.github/workflows/release.yml).
  - The root [README.md](../../../README.md) title, description, and release asset
    filenames use the new project name. Keep the GitHub owner/repository URL unchanged
    unless the remote repository itself is renamed.
  - The title in [.github/copilot-instructions.md](../../../.github/copilot-instructions.md)
    and the project-name references in
    [.github/agents/developer.agent.md](../../../.github/agents/developer.agent.md),
    [.github/agents/product-owner.agent.md](../../../.github/agents/product-owner.agent.md),
    and
    [.github/instructions/styling.instructions.md](../../../.github/instructions/styling.instructions.md).
- If the GitHub repository itself is also renamed (or the project is moved to a new
  repository), update README download links and other hard-coded repository URLs to
  match; do not assume the remote repository name from the local project name.
- After the rename, `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, and
  `pnpm --filter @delegate-history/desktop package:mac`/`package:win` (or at least a dry
  run/build) all succeed, confirming no stale workspace package-scope reference was
  missed.

#### Technical requirements

- No new technical requirements beyond the mechanical rename steps above, since this
  story does not change behavior — it only renames identifiers and prose.
