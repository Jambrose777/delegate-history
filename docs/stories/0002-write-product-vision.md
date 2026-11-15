# 2. Write the product vision and update the top-level docs

**Status:** Completed

#### Acceptance criteria

- The `## Product vision` section in [docs/planning.md](../../planning.md) is
  rewritten from its `TBD` placeholder to describe the new project's actual purpose:
  what it does, who it's for, and the key problem(s) it solves.
- The top description in the root [README.md](../../../README.md) (the introductory
  paragraph(s) before the "Download"/"Architecture" sections) is rewritten to
  describe the new project itself rather than the template — while still crediting
  this repository as the starting template if desired.
- Any other prose in the repo that still describes the generic template purpose
  instead of the actual product is identified and updated to match, or explicitly
  left as a follow-up TBD if out of scope for this pass. Found so far (re-check for
  drift before relying on this list, since it was captured at one point in time):
  - The root [README.md](../../../README.md), [docs/planning.md](../../planning.md),
    and [.github/copilot-instructions.md](../../../.github/copilot-instructions.md)
    now describe the WCA delegate-history reconstruction product.
  - The frontend metadata and home-page placeholder copy are now product-specific.
  - The frontend header's `"Delegate History"` link and its test assertion already
    matched the product name, so they remain unchanged.
  - The desktop window title and `build.productName` also already match. The
    `build.appId` is still `com.example.delegatehistory`; decide its production
    identifier in story 3 if that review keeps the desktop app.
  - Generic template-purpose descriptions in the developer/product-owner agent
    instructions and styling instructions have been updated to describe this product.
  - The planning document's top-level heading (`# Project Planning — Delegate
History`) already matched and remains unchanged.
  - Renaming the workspace package scope itself, and the project-name mentions in
    `.github/agents/*.agent.md` and
    `.github/instructions/styling.instructions.md`, is mechanical and already
    covered by story 1 — not duplicated here.
- This story does not itself decide the desktop app's fate, the design system, or
  the wider architecture — those are covered by the sibling architecture-review
  story (story 3) in the backlog.

#### Technical requirements

- No new technical requirements beyond the documentation updates above, since this
  story is a content pass rather than new functionality.
