# 16. Generate WCA migration files

**Status:** Needs Refinement

#### Acceptance criteria

- Authorized users can generate migration files from selected, eligible history entries.
- Output includes only approved, migration-ready entries that are not already present in WCA.
- The output can represent the in-scope event types: promotions, demotions, temporary delegation, Senior/Regional stints, and geographical changes.
- Date ranges and unresolved approximate ranges are not silently converted; the team must choose one date before generating a WCA date entry.
- This workflow ends when migration files are generated; downstream WCA review/submission is out of current scope.

#### Technical requirements

- TBD: inspect the WCA repository for the migration format, target location, generation conventions, and validation command before finalizing this story.
